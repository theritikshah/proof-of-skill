"use client";

import { createContext } from "react";
import Header from "./components/Header";
import "./globals.css";
import { useState } from "react";
import { User } from "./components/Sidebar";

export interface ProjectContextType {
  selectedUsers: User[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
  allSkills: string[];
  setAllSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

export const UserContext = createContext<ProjectContextType | null>(null);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [allSkills, setAllSkills] = useState<string[]>([]);
  return (
    <html lang="en">
      <body
        className=" space-y-6 pt-3  h-screen
      "
      >
        <UserContext.Provider
          value={{ selectedUsers, setSelectedUsers, allSkills, setAllSkills }}
        >
          <Header />
          {children}
        </UserContext.Provider>
      </body>
    </html>
  );
}
