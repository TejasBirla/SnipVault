// import React from "react";
// import { CodeBracketIcon } from "@heroicons/react/24/outline";
// import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="bg-neutral text-neutral-content px-6 py-4">
//       <div className="max-w-[1170px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
//         {/* Left side logo + copyright */}
//         <aside className="flex items-center gap-2">
//           <CodeBracketIcon className="w-8 h-8 text-white" />
//           <p className="text-sm">
//             © {new Date().getFullYear()} SnipVault. All rights reserved.
//           </p>
//         </aside>

//         {/* Center "Made with love" */}
//         <p className="text-sm text-gray-300">
//           Made with <span className="text-red-500">❤️</span> by{" "}
//           <span className="font-semibold">Tejas Birla</span>
//         </p>

//         {/* Right side social links */}
//         <nav className="flex gap-4">
//           <a
//             href={import.meta.env.VITE_GITHUB_URL}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <FaGithub className="w-6 h-6 hover:text-gray-400 transition" />
//           </a>
//           <a
//             href={import.meta.env.VITE_LINKEDIN_URL}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <FaLinkedin className="w-6 h-6 hover:text-blue-600 transition" />
//           </a>
//           <a
//             href={import.meta.env.VITE_X_PROFILE_URL}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <FaTwitter className="w-6 h-6 hover:text-blue-400 transition" />

//           </a>
//         </nav>
//       </div>
//     </footer>
//   );
// }

import React from "react";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
// import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaGithub, FaLinkedin, FaTwitter, FaXTwitter } from "react-icons/fa6";


export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content px-6 py-5 mt-auto">
      <div className="max-w-[1170px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Left side logo + copyright */}
        <aside className="flex items-center justify-center sm:justify-start gap-2">
          <CodeBracketIcon className="w-7 h-7 text-white" />
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold">SnipVault</span>. All rights
            reserved.
          </p>
        </aside>

        {/* Center "Made with love" */}
        <p className="text-sm text-gray-400">
          Made with <span className="text-red-500">❤️</span> by{" "}
          <span className="font-semibold text-gray-200">Tejas Birla</span>
        </p>

        {/* Right side social links */}
        <nav className="flex justify-center sm:justify-end gap-5">
          <a
            href={import.meta.env.VITE_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="w-6 h-6 hover:text-gray-400 transition-colors duration-200" />
          </a>
          <a
            href={import.meta.env.VITE_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-6 h-6 hover:text-blue-500 transition-colors duration-200" />
          </a>
          <a
            href={import.meta.env.VITE_X_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaXTwitter className="w-6 h-6 hover:text-sky-400 transition-colors duration-200" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
