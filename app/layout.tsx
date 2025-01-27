"use client";

import Header from "./components/Header";
import "./globals.css";
import { UserProvider } from "./context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=" space-y-6 pt-3  h-screen
      "
      >
        <UserProvider>
          <Header />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
