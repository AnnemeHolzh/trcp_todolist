"use client";

import { useEffect, useState } from "react";
import FloatingTodo from "./FloatingTodo";

interface Todo {
  id: number;
  content: string;
  done: number;
}

interface FloatingTodosProps {
  todos: Todo[];
}

const FloatingTodos: React.FC<FloatingTodosProps> = ({ todos }) => {
  const [positions, setPositions] = useState<Array<{ x: number; y: number }>>([]);

  // Define a list of colors
  const colors = ['#FFBBED', '#FE6D1F', '#76B2D1', '#AEA432', '#FDB62A'];

  useEffect(() => {
    // Get the heights of the navbar and hero section
    const navBarHeight = 60; // Adjust this value based on your navbar height
    const heroSectionHeight = 200; // Adjust this value based on your hero section height

    // Calculate the available height for the orbs
    const availableHeight = window.innerHeight - navBarHeight - heroSectionHeight;

    // Generate random positions for each todo
    const newPositions = todos.map(() => ({
      x: Math.random() * (window.innerWidth / 2),
      y: Math.random() * availableHeight + navBarHeight, // Ensure orbs start below the navbar
    }));
    setPositions(newPositions);
  }, [todos]); // Update positions whenever todos change

  return (
    <div className="absolute top-0 left-0 w-full h-screen pointer-events-none">
      <div className="relative w-full h-[50vh] pointer-events-auto">
        {todos.map((todo, index) => {
          const position = positions[index]; // Get the position for the current todo
          const color = colors[todo.id % colors.length]; // Assign color based on todo ID
          return position ? ( // Check if position is defined
            <FloatingTodo
              key={todo.id}
              content={todo.content}
              position={position} // Pass the position
              color={color} // Pass the color
            />
          ) : null; // Render nothing if position is undefined
        })}
      </div>
    </div>
  );
};

export default FloatingTodos;