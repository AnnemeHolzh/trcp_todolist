import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./_trpc/Provider";
import Link from "next/link";
import logo from "@/_assets/images/logo.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ticked Off",
  description: "Your to-do list called. It’s crying. Time to end its whole career.",
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
            <img src={logo.src} alt="Logo" className="h-12 w-12 mr-2" />
            <span className="text-xl font-bold text-black">Ticked Off</span>
          </div>
          <div className="flex space-x-4 text-black font-medium">
            <Link href="/" className="hover:underline">
              Landing Page
            </Link>
            <Link href="/technologies" className="hover:underline">
              Technologies
            </Link>
          </div>
        </nav>
        <div className="mt-[-7rem]">
          <Provider>{children}</Provider>
        </div>
      </body>
    </html>
  );
}