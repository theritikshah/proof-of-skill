"use client";

import { UserContext } from "@/app/context/UserContext";
import React, { useContext, useEffect, useState } from "react";

type HeatMapData = {
  name: string;
  skills: { name: string; level: number }[];
};

const HeatMap = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext is null");
  }

  const { selectedUsers, allSkills } = userContext;

  const [usersMapData, setUsersMapData] = useState<HeatMapData[]>([]);

  useEffect(() => {
    if (selectedUsers.length > 0) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      fetch(`https://forinterview.onrender.com/people/${lastUser.id}`)
        .then((data) => data.json())
        .then((data) => {
          const skills = data.data.data.skillset
            .map((skillset: any) =>
              skillset.skills.map((skill: any) => ({
                name: skill.name,
                level: skill.pos[0].consensus_score,
              }))
            )
            .flat();
          const userData = {
            name: lastUser.name,
            skills,
          };
          setUsersMapData((prevData) => [...prevData, userData]);
        });
    }
  }, [selectedUsers]);

  const getCellColor = (level: number) => {
    const colors = [
      "bg-[#ECFFF1]",
      "bg-[#F8F8A7]",
      "bg-[#A6D96A]",
      "bg-[#1A9641] text-white",
      "bg-[#003F0B]",
    ];
    return colors[level] || colors[0];
  };

  return (
    <div className="flex flex-col py-6 overflow-x-auto">
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="sticky top-0 bg-gray-100 text-left p-2">Skills</th>
            {selectedUsers.map((user) => (
              <th
                key={user.id}
                className="sticky top-0 bg-gray-100 text-center p-2"
              >
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allSkills.map((skill) => (
            <tr key={skill}>
              <td className="p-2 border">{skill}</td>
              {usersMapData.map((user) => {
                const userSkill = user.skills.find((s) => s.name === skill);
                return (
                  <td
                    key={`${user.name}-${skill}`}
                    className={`p-2 border text-center ${getCellColor(
                      userSkill ? userSkill.level : 0
                    )}`}
                  >
                    {/* {userSkill ? userSkill.level : "-"} */}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HeatMap;
