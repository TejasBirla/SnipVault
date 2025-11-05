import React, { useContext, useEffect, useState } from "react";
import codeImg from "../../assets/codeImg.png";
import { languages } from "../utility/RepeatedCodes.js";
import { FaHome, FaFolderOpen, FaCog } from "react-icons/fa";
import { Editor } from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthContext.jsx";

export default function EditSnip() {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [codeDesc, setCodeDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);

  const { viewSnippet, seeSnippet, authUser, editSnippet, showToastMsg } =
    useContext(AuthContext);

  const { id } = useParams();

  useEffect(() => {
    if (id && authUser) {
      setLoading(true);
      viewSnippet(id).finally(() => setLoading(false));
    }
  }, [id, authUser]);

  useEffect(() => {
    if (seeSnippet) {
      setTitle(seeSnippet?.title);
      setLanguage(seeSnippet?.language);
      setCode(seeSnippet?.code);
      setCodeDesc(seeSnippet?.description);
      setTags(seeSnippet?.tags);
      setIsPublic(seeSnippet?.isPublic);
    }
  }, [seeSnippet]);

  const resetStates = () => {
    setCode("");
    setLanguage("javascript");
    setTitle("");
    setCodeDesc("");
    setTagInput("");
    setTags([]);
    setIsPublic(true);
  };

  const addTag = () => {
    if (tagInput.trim().length > 25) {
      showToastMsg("Tag should be less than 25 characters.", false);
      setTagInput("");
      return;
    }
    if (tags.length === 4) {
      showToastMsg("Only 4 tags are allowed", false);
      setTagInput("");
      return;
    }
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 4) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) =>
    setTags(tags.filter((tag) => tag !== tagToRemove));

  const editSnip = async () => {
    if (
      !title.trim() ||
      !language.trim() ||
      !code.trim() ||
      tags.length === 0
    ) {
      showToastMsg("All fields are require.", false);
      return;
    }
    if (codeDesc.trim().length > 200) {
      showToastMsg("Description should be less than 200 characters.", false);
      return;
    }

    const editSnipData = {
      title,
      language,
      code,
      description: codeDesc,
      tags,
      isPublic,
    };

    await editSnippet(id, editSnipData);

    resetStates();
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md hidden md:block">
        <div className="max-w-[1170px] w-full mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo + text for md+ */}
          <div className="hidden md:flex gap-2 items-center">
            <img src={codeImg} alt="logo" className="w-10 h-10" />
            <h1 className="text-[22px] font-bold">SnipVault</h1>
          </div>

          {/* Menu */}
          <ul className="flex gap-6 items-center w-full justify-center md:justify-end">
            <li>
              <a
                href="/explore"
                className="hover:text-blue-500 flex items-center gap-2"
              >
                <FaHome /> Explore
              </a>
            </li>
            <li>
              <a
                href="/my-snippets"
                className="hover:text-blue-500 flex items-center gap-2"
              >
                <FaFolderOpen /> My Snippets
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="hover:text-blue-500 flex items-center gap-2"
              >
                <FaCog /> Settings
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Page Header */}
      <div className="max-w-[850px] mx-auto text-center mt-6 sm:mt-10">
        <h1 className="text-2xl font-bold mb-2">Edit Snippet</h1>
        <p className="para-text mb-5">Update your snippet information</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="max-w-[850px] w-full mx-auto mt-6 sm:mt-10 bg-white rounded-lg shadow-md p-6">
          {/* Title */}
          <label className="floating-label w-full mb-5">
            <span>Code Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Code Title"
              className="input input-md w-full"
            />
          </label>

          {/* Language */}
          <label className="floating-label w-full mb-6">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="select w-full"
            >
              <option disabled value="">
                Choose language
              </option>
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </label>

          {/* Editor */}
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-5">
            <Editor
              height="375px"
              language={language}
              value={code}
              onChange={(value) => setCode(value)}
              theme="vs-light"
              options={{
                minimap: { enabled: false },
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                wordWrap: "on",
                fontSize: 14,
                folding: true,
                renderLineHighlight: "all",
                automaticLayout: true,
                tabSize: 2,
              }}
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <textarea
              placeholder="Code Description in 200 characters. (Optional)"
              className="textarea textarea-md w-full"
              value={codeDesc}
              onChange={(e) => setCodeDesc(e.target.value)}
            />
          </div>

          {/* Tags */}
          <div className="mb-5">
            <label className="floating-label w-full">
              <span>Tags</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                  placeholder="Enter a tag"
                  className="input input-bordered w-full"
                />
                <button
                  onClick={addTag}
                  disabled={tagInput.trim().length === 0}
                  className="btn bg-black text-white rounded-3 p-5 font-[400] cursor-pointer"
                >
                  Add
                </button>
              </div>
            </label>

            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-blue-500 hover:text-blue-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Visibility */}
          <div className="mb-5">
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
              <legend className="fieldset-legend">Visibility Options</legend>
              <label className="label">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={() => setIsPublic(!isPublic)}
                  className="checkbox"
                />
                Public Snippet
              </label>
            </fieldset>
          </div>

          <hr className="border-b-1 border-gray-300 border-solid w-full mb-4" />

          <button
            onClick={editSnip}
            className="btn bg-black text-white rounded-3 p-5 font-[400] cursor-pointer"
          >
            Edit Snippet
          </button>
        </div>
      )}

      {/* Bottom Navbar for small screens */}
      <nav className="fixed bottom-0 left-0 w-full bg-white shadow-t-md border-t border-gray-200 flex justify-around items-center py-3 md:hidden">
        <a
          href="/explore"
          className="flex flex-col items-center text-gray-600 hover:text-blue-500 text-sm"
        >
          <FaHome className="text-lg mb-1" />
          Explore
        </a>
        <a
          href="/my-snippets"
          className="flex flex-col items-center text-gray-600 hover:text-blue-500 text-sm"
        >
          <FaFolderOpen className="text-lg mb-1" />
          My Snippets
        </a>
        <a
          href="/settings"
          className="flex flex-col items-center text-gray-600 hover:text-blue-500 text-sm"
        >
          <FaCog className="text-lg mb-1" />
          Settings
        </a>
      </nav>
    </div>
  );
}
