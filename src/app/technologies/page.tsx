"use client";

import { motion } from "framer-motion";
import React from 'react';

interface Technology {
  name: string;
  description: string;
  icon: string;
  textColor: string;
}

const technologies: Technology[] = [
  {
    name: "Next.js",
    description: "Powers the full-stack application with server-side rendering and API routes. Used for efficient page routing and optimal performance.",
    icon: "🚀",
    textColor: "text-[#76B2D1]"
  },
  {
    name: "React",
    description: "Manages UI components and state, particularly in the interactive todo list and floating animations.",
    icon: "⚛️",
    textColor: "text-[#AEA432]"
  },
  {
    name: "TypeScript",
    description: "Ensures type safety throughout the application, particularly in the tRPC integration and component props.",
    icon: "📘",
    textColor: "text-[#FE6D1F]"
  },
  {
    name: "tRPC",
    description: "Handles type-safe API communication between frontend and backend, managing todo operations with end-to-end type safety.",
    icon: "🔄",
    textColor: "text-[#AEA432]"
  },
  {
    name: "Framer Motion",
    description: "Creates smooth animations for todo items, floating orbs, and interactive UI elements throughout the application.",
    icon: "✨",
    textColor: "text-[#FFBBED]"
  },
  {
    name: "Tailwind CSS",
    description: "Styles the entire application with utility classes, providing responsive design and consistent theming.",
    icon: "🎨",
    textColor: "text-[#FDB62A]"
  },
  {
    name: "SQLite",
    description: "Stores and manages todo items in a lightweight, serverless database using Drizzle ORM for type-safe queries.",
    icon: "🗄️",
    textColor: "text-[#76B2D1]"
  },
  {
    name: "Drizzle ORM",
    description: "Provides a type-safe and efficient way to interact with the SQLite database, ensuring smooth data operations.",
    icon: "📊",
    textColor: "text-[#FE6D1F]"
  }
];

const Technologies = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-5xl font-bold text-center mb-16 text-black pt-20"
        >
          Technologies Powering This App
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className={`relative overflow-hidden rounded-2xl shadow-lg bg-gray-50 p-6 h-full`}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">{tech.icon}</span>
                <h2 className={`text-2xl font-bold mt-1 ${tech.textColor}`}>{tech.name}</h2>
              </div>
              <p className="text-lg text-black leading-relaxed">{tech.description}</p>
              
              {/* Decorative element */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Technologies;