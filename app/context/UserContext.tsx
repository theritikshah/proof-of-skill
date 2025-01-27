"use client";

import { createContext, useState, ReactNode } from "react";
import { User } from "../components/Sidebar";

export interface ProjectContextType {
  selectedUsers: User[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
  allSkills: string[];
  setAllSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

export const UserContext = createContext<ProjectContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [allSkills, setAllSkills] = useState<string[]>([]);

  return (
    <UserContext.Provider
      value={{ selectedUsers, setSelectedUsers, allSkills, setAllSkills }}
    >
      {children}
    </UserContext.Provider>
  );
}
