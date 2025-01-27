"use client";

import Sidebar from "./components/Sidebar";
import { useContext } from "react";
import { UserContext } from "./layout";
import TabNavigation from "./components/Toolbar";
import HeatMap from "./components/HeatMap";

export default function Home() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext is null");
  }

  // const { selectedUsers, setSelectedUsers } = userContext;

  return (
    <div
      className="flex gap-12 h-full"
      style={{
        height: "calc(100% - 4rem)",
      }}
    >
      <Sidebar />
      <main className="flex-1">
        <TabNavigation />
        <HeatMap />
      </main>
    </div>
  );
}
