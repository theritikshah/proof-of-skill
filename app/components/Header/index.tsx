"use client";

import { UserContext } from "@/app/context/UserContext";
import React, { useContext } from "react";

const Header = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext is null");
  }

  const { selectedUsers } = userContext;

  return (
    <header className="px-12 flex flex-col item-start space-y-4">
      <button className="text-gray-500 !bg-white  w-fit">
        {" "}
        ← Back to My Jobs
      </button>
      <div className="flex justify-between items-center">
        <h1 className="text-gray-500 text-2xl font-bold">
          Posk_UXdesigners_sr001
        </h1>
        <button className="p-0 text-gray-500 bg-transparent border-0">
          {Boolean(selectedUsers) ? selectedUsers.length : 0} Candidates
        </button>
      </div>
    </header>
  );
};

export default Header;
