// CustomCursor.js
"use client";

import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: '20px',
        height: '20px',
        backgroundColor: 'red', // Change this to your desired color or style
        borderRadius: '50%',
        pointerEvents: 'none', // Ensure it doesn't interfere with other elements
        transform: 'translate(-50%, -50%)', // Center the cursor
      }}
    />
  );
};

export default CustomCursor;