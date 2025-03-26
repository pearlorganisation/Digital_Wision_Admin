import { useState, useEffect, useRef } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { adminLogout } from "../../../features/actions/authAction";
import { logout } from "../../../features/slices/authSlice";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const dropdownRef = useRef(null); // Reference for the dropdown
  const buttonRef = useRef(null); // Reference for the button

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    dispatch(adminLogout());
    dispatch(logout());
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#fbf4fd] text-black shadow-md border-b-4 border-[#3e8abd]">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <img
          src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
          className="w-44 h-16"
          alt="Logo"
        />

        {/* User Info Section */}
        <div className="relative">
          <button
            ref={buttonRef} // Set ref to the button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 text-base font-medium hover:text-[#3ebd59] focus:outline-none"
          >
            <IoPersonCircleOutline className="text-3xl" />
            <span className="hidden sm:inline">{"User"}</span>
            <HiOutlineChevronDown className="text-lg" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef} // Set ref to the dropdown menu
              className="absolute right-0 mt-3 w-48 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-300"
            >
              <Link to="/profile">
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="block w-full text-left px-5 py-3 text-md font-medium hover:bg-gray-100 hover:text-gray-900 transition-all"
                >
                  Profile
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-5 py-3 text-md font-medium text-red-600 hover:bg-red-100 hover:text-red-700 transition-all"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
