import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const themes = {
  emerald: "emerald",
  business: "business",
};
const getTheneFromLocalStorage = () => {
  return localStorage.getItem("theme") || themes.emerald;
};
const Navbar = () => {
  const [theme, setTheme] = useState(getTheneFromLocalStorage);
  const handleTheme = () => {
    const { emerald, business } = themes;
    const newTheme = theme === emerald ? business : emerald;
    document.documentElement.setAttribute("data-theme", theme);
    setTheme(newTheme);
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <nav>
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* Title */}
          <NavLink
            to="/"
            className="hidden lg:flex text-3xl items-center font-mono w-20 h-20"
          >
            <img
              src={logo}
              key="dappmapp"
              alt="logo"
              className="h-full w-full"
            />
          </NavLink>
          {/* Dropdown */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {/* Theme Setup */}
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme} />
            {/** Theme Icon */}
            <BsSunFill className="swap-on h-4 w-4" />
            <BsMoonFill className="swap-off h-4 w-4" />
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
