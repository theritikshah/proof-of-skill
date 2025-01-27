import { UserContext } from "@/app/layout";
import React, { useContext } from "react";

const HeatMap = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext is null");
  }

  const { selectedUsers, allSkills } = userContext;

  return (
    <div className="flex py-6">
      <div>
        <div></div>
        {allSkills.map((skill) => {
          return <div>{skill}</div>;
        })}
      </div>
      <div>
        <div className="flex gap-2">
          {selectedUsers.map((user) => {
            return (
              <div key={user.id}>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
