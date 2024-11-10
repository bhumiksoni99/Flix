import React from "react";

interface NavItemProps {
  label: string;
  onClick?: () => {};
}

const NavItem: React.FC<NavItemProps> = ({ label, onClick }) => {
  return <p className="text-white text-sm">{label}</p>;
};

export default NavItem;
