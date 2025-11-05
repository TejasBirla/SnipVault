import React from "react";
import Editor from "@monaco-editor/react";
import { MockData } from "../demo/MockData.js";
import { getIcons, getMonacoLang } from "../utility/RepeatedCodes.js";

export default function ExampleSnip() {

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 md:px-10">
      <div className="max-w-[1170px] mx-auto py-12 flex flex-col items-center">
        {/* Title + Icon */}
        <div className="flex flex-wrap gap-3 items-center justify-center text-2xl sm:text-3xl md:text-[28px] text-center">
          <h1 className="font-semibold">{MockData.title}</h1>
          <i
            className={`${getIcons(MockData.language)} text-xl sm:text-2xl`}
          ></i>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-3 mb-6">
          {[...new Set(MockData.tags)]?.map((t, index) => (
            <div
              key={index}
              className="badge badge-neutral py-3 px-4 text-sm sm:text-base"
            >
              {t}
            </div>
          ))}
        </div>

        {/* Code Card */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-4 sm:p-6 w-full sm:w-[90%] md:w-[800px]">
          {/* Header */}
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h4 className="font-bold text-lg sm:text-xl">{MockData.title}</h4>
              <p className="text-sm sm:text-base text-gray-500">
                {MockData.language}
              </p>
            </div>
          </div>

          {/* Editor */}
          <div className="rounded overflow-hidden w-full">
            <Editor
              height={
                window.innerWidth < 480
                  ? "180px"
                  : window.innerWidth < 768
                  ? "220px"
                  : "260px"
              }
              language={getMonacoLang(MockData.language.toLowerCase())}
              defaultValue={MockData.code}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: "on",
                fontSize: window.innerWidth < 480 ? 12 : 14,
              }}
            />
          </div>
        </div>

        {/* Description */}
        {MockData.codeDescription && (
          <p className="para-text mt-10 max-w-[800px] text-center text-gray-700 text-sm sm:text-base md:text-lg px-3">
            {MockData.codeDescription}
          </p>
        )}
      </div>
    </div>
  );
}
