import { useState } from "react";

export default function TabNavigation() {
  const [activeTab, setActiveTab] = useState("Compare View");

  return (
    <div className="flex items-center  rounded-md overflow-hidden w-full justify-between pr-12">
      {/* Tabs */}
      <div className="flex ">
        {["Compare View", "Individual View", "Shortlisted candidates"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border border-black ${
                activeTab === tab
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Navigation Arrows */}
      <div className="flex gap-2  border-gray-300">
        <button className="flex justify-center items-center w-10 h-10 p-2 hover:bg-gray-100 border border-black ">
          <span className="text-black">&#8592;</span>
        </button>
        <button className="flex justify-center items-center w-10 h-10 p-2 hover:bg-gray-100 border border-black ">
          <span className="text-black">&#8594;</span>
        </button>
      </div>
    </div>
  );
}
