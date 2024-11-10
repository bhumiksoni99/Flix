import React from "react";

interface MobileMenuProps {
  label: string;
  onClick?: () => void;
}

const MobileMenuItem: React.FC<MobileMenuProps> = ({ label, onClick }) => {
  return (
    <div
      className="hover:bg-gray-600 hover:bg-opacity-60 w-full hover:cursor-pointer"
      onClick={onClick}
    >
      <p className="text-white text-sm text-center p-2 px-4">{label}</p>
    </div>
  );
};

export default MobileMenuItem;
