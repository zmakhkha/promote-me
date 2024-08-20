import React, { useState, useEffect } from "react";
import "../styles/Bubbles.css";

// Define the type for a bubble
interface Bubble {
  id: number;
  x: number;
  y: number;
}

const Bubbles = () => {
  // Set the state with an explicit type
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newBubble: Bubble = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };

      setBubbles((prevBubbles) => [...prevBubbles, newBubble]);

      setTimeout(() => {
        setBubbles((prevBubbles) =>
          prevBubbles.filter((bubble) => bubble.id !== newBubble.id)
        );
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="bubbles-container">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{ left: `${bubble.x}px`, top: `${bubble.y}px` }}
        />
      ))}
    </div>
  );
};

export default Bubbles;
