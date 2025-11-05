import React, { useContext, useEffect, useMemo, useState } from "react";
import codeImg from "../../assets/codeImg.png";
import noSnip from "../../assets/noSnip.png";
import { FaFolderOpen, FaHome, FaSearch } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoCodeSlash } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  getInitials,
  getRandomColor,
  languages,
} from "../utility/RepeatedCodes.js";
import { AuthContext } from "../../Providers/AuthContext.jsx";

// Snippet Card
const SnippetCard = React.memo(({ snip }) => {
  const langObj = languages.find(
    (lang) => lang.value.toLowerCase() === snip.language.toLowerCase()
  );
  const syntax = langObj?.syntax || "text";
  const iconClass = langObj?.icon || "devicon-code-plain";
  const previewCode = snip.code.split("\n").slice(0, 10).join("\n");

  return (
    <Link
      to={`/view-snippet/${snip._id}`}
      className="bg-white shadow-md rounded-lg p-4 flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
    >
      {/* User Info */}
      <div className="flex items-center gap-2 mb-4">
        <div className="avatar avatar-placeholder">
          <div className={`${getRandomColor()} text-white w-9 rounded-full`}>
            <span>{getInitials(snip?.author?.userName)}</span>
          </div>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-medium text-gray-900">
            {snip?.author?.userName}
          </span>
        </div>
      </div>

      {/* Title & Language */}
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-lg">{snip.title}</h3>
        <i className={`${iconClass} text-xl`}></i>
      </div>

      {/* Code preview */}
      <div className="overflow-hidden rounded-md flex-1 mt-2">
        <SyntaxHighlighter
          language={syntax}
          style={oneDark}
          customStyle={{
            borderRadius: "6px",
            padding: "10px",
            fontSize: "13px",
            lineHeight: "1.4",
            maxHeight: "200px",
            overflow: "auto",
          }}
        >
          {previewCode}
        </SyntaxHighlighter>
      </div>

      <div className="mt-3 text-sm text-gray-600 flex justify-end">
        <span className="text-blue-500">View Full →</span>
      </div>
    </Link>
  );
});

export default function ExploreSnip() {
  const [inputVal, setInputVal] = useState("");
  const [debounceVal, setDebounceVal] = useState(inputVal);
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const { exploreSnippets, othersSnippets, authUser } = useContext(AuthContext);

  // Fetch snippets
  useEffect(() => {
    if (authUser) {
      setLoading(true);
      exploreSnippets().finally(() => setLoading(false));
    }
  }, [authUser]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(inputVal);
    }, 400);
    return () => clearTimeout(handler);
  }, [inputVal]);

  // Filter snippets
  const visibleSnippets = useMemo(() => {
    return othersSnippets?.map((snip) => {
      const matchTitle = snip.title
        .toLowerCase()
        .includes(debounceVal.toLowerCase());
      const matchLang = language ? snip.language === language : true;
      const matchTag = tags ? snip.tags.includes(tags) : true;
      return matchTitle && matchLang && matchTag;
    });
  }, [othersSnippets, debounceVal, language, tags]);

  const clearFilters = () => {
    setInputVal("");
    setLanguage("");
    setTags("");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      {/* Navbar for large screens */}
      <nav className="hidden md:block sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-[1170px] mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="hidden md:flex gap-2 items-center">
            <img src={codeImg} alt="logo" className="w-10 h-10" />
            <h1 className="text-lg sm:text-xl md:text-[22px] font-bold">
              SnipVault
            </h1>
          </div>
          <ul className="flex gap-6 items-center w-full justify-center md:justify-end">
            <li>
              <Link
                to="/dashboard"
                className="hover:text-blue-500 flex items-center gap-2 text-sm sm:text-base"
              >
                <MdDashboard /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/my-snippets"
                className="hover:text-blue-500 flex items-center gap-2 text-sm sm:text-base"
              >
                <FaFolderOpen /> My Snippets
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1170px] mx-auto py-8 px-4 sm:px-6">
        <h1 className="text-[26px] font-bold mb-2">Explore Snippets</h1>
        <p className="para-text mb-4">
          Discover the most popular and latest snippets shared by the community.
        </p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Search by title or code.."
            className="input input-bordered w-full sm:flex-1"
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="select select-bordered w-full sm:w-auto"
          >
            <option value="">Select Language</option>
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <select
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="select select-bordered w-full sm:w-auto"
          >
            <option value="">Tags</option>
            {[...new Set(othersSnippets?.flatMap((s) => s.tags))]?.map(
              (tag, idx) => (
                <option key={idx} value={tag}>
                  {tag}
                </option>
              )
            )}
          </select>
          <button
            onClick={clearFilters}
            className="btn bg-black text-white w-full sm:w-auto"
            disabled={inputVal.trim() === "" && tags.trim() === ""}
          >
            Clear Filter
          </button>
        </div>

        {/* Snippets Grid */}
        {othersSnippets?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-gray-600">
            <img src={noSnip} alt="noSnip" className="w-48 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No snippets yet</h2>
            <p className="text-gray-500 mb-6 max-w-[400px]">
              The community hasn't shared any snippets yet. Check back later!
            </p>
          </div>
        ) : visibleSnippets.every((v) => !v) ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-gray-600">
            <img src={noSnip} alt="noSnip" className="w-48 mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              No snippets match your filters
            </h2>
            <p className="text-gray-500 mb-6 max-w-[400px]">
              Try changing your search term, language, or tags.
            </p>
            <button
              onClick={clearFilters}
              className="btn btn-outline px-6 py-3 rounded-lg hover:scale-105 transition-transform"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {othersSnippets.map(
              (snip, idx) =>
                visibleSnippets[idx] && (
                  <SnippetCard key={snip._id} snip={snip} />
                )
            )}
          </div>
        )}
      </div>

      {/* Bottom Navbar for small screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-1px_5px_rgba(0,0,0,0.1)] border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          <Link
            to="/dashboard"
            className="flex flex-col items-center text-gray-600 hover:text-blue-500"
          >
            <MdDashboard className="text-[18px]" />
            <span className="text-[12px]">Dashboard</span>
          </Link>
          <Link
            to="/my-snippets"
            className="flex flex-col items-center text-gray-600 hover:text-blue-500"
          >
            <FaFolderOpen className="text-[18px]" />
            <span className="text-[12px]">My Snips</span>
          </Link>
          <Link
            to="/"
            className="flex flex-col items-center text-gray-600 hover:text-blue-500"
          >
            <FaHome className="text-[18px]" />
            <span className="text-[12px] font-semibold">Home</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
