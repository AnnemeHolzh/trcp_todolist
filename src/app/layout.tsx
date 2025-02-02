import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./_trpc/Provider";
import Link from "next/link";
import logo from "@/_assets/images/logo.png";
import React from "react";
import blackEyes from "@/_assets/images/eyes_black.ico";
import whiteEyes from "@/_assets/images/eyes_white.ico";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ticked-Off",
  description: "A modern todo list application built with Next.js, tRPC, and Drizzle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={blackEyes.src} />
      </head>
      <body className={inter.className}>
      <nav className="flex items-center justify-between p-4 text-white">
  <div className="flex items-center">
    <img src={logo.src} alt="Logo" className="h-10 w-10 mr-1" />
    <span className="text-xl font-bold text-black pt-1 pl-1">Ticked-Off</span>
  </div>
  <div className="flex space-x-4 text-black font-medium">
    <Link href="/" className="nav-link">
      {Array.from("Todo List").map((letter, index) => (
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
        <footer className="flex items-center justify-center p-4 text-black">
          <p className="text-sm">Made with ❤️ by <a href="https://github.com/AnnemeHolzh" className="hover:underline">Anneme Holzhausen</a></p>
        </footer>
      </body>
    </html>
  );
}