"use client";

import React, { useEffect, useState } from "react";

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Your to-do list called.\nIt's crying.\nTime to end its whole career.";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowCursor(false);
        }, 10000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const lines = displayText.split('\n');
  const currentLineIndex = lines.length - 1;

  return (
    <h1 className="font-bold text-left transition-opacity duration-700 text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-relaxed">
      {lines.map((line, index) => (
        <div key={index} className="flex items-center">
          {line}
          {index === currentLineIndex && showCursor && (
            <span className="inline-block h-12 w-0.5 bg-black animate-blink ml-1" />
          )}
          {index !== lines.length - 1 && <br />}
        </div>
      ))}
    </h1>
  );
};

export default Hero;