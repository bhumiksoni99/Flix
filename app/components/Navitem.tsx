import React from "react";

interface NavItemProps {
  label: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, onClick }) => {
  return (
    <p className="text-white text-sm" onClick={onClick}>
      {label}
    </p>
  );
};

export default NavItem;
