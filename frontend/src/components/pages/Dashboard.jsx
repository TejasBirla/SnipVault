import React, { useContext, useEffect, useState } from "react";
import codeImg from "../../assets/codeImg.png";
import { Link } from "react-router-dom";
import {
  FaGlobe,
  FaLock,
  FaLaptopCode,
  FaHome,
  FaFolderOpen,
  FaCode,
} from "react-icons/fa";
import Editor from "@monaco-editor/react";
import { AuthContext } from "../../Providers/AuthContext";
import { getFormattedDate, getMonacoLang } from "../utility/RepeatedCodes";
import { IoCodeSlash } from "react-icons/io5";

export default function Dashboard() {
  const { userSnippets, mySnippets, authUser } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const messages = [
    "Your top snippet will shine here soon! ✨",
    "Keep coding, fame is just a few likes away 💻",
    "Add snippets. Share. Rule the dashboard 🚀",
    "No top snippet yet... but greatness is loading ⏳",
    "Start sharing to get featured as the Top Snippet ⭐",
  ];

  const handleClick = () => {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMsg);
  };

  useEffect(() => {
    if (authUser) {
      mySnippets();
    }
  }, [authUser]);

  const snipDetails = {
    totalSnips: userSnippets?.length || 0,
    publicSnips: userSnippets?.filter((snips) => snips.isPublic).length || 0,
    privateSnips: userSnippets?.filter((snips) => !snips.isPublic).length || 0,
    languagesUsed: [
      ...new Set(userSnippets?.map((snips) => snips.language) || []),
    ].length,
  };

  const latestSnippet = userSnippets.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];

  const topSnippet =
    userSnippets.find((snip) => snip.likes?.length >= 10) || null;

  const noSnippets = !latestSnippet && !topSnippet;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Navbar for md+ screens */}
      <nav className="hidden md:block sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-[1170px] mx-auto flex justify-between items-center px-6 py-3">
          <div className="flex gap-2 items-center">
            <img src={codeImg} alt="logo" className="w-10 h-10" />
            <h1 className="text-[22px] font-bold">SnipVault</h1>
          </div>
          <ul className="flex gap-6">
            <li>
              <Link
                to={"/"}
                className="hover:text-blue-500 flex items-center gap-2"
              >
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link
                to={"/explore-snippets"}
                className="hover:text-blue-500 flex items-center gap-2"
              >
                <IoCodeSlash /> Explore
              </Link>
            </li>
            <li>
              <Link
                to={"/my-snippets"}
                className="hover:text-blue-500 flex items-center gap-2"
              >
                <FaFolderOpen /> My Snippets
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-[1170px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Welcome Box */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl shadow-lg p-6 gap-4 sm:gap-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Hello {authUser?.userName || "User"} 👋
            </h1>
            <p className="text-white/90 mt-1 text-sm sm:text-base">
              Welcome to your favorite code snippet tool!
            </p>
          </div>
          <Link to={"/create/snippets"} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-white text-purple-700 font-semibold px-4 py-2 rounded-md shadow hover:bg-gray-100 transition cursor-pointer">
              + Create new Snippet
            </button>
          </Link>
        </div>

        {/* ✅ Responsive Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center text-center">
            <FaCode className="text-blue-600 mb-2" size={26} />
            <h3 className="text-sm sm:text-base text-gray-600">
              Total Snippets
            </h3>
            <p className="text-xl sm:text-2xl font-semibold text-blue-600">
              {snipDetails.totalSnips}
            </p>
            <span className="text-xs sm:text-sm text-gray-500 mt-1">
              All-time snippets
            </span>
          </div>

          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center text-center">
            <FaGlobe className="text-green-500 mb-2" size={26} />
            <h3 className="text-sm sm:text-base text-gray-600">Public</h3>
            <p className="text-xl sm:text-2xl font-semibold text-green-500">
              {snipDetails.publicSnips}
            </p>
            <span className="text-xs sm:text-sm text-gray-500 mt-1">
              Shared with community
            </span>
          </div>

          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center text-center">
            <FaLock className="text-purple-500 mb-2" size={26} />
            <h3 className="text-sm sm:text-base text-gray-600">Private</h3>
            <p className="text-xl sm:text-2xl font-semibold text-purple-500">
              {snipDetails.privateSnips}
            </p>
            <span className="text-xs sm:text-sm text-gray-500 mt-1">
              Only visible to you
            </span>
          </div>

          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center text-center">
            <FaLaptopCode className="text-blue-500 mb-2" size={26} />
            <h3 className="text-sm sm:text-base text-gray-600">Languages</h3>
            <p className="text-xl sm:text-2xl font-semibold text-blue-500">
              {snipDetails.languagesUsed}
            </p>
            <span className="text-xs sm:text-sm text-gray-500 mt-1">
              JS, Python, C++...
            </span>
          </div>
        </div>

        {/* Snippets Section */}
        <div className="mt-12">
          {noSnippets ? (
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-600">
              <h2 className="text-2xl font-semibold mb-2">
                No snippets yet 👀
              </h2>
              <p>
                You haven’t created any snippets yet. Start by creating your
                first snippet and share it with the community!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {latestSnippet && (
                <SnippetCard snippet={latestSnippet} label="Latest Snippet" />
              )}
              {topSnippet ? (
                <SnippetCard snippet={topSnippet} label="Top Snippet" />
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center">
                  <h3 className="font-bold text-xl mb-2 text-center text-gray-700">
                    Top Snippet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    No top snippet yet — click below for a surprise message 💬
                  </p>
                  <button
                    onClick={handleClick}
                    className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
                  >
                    Message
                  </button>

                  {message && (
                    <div className="mt-4 bg-white border border-gray-200 rounded-md p-4 text-sm text-gray-700 shadow-inner animate-fadeIn italic">
                      <p>{`"${message}"`}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dock */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-t flex justify-around py-2 z-50 border-t border-gray-300">
        <Link
          to={"/"}
          className="flex flex-col items-center text-gray-600 hover:text-blue-500"
        >
          <FaHome size={20} />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          to="/explore-snippets"
          className="flex flex-col items-center text-gray-600 hover:text-blue-500"
        >
          <IoCodeSlash size={20} />
          <span className="text-xs">Explore</span>
        </Link>
        <Link
          to="/my-snippets"
          className="flex flex-col items-center text-gray-600 hover:text-blue-500"
        >
          <FaFolderOpen size={20} />
          <span className="text-xs">My Snippets</span>
        </Link>
      </div>
    </div>
  );
}

// SnippetCard Component
const SnippetCard = ({ snippet, label }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
    <h3 className="font-bold text-xl mb-2 text-center text-gray-700">
      {label}
    </h3>
    <p className="text-sm text-gray-500 mb-2">{snippet.language}</p>
    <div className="rounded overflow-hidden">
      <Editor
        height="150px"
        defaultLanguage={getMonacoLang(snippet.language.toLowerCase())}
        defaultValue={snippet.code}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          wordWrap: "on",
          fontSize: 14,
          folding: false,
          renderLineHighlight: "none",
        }}
      />
    </div>
    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
      <span>{snippet?.likes?.length} Likes</span>
      <span>{getFormattedDate(snippet.createdAt)}</span>
    </div>
  </div>
);
