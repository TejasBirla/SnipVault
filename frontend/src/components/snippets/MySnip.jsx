import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import {
  FaEllipsisV,
  FaRegCopy,
  FaEdit,
  FaEye,
  FaPlusCircle,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoCodeSlash } from "react-icons/io5";
import { Editor } from "@monaco-editor/react";
import { Link } from "react-router-dom";
import codeImg from "../../assets/codeImg.png";
import noSnip from "../../assets/noSnip.png";
import { getMonacoLang, languages } from "../utility/RepeatedCodes.js";
import { AuthContext } from "../../Providers/AuthContext.jsx";

// SnippetCard
const SnippetCard = React.memo(({ snip, handleCopy, visible }) => {
  return (
    <div
      className={`rounded-lg overflow-hidden w-full border border-gray-200 p-4 bg-white shadow-sm relative ${
        !visible ? "hidden" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-semibold text-sm sm:text-base">{snip.title}</h2>
        <div className="flex items-center gap-2">
          <span
            className={`badge ${
              snip.isPublic ? "badge-success" : "badge-error"
            } text-[10px] sm:text-xs`}
          >
            {snip.isPublic ? "Public" : "Private"}
          </span>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="cursor-pointer">
              <FaEllipsisV />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"
            >
              <li>
                <Link
                  to={`/edit-snippet/${snip?._id}`}
                  className="flex items-center gap-2"
                >
                  <FaEdit /> Edit
                </Link>
              </li>
              <li>
                <Link
                  to={`/view-snippet/${snip._id}`}
                  className="flex items-center gap-2"
                >
                  <FaEye /> View
                </Link>
              </li>
              <li>
                <p
                  onClick={() => handleCopy(snip.code)}
                  className="flex items-center gap-2"
                >
                  <FaRegCopy /> Copy
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Editor
        height="220px"
        language={getMonacoLang(snip.language)}
        value={snip.code}
        theme="vs-light"
        options={{
          minimap: { enabled: false },
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          wordWrap: "on",
          fontSize: 13,
          folding: true,
          renderLineHighlight: "all",
          automaticLayout: true,
          readOnly: true,
        }}
      />
    </div>
  );
});

export default function MySnip() {
  const { userSnippets, mySnippets, authUser, showToastMsg } =
    useContext(AuthContext);

  const [codeTitle, setCodeTitle] = useState("");
  const [debounceTitle, setDebounceTitle] = useState(codeTitle);
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authUser) {
      setLoading(true);
      mySnippets().finally(() => setLoading(false));
    }
  }, [authUser]);

  useEffect(() => {
    const handler = setTimeout(() => setDebounceTitle(codeTitle), 400);
    return () => clearTimeout(handler);
  }, [codeTitle]);

  const handleCopy = useCallback(
    (code) => {
      navigator.clipboard.writeText(code).then(() => {
        setIsCopied(true);
        showToastMsg("Code copied to clipboard", true);
        setTimeout(() => setIsCopied(false), 3000);
      });
    },
    [showToastMsg]
  );

  const visibleSnippets = useMemo(() => {
    return userSnippets?.map((snip) => {
      const matchTitle = snip.title
        .toLowerCase()
        .includes(debounceTitle.toLowerCase());
      const matchLang = language ? snip.language === language : true;
      const matchTag = tags ? snip.tags.includes(tags) : true;
      return matchTitle && matchLang && matchTag;
    });
  }, [userSnippets, debounceTitle, language, tags]);

  const clearFilters = () => {
    setCodeTitle("");
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
            <Link
              to={"/dashboard"}
              className="hover:text-blue-500 flex items-center gap-2 text-sm sm:text-base"
            >
              <MdDashboard /> Dashboard
            </Link>
            <li>
              <Link
                to="/explore-snippets"
                className="hover:text-blue-500 flex items-center gap-2 text-sm sm:text-base"
              >
                <IoCodeSlash /> Explore
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Header */}
      <div className="mt-6 max-w-[1170px] mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-[32px] font-[700]">
          My Snippets
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          Organize your code, tag your snippets, and never lose track of your
          important code blocks.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-[1170px] mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4 mt-5 px-4">
        <input
          type="text"
          value={codeTitle}
          onChange={(e) => setCodeTitle(e.target.value)}
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
          {[...new Set(userSnippets.flatMap((s) => s.tags))].map((tag, idx) => (
            <option key={idx} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <button
          className="btn bg-black text-white font-[300] w-full sm:w-auto"
          disabled={codeTitle.trim().length === 0 && tags.trim() === ""}
          onClick={clearFilters}
        >
          Clear Filter
        </button>
      </div>

      {/* Snippets Grid */}
      <div className="max-w-[1170px] mx-auto mt-6 px-4 pb-24">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg p-4 bg-gray-200 animate-pulse h-60"
              ></div>
            ))}
          </div>
        ) : userSnippets?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-3 text-center text-gray-600">
            <img src={noSnip} alt="noSnip" className="mt-[-15px]" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              No snippets yet
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mb-6 max-w-[400px]">
              You haven’t saved any code snippets yet. Start adding your code to
              quickly access and organize them here.
            </p>
            <Link
              to="/create/snippets"
              className="btn btn-outline px-6 py-3 rounded-lg hover:scale-105 transition-transform"
            >
              + Add New Snippet
            </Link>
          </div>
        ) : visibleSnippets.every((v) => !v) ? (
          <div className="flex flex-col items-center justify-center py-3 text-center text-gray-600">
            <img src={noSnip} alt="noSnip" className="mt-[-18px]" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              No snippets match your filters
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mb-6 max-w-[400px]">
              Try changing your search title, language, or tags to see matching
              snippets.
            </p>
            <button
              onClick={clearFilters}
              className="btn btn-outline px-6 py-3 rounded-lg hover:scale-105 transition-transform"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {userSnippets.map((snip, idx) => (
              <SnippetCard
                key={snip._id}
                snip={snip}
                handleCopy={handleCopy}
                visible={visibleSnippets[idx]}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navbar for small screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-1px_5px_rgba(0,0,0,0.1)] border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          <Link
            to="/dashboard"
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <MdDashboard className="text-[18px]" />
            <span className="text-[12px]">Dashboard</span>
          </Link>
          <Link
            to="/explore-snippets"
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <IoCodeSlash className="text-[18px]" />
            <span className="text-[12px]">Explore</span>
          </Link>
          <Link
            to="/create/snippets"
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <FaPlusCircle className="text-[18px]" />
            <span className="text-[12px]">New Snip</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
