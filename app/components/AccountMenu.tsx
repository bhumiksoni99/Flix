import React from "react";
import MobileMenuItem from "./MobileMenuItem";
import { signOut } from "next-auth/react";

interface AccountMenuProps {
  visible: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black min-w-36 bg-opacity-10 md:bg-opacity-40 flex flex-col absolute top-20 md:top-16 right-12 border-slate-500 border-2 items-center gap-2 py-2">
      <MobileMenuItem label="View Profile" />
      <MobileMenuItem
        label="Sign out of Netflix 👋"
        onClick={() => signOut({ redirect: true, callbackUrl: "/auth" })}
      />
    </div>
  );
};

export default AccountMenu;
