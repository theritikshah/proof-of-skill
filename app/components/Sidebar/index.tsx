"use client";

import { UserContext } from "@/app/layout";
import React, { useContext, useEffect, useState } from "react";

export interface User {
  name: string;
  address: string;
  email: string;
  id: string;
  phone: string;
  bio: string;
  [key: string]: string;
}

const Sidebar = () => {
  const [userData, setUserData] = useState<User[]>([]);

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext is null");
  }

  const { selectedUsers, setSelectedUsers, setAllSkills } = userContext;

  useEffect(() => {
    fetch("https://forinterview.onrender.com/people/")
      .then((data) => data.json())
      .then((usersData) => {
        setUserData(usersData);
      });
  }, []);

  useEffect(() => {
    if (userData && userData.length > 0) {
      fetch(`https://forinterview.onrender.com/people/${userData[0].id}`)
        .then((data) => data.json())
        .then((data) => {
          const skills = data.data.data.skillset
            .map((skillset: any) =>
              skillset.skills.map((skill: any) => skill.name)
            )
            .flat();
          setAllSkills(skills);
        });
    }
  }, [userData]);

  const handleSelectUser = (user: User) => {
    setSelectedUsers((preUsers) => {
      return [...preUsers, user];
    });
  };

  return (
    <aside className="flex flex-col gap-6 border border-black h-full  w-1/5 ">
      <div className="flex-1">
        <h2 className="p-4 border-b border-black text-center">
          Most recommended
        </h2>
        <div className="border-y h-fit">
          {userData.slice(0, 4).map((user) => (
            <UserCard
              key={user.id}
              name={user.name}
              onClick={() => handleSelectUser(user)}
            />
          ))}
        </div>
      </div>
      <div className="h-full border-y border-black overflow-scroll">
        {userData.slice(5).map((user) => (
          <UserCard
            key={user.id}
            name={user.name}
            onClick={() => handleSelectUser(user)}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

type UserCardProps = {
  name: string;
  onClick: VoidFunction;
};

function UserCard({ name, onClick }: UserCardProps) {
  return (
    <div className="flex items-center gap-3 p-4 border-b" onClick={onClick}>
      <img
        src="/assests/images/user/user_avatar.jpg"
        alt=""
        className="w-7 h-7 object-contain rounded-full"
      />
      <h4>{name}</h4>
      <button className="flex justify-center items-center rounded-full p-2 border aspect-square w-7 h-7 ml-auto text-gray-400 border-gray-400">
        +
      </button>
    </div>
  );
}
