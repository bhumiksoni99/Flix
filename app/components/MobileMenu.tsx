import React from "react";
import MobileMenuItem from "./MobileMenuItem";

interface MobileMenuProps {
  visible: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black min-w-36 bg-opacity-10 md:bg-opacity-40 flex flex-col absolute top-20 md:top-14 left-28 border-slate-500 border-2 items-center gap-2 py-2">
      <MobileMenuItem label={"Home"} />
      <MobileMenuItem label="Tv Shows" />
      <MobileMenuItem label="Movies" />
      <MobileMenuItem label="My List" />
      <MobileMenuItem label="Browse by Languages" />
    </div>
  );
};

export default MobileMenu;
