"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FloatingTodoProps {
  content: string;
  position: { x: number; y: number };
  color: string;
}

const FloatingTodo: React.FC<FloatingTodoProps> = ({ content, position, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute"
      initial={position}
      animate={{
        x: isHovered ? position.x : position.x + Math.random() * 50 - 25,
        y: isHovered ? position.y : position.y + Math.random() * 50 - 25,
        scale: isHovered ? 2 : 1,
      }}
      transition={{
        x: { duration: 3, repeat: Infinity, repeatType: "reverse" },
        y: { duration: 4, repeat: Infinity, repeatType: "reverse" },
        scale: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative">
        <motion.div
          className="w-8 h-8 rounded-full backdrop-blur-sm cursor-pointer floating-orb"
          whileHover={{ scale: 1.2 }}
          style={{
            backgroundColor: color,
            filter: "blur(4px)",
          }}
        />
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-white rounded-lg shadow-lg whitespace-nowrap"
          >
            {content}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FloatingTodo;