import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./_trpc/Provider";
import Link from "next/link";
import logo from "@/_assets/images/logo.png";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo List App",
  description: "A modern todo list application built with Next.js, tRPC, and Drizzle",
  title: "Todo List App",
  description: "A modern todo list application built with Next.js, tRPC, and Drizzle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <nav className="flex items-center justify-between p-4 text-white">
  <div className="flex items-center">
    <img src={logo.src} alt="Logo" className="h-10 w-10 mr-1" />
    <span className="text-xl font-bold text-black pt-1 pl-1">Ticked-Off</span>
  </div>
  <div className="flex space-x-4 text-black font-medium">
    <Link href="/" className="nav-link">
      {Array.from("Landing Page").map((letter, index) => (
        <span
          key={index}
          className="letter"
          style={{ '--i': index } as React.CSSProperties}>
          {letter}
        </span>
      ))}
    </Link>
    <Link href="/technologies" className="nav-link">
      {Array.from("Technologies").map((letter, index) => (
        <span
        key={index}
        className="letter"
        style={{ '--i': index } as React.CSSProperties}>
        {letter}
      </span>
      ))}
    </Link>
  </div>
</nav>
        <div className="mt-[-7rem]">
          <Provider>{children}</Provider>
        </div>
        <Provider>{children}</Provider>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}