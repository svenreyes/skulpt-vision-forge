import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => (
  <div className="flex flex-col min-h-dvh">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default AppShell;
