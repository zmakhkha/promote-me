import React, { useState, useEffect } from "react";
import "../styles/Bubbles.css";

const Bubbles = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      const newBubble = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setBubbles((prevBubbles) => [...prevBubbles, newBubble]);

      setTimeout(() => {
        setBubbles((prevBubbles) => prevBubbles.filter((bubble) => bubble.id !== newBubble.id));
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
          style={{ left: bubble.x + "px", top: bubble.y + "px" }}
        />
      ))}
    </div>
  );
};

export default Bubbles;
