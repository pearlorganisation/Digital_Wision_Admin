/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import  { motion } from "framer-motion";
import { FaBars, FaHome} from "react-icons/fa";
import {
  MdPeople,
  MdGroup,
  MdAddBox,

} from "react-icons/md";

import { useState } from "react";
import SidebarMenu from "./SidebarMenu";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/partners",
    name: "Partner",
    icon: <MdPeople />,
    subRoutes: [
      { path: "/partners", name: "List Partners", icon: <MdGroup /> },
      {
        path: "/partners/add-partner",
        name: "Add Partner",
        icon: <MdAddBox />,
      },
    ],
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: { width: 0, opacity: 0, transition: { duration: 0.2 } },
    show: { opacity: 1, width: "auto", transition: { duration: 0.3 } },
  };

  return (
    <div className="flex min-h-screen">
      <motion.div
        animate={{ width: isOpen ? "250px" : "60px" }}
        transition={{ duration: 0.4, ease: "easeInOut" }} // Smooth transition
        className="bg-[#f4fdfc] text-black flex flex-col"
      >
        <div className="flex items-center justify-between px-4 py-3">
          {isOpen && <h1 className="text-xl font-bold">Sidebar</h1>}
          <button
            onClick={toggleSidebar}
            className="text-lg focus:outline-none hover:text-black/20"
          >
            <FaBars />
          </button>
        </div>
        <nav className="flex-grow overflow-y-auto">
          {routes.map((route, index) => (
            <div key={index}>
              {route.subRoutes ? (
                <SidebarMenu
                  route={route}
                  isOpen={isOpen}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                  showAnimation={showAnimation}
                />
              ) : (
                <NavLink
                  to={route.path}
                  className="flex items-center px-4 py-2 bg-[#f4fdfc] text-black font-medium hover:bg-black/20 "
                >
                  <div className="mr-3">{route.icon}</div>
                  {isOpen && <span>{route.name}</span>}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </motion.div>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default SideBar;
