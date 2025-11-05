import React, { useContext, useEffect, useState } from "react";
import codeImg from "../../assets/codeImg.png";
import { Link, useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy, FaFolderOpen, FaHeart, FaHome } from "react-icons/fa";
import { Heart } from "lucide-react";
import { MdDashboard } from "react-icons/md";
import { IoCodeSlash } from "react-icons/io5";
import { FaDeleteLeft, FaRegHeart } from "react-icons/fa6";
import { AuthContext } from "../../Providers/AuthContext";
import { getFormattedDate, getSyntax } from "../utility/RepeatedCodes";
import Modal from "../utility/Modal";

export default function ViewSnip() {
  const {
    viewSnippet,
    seeSnippet,
    authUser,
    deleteCurrentSnippet,
    likeToggle,
  } = useContext(AuthContext);

  const [isCopied, setIsCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (id && authUser) {
      setLoading(true);
      viewSnippet(id).finally(() => setLoading(false));
    }
  }, [id, authUser]);

  useEffect(() => {
    if (seeSnippet && authUser) {
      setLikeCount(seeSnippet?.likes.length);
      setLiked(seeSnippet?.likes?.includes(authUser?._id));
    }
  }, [seeSnippet, authUser]);

  const username = seeSnippet?.author?.userName;
  const initials = username
    ? username
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "";

  const handleLike = async () => {
    const result = await likeToggle(id);
    if (result) {
      setLiked(result.liked);
      setLikeCount(result.likeCount);
    }
  };

  const copyCode = () => {
    if (!seeSnippet) return;
    navigator.clipboard.writeText(seeSnippet.code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  const handleDelete = () => {
    deleteCurrentSnippet(id);
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!seeSnippet) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Snippet not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20 sm:pb-10">
      {/* Navbar (for laptop/desktop) */}
      <nav className="hidden md:block sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-[1170px] mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex gap-2 items-center">
            <img src={codeImg} alt="logo" className="w-10 h-10" />
            <h1 className="text-lg sm:text-xl md:text-[22px] font-bold">
              SnipVault
            </h1>
          </div>
          <ul className="flex gap-6 items-center w-full justify-center md:justify-end">
            <li>
              <Link
                to={"/dashboard"}
                className="hover:text-blue-500 flex items-center gap-2 text-sm sm:text-base"
              >
                <MdDashboard /> Dashboard
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
                className="hover:text-blue-500 flex items-center gap-2 text-sm sm:text-base"
              >
                <FaFolderOpen /> My Snippets
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Snippet Content */}
      <div className="max-w-[800px] mx-auto py-8 px-4 sm:py-10 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0 break-words">
            {seeSnippet.title}
          </h1>
          <span className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-full w-auto max-w-max whitespace-nowrap">
            {seeSnippet.language}
          </span>
        </div>

        {/* Author */}
        <div className="mb-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="avatar avatar-placeholder">
              <div className="bg-secondary text-neutral-content w-10 rounded-full">
                <span>{initials}</span>
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-medium text-gray-900">{username}</span>
              <span className="text-xs text-gray-500">
                {getFormattedDate(seeSnippet.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Code Block */}
        <div className="overflow-auto rounded-lg shadow-md mb-6">
          <SyntaxHighlighter
            language={getSyntax(seeSnippet?.language)}
            style={oneDark}
            customStyle={{
              padding: "20px",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            {seeSnippet.code}
          </SyntaxHighlighter>
        </div>

        {/* Likes */}
        {seeSnippet?.isPublic && (
          <div className="mb-4 text-sm text-gray-500 flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            {likeCount}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {seeSnippet.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs cursor-pointer hover:from-blue-200 hover:to-blue-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Description */}
        {seeSnippet.description && (
          <p className="w-full para-text mb-5">{seeSnippet.description}</p>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          {seeSnippet?.isPublic && (
            <button
              className="btn btn-outline btn-secondary flex items-center gap-2"
              onClick={handleLike}
            >
              {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              {liked ? "Liked" : "Like"} ({likeCount})
            </button>
          )}
          <button
            className="btn btn-outline flex items-center gap-2"
            onClick={copyCode}
          >
            <FaCopy /> Copy
          </button>
          {seeSnippet?.author?.userName === authUser?.userName && (
            <>
              <button
                className="btn btn-outline btn-error flex items-center gap-2"
                onClick={() => setShowModal(true)}
              >
                <FaDeleteLeft /> Delete
              </button>
              <Modal
                id="delete_modal"
                title="Confirm Delete"
                isOpen={showModal}
                onClose={() => setShowModal(false)}
              >
                <p className="text-center">
                  Are you sure you want to delete this snippet?
                </p>
                <div className="flex gap-3 mt-4 justify-center">
                  <button className="btn btn-error" onClick={handleDelete}>
                    Delete
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Modal>
            </>
          )}
        </div>
      </div>

      {/* Toast */}
      {isCopied && (
        <div className="fixed top-5 right-5 z-50">
          <div className="toast">
            <div className="alert alert-success">
              <span>Code copied to clipboard.</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navbar (for mobile/tablet only) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
        <ul className="flex justify-around py-3 text-sm">
          <li>
            <Link
              to="/dashboard"
              className="flex flex-col items-center text-gray-600 hover:text-blue-500"
            >
              <MdDashboard className="text-[18px]" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/explore-snippets"
              className="flex flex-col items-center text-gray-600 hover:text-blue-500"
            >
              <IoCodeSlash className="text-[18px]" />
              <span>Explore</span>
            </Link>
          </li>
          <li>
            <Link
              to="/my-snippets"
              className="flex flex-col items-center text-gray-600 hover:text-blue-500"
            >
              <FaFolderOpen className="text-[18px]" />
              <span>My Snips</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
