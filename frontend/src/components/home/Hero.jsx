import React from "react";
import { Link } from "react-router-dom";
import {
  BoltIcon,
  TagIcon,
  ShareIcon,
  MagnifyingGlassIcon,
  ClipboardIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  LockClosedIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#FAFAFA] pt-[80px] flex flex-col items-center">
      {/* Hero Section */}
      <div className="max-w-[700px] text-center px-5">
        <h1 className="text-[55px] font-[700] leading-tight mt-10">
          Your code snippets, <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            organized & accessible
          </span>
        </h1>

        <p className="mt-6 text-[20px] leading-8 text-gray-600">
          Find any code snippet instantly. SnipVault securely organizes your
          code for easy search and reuse.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={"/signup"}>
            <button className="btn bg-black text-white rounded-3 p-6 text-[16px] font-[500]">
              Start Organizing for Free
            </button>
          </Link>
          <Link to={"/example/snip"}>
            <button className="btn btn-ghost border-2 border-gray-300 rounded-3 p-6 text-[16px] font-[500]">
              View Example Snippets
            </button>
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-16 max-w-[1170px] mx-auto text-center px-5">
        <h2 className="text-[32px] font-[700] mt-10">
          Everything you need to manage code snippets
        </h2>
        <p className="mt-4 text-[18px] text-gray-600 leading-7">
          Built for developers who want to stay organized and productive
        </p>
      </div>

      {/* Cards Section */}
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-15 mb-15 px-5 sm:px-10 md:px-16 lg:px-0">
          {/* card 1 */}
          <div className="card bg-base-100 w-full sm:w-96 shadow-sm border border-gray-200">
            <div className="card-body">
              <CodeBracketIcon className="w-12 h-12 text-blue-600 mb-3" />
              <h2 className="card-title">Centralized Snippet Library</h2>
              <p className="text-gray-600">
                Keep all your reusable code snippets in a single, well-organized
                space for easy access.
              </p>
            </div>
          </div>

          {/* card 2 */}
          <div className="card bg-base-100 w-full sm:w-96 shadow-sm border border-gray-200">
            <div className="card-body">
              <TagIcon className="w-12 h-12 text-green-500 mb-3" />
              <h2 className="card-title">Intelligent Tagging</h2>
              <p className="text-gray-600">
                Categorize your snippets by language, framework, or project type
                so you can locate them in seconds.
              </p>
            </div>
          </div>

          {/* card 3 */}
          <div className="card bg-base-100 w-full sm:w-96 shadow-sm border border-gray-200">
            <div className="card-body">
              <ShareIcon className="w-12 h-12 text-purple-500 mb-3" />
              <h2 className="card-title">Seamless Sharing</h2>
              <p className="text-gray-600">
                Share your code snippets publicly or privately. Generate embed
                links for websites or blogs effortlessly.
              </p>
            </div>
          </div>

          {/* card 4 */}
          <div className="card bg-base-100 w-full sm:w-96 shadow-sm border border-gray-200">
            <div className="card-body">
              <MagnifyingGlassIcon className="w-12 h-12 text-yellow-500 mb-3" />
              <h2 className="card-title">Powerful Search</h2>
              <p className="text-gray-600">
                Quickly find any snippet using advanced search and filter
                options.
              </p>
            </div>
          </div>

          {/* card 5 */}
          <div className="card bg-base-100 w-full sm:w-96 shadow-sm border border-gray-200">
            <div className="card-body">
              <ClipboardIcon className="w-12 h-12 text-red-500 mb-3" />
              <h2 className="card-title">Instant Copy</h2>
              <p className="text-gray-600">
                Copy snippets to your clipboard in one click, keeping formatting
                and syntax intact.
              </p>
            </div>
          </div>

          {/* card 6 */}
          <div className="card bg-base-100 w-full sm:w-96 shadow-sm border border-gray-200">
            <div className="card-body">
              <ChartBarIcon className="w-12 h-12 text-indigo-500 mb-3" />
              <h2 className="card-title">Usage Analytics</h2>
              <p className="text-gray-600">
                Track how often your snippets are viewed and see which ones are
                most popular.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why choose SnipVault */}
      <div className="w-full max-w-[1170px] mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-7 mt-16 mb-16 px-5 sm:px-10 md:px-16 lg:px-0">
        <div className="flex-1">
          <h3 className="text-[32px] font-[700]">
            Why developers choose SnipVault
          </h3>
          <p className="text-[18px] text-gray-600 mt-4">
            Join other developers who have streamlined their workflow with our
            snippet management platform.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 mb-5">
            <div className="flex items-start gap-3">
              <BoltIcon className="w-6 h-6 text-blue-600" />
              <p>Centralized Snippet Library</p>
            </div>
            <div className="flex items-start gap-3">
              <TagIcon className="w-6 h-6 text-green-600" />
              <p>Smart Tagging for Instant Search</p>
            </div>
            <div className="flex items-start gap-3">
              <ShareIcon className="w-6 h-6 text-purple-600" />
              <p>Seamless Sharing Options</p>
            </div>
            <div className="flex items-start gap-3">
              <MagnifyingGlassIcon className="w-6 h-6 text-orange-600" />
              <p>Powerful Snippet Search</p>
            </div>
            <div className="flex items-start gap-3">
              <ClipboardIcon className="w-6 h-6 text-pink-600" />
              <p>Instant One-Click Copy</p>
            </div>
            <div className="flex items-start gap-3">
              <ChartBarIcon className="w-6 h-6 text-indigo-600" />
              <p>Usage Analytics & Insights</p>
            </div>
            <div className="flex items-start gap-3">
              <DevicePhoneMobileIcon className="w-6 h-6 text-teal-600" />
              <p>Works on Any Device</p>
            </div>
            <div className="flex items-start gap-3">
              <LockClosedIcon className="w-6 h-6 text-red-600" />
              <p>Private & Secure Snippets</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-start w-full lg:w-auto">
          <ul className="steps sm:steps-horizontal lg:steps-vertical">
            <li className="step text-[14px] step-primary">
              Create your first snippet
            </li>
            <li className="step text-[14px] step-primary">
              Organize with tags
            </li>
            <li className="step text-[14px] step-primary">
              Share a public snippet
            </li>
            <li className="step text-[14px] step-primary">
              Complete your profile
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
