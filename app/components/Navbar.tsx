"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";
import AccountMenu from "./AccountMenu";
import MobileMenu from "./MobileMenu";
import NavItem from "./Navitem";

const TOP_OFFSET = 66;

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [showNavBg, setShowNavBg] = useState(false);
  const toggleBrowseSection = useCallback(() => {
    setVisible((current) => !current);
  }, []);

  const toggleProfile = useCallback(() => {
    setProfileVisible((current) => !current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowNavBg(true);
      } else {
        setShowNavBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed z-10 top-0 min-h-100 w-screen flex flex-row flex-1 bg-black bg-opacity-0 px-10 py-4 justify-between ${
        showNavBg ? `bg-black-800 bg-opacity-80` : ``
      }`}
    >
      <div className="hidden lg:flex flex-row items-center gap-4">
        <img src="/images/logo.png" className="h-4 mr-4" />
        <NavItem label="Home" />
        <NavItem label="Tv shows" />
        <NavItem label="Movies" />
        <NavItem label="New & Popular" />
        <NavItem label="My List" />
        <NavItem label="Browse by languages" />
      </div>
      <div className="flex items-center lg:hidden flex-row">
        <img src="/images/logo.png" className="h-4 mr-4" />
        <div
          onClick={toggleBrowseSection}
          className="flex flex-row items-center gap-1 cursor-pointer"
        >
          <p className="text-white text-sm">Browse</p>
          <FaCaretDown
            className={`text-white duration-200 ${
              visible ? `rotate-180` : `rotate-0`
            }`}
            size={20}
          />
        </div>
        <MobileMenu visible={visible} />
      </div>
      <div className="flex flex-row items-center gap-4">
        <CiSearch className="text-white" size={24} />
        <CiBellOn className="text-white" size={24} />
        <div
          className="flex flex-row items-center gap-1 cursor-pointer"
          onClick={toggleProfile}
        >
          <img src="images/default-green.png" className="h-8" />
          <FaCaretDown
            className={`text-white duration-200 ${
              profileVisible ? `rotate-180` : `rotate-0`
            }`}
            size={20}
          />
        </div>
        <AccountMenu visible={profileVisible} />
      </div>
    </div>
  );
}
