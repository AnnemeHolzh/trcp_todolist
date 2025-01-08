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
            <img src={logo.src} alt="Logo" className="h-10 w-10 mr-1" />
            <span className="text-xl font-bold text-black pt-1 pl-1">Ticked-Off</span>
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
      <footer className="flex items-center justify-center p-4 text-black">
        <p className="text-sm">Made with ❤️ by <a href="https://github.com/AnnemeHolzh" className="hover:underline">Anneme Holzhausen</a></p>
      </footer>
    </html>
  );
}