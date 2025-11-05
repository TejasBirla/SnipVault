// import React, { useContext, useState } from "react";
// import codeImg from "../../assets/codeImg.png";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { AuthContext } from "../../Providers/AuthContext";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const { logoutUser, authUser } = useContext(AuthContext);

//   return (
//     <nav className="bg-base-100 shadow-sm font-poppins fixed w-full z-50">
//       <div className="max-w-[1170px] mx-auto px-5 flex items-center justify-between h-16">
//         {/* Logo + Title */}
//         <div className="flex items-center">
//           <img
//             src={codeImg}
//             alt="logo"
//             className="h-10 w-10 object-contain mr-3"
//           />
//           <h1 className="text-2xl font-extrabold tracking-tight text-gray-800">
//             SnipVault
//           </h1>
//         </div>

//         {/* Desktop Buttons */}
//         {!authUser ? (
//           <div className="hidden sm:flex space-x-3">
//             <Link to={"/login"}>
//               <button className="btn btn-ghost text-gray-700 normal-case font-medium px-4 py-2 hover:bg-gray-100 rounded-md">
//                 Sign In
//               </button>
//             </Link>
//             <Link to={"/signup"}>
//               <button className="btn bg-black text-white normal-case font-medium px-5 py-2 hover:bg-gray-800 rounded-md">
//                 Get Started
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <div className="hidden sm:flex space-x-3">
//             <Link to={"/dashboard"}>
//               <button className="btn bg-black text-white normal-case font-medium px-5 py-2 hover:bg-gray-800 rounded-md">
//                 My Dashboard
//               </button>
//             </Link>
//             <button
//               className="btn btn-error text-white normal-case font-medium px-5 py-2 rounded-md"
//               onClick={logoutUser}
//             >
//               Logout
//             </button>
//           </div>
//         )}

//         {/* Hamburger (only on mobile) */}
//         <div className="sm:hidden">
//           <button
//             className="btn btn-square btn-ghost"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isOpen && (
//         <div className="sm:hidden flex flex-col space-y-2 px-5 py-3 bg-base-100 shadow-md absolute top-16 left-0 w-full">
//           {!authUser ? (
//             <>
//               <Link to={"/login"} className="w-full">
//                 <button className="btn btn-ghost w-full text-gray-800 normal-case font-medium py-3 hover:bg-gray-100 rounded-md">
//                   Sign In
//                 </button>
//               </Link>
//               <Link to={"/signup"} className="w-full">
//                 <button className="btn bg-black w-full text-white normal-case font-medium py-3 hover:bg-gray-900 rounded-md">
//                   Get Started
//                 </button>
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link to={"/dashboard"} className="w-full">
//                 <button className="btn bg-black w-full text-white normal-case font-medium px-5 py-2 hover:bg-gray-900 rounded-md">
//                   My Dashboard
//                 </button>
//               </Link>
//               <button
//                 className="btn btn-warning text-white normal-case font-medium px-5 py-2 hover:bg-gray-800 rounded-md"
//                 onClick={logoutUser}
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

import React, { useContext, useState } from "react";
import codeImg from "../../assets/codeImg.png";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logoutUser, authUser } = useContext(AuthContext);

  return (
    <nav className="bg-base-100 shadow-sm font-poppins fixed w-full z-50">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-5 flex items-center justify-between h-16">
        {/* Logo + Title */}
        <div className="flex items-center">
          <img
            src={codeImg}
            alt="logo"
            className="h-9 w-9 sm:h-10 sm:w-10 object-contain mr-3"
          />
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-800">
            SnipVault
          </h1>
        </div>

        {/* Desktop Buttons */}
        {!authUser ? (
          <div className="hidden sm:flex space-x-3">
            <Link to={"/login"}>
              <button className="btn btn-ghost text-gray-700 normal-case font-medium px-4 py-2 hover:bg-gray-100 rounded-md">
                Sign In
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="btn bg-black text-white normal-case font-medium px-5 py-2 hover:bg-gray-800 rounded-md">
                Get Started
              </button>
            </Link>
          </div>
        ) : (
          <div className="hidden sm:flex space-x-3">
            <Link to={"/dashboard"}>
              <button className="btn bg-black text-white normal-case font-medium px-5 py-2 hover:bg-gray-800 rounded-md">
                My Dashboard
              </button>
            </Link>
            <button
              onClick={logoutUser}
              className="btn normal-case font-medium px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white border-none"
            >
              Logout
            </button>
          </div>
        )}

        {/* Hamburger (only on mobile) */}
        <div className="sm:hidden">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="sm:hidden flex flex-col space-y-2 px-5 py-3 bg-base-100 shadow-md absolute top-16 left-0 w-full border-t border-gray-200 transition-all duration-200">
          {!authUser ? (
            <>
              <Link to={"/login"} onClick={() => setIsOpen(false)}>
                <button className="btn btn-ghost w-full text-gray-800 normal-case font-medium py-3 hover:bg-gray-100 rounded-md">
                  Sign In
                </button>
              </Link>
              <Link to={"/signup"} onClick={() => setIsOpen(false)}>
                <button className="btn bg-black w-full text-white normal-case font-medium py-3 hover:bg-gray-900 rounded-md">
                  Get Started
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/dashboard"} onClick={() => setIsOpen(false)}>
                <button className="btn bg-black w-full text-white normal-case font-medium py-3 hover:bg-gray-900 rounded-md">
                  My Dashboard
                </button>
              </Link>
              <button
                onClick={() => {
                  logoutUser();
                  setIsOpen(false);
                }}
                className="btn w-full normal-case font-medium py-3 rounded-md bg-red-500 hover:bg-red-600 text-white border-none"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
