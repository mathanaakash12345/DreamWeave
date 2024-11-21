import React, { useState, useEffect, useRef } from 'react';

const CursorTrail = ({ handleClearTrail }) => {
  const [trailPoints, setTrailPoints] = useState([]);
  const trailRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (trailPoints.length > 10) { // Limit trail points for performance
        setTrailPoints(trailPoints.slice(1));
      }
      setTrailPoints([...trailPoints, { x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleClearTrail();
    }, 4000); // Clear trail after 4 seconds

    return () => clearTimeout(timeoutId);
  }, [trailPoints]);

  const drawTrail = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(trailPoints[0].x, trailPoints[0].y);
    for (let i = 1; i < trailPoints.length; i++) {
      ctx.lineTo(trailPoints[i].x, trailPoints[i].y);
    }
    ctx.strokeStyle = 'white'; // Adjust color as needed
    ctx.lineWidth = 2; // Adjust width as needed
    ctx.stroke();
  };

  return (
    <div className="cursor-trail-container">
      <canvas ref={trailRef} className="cursor-trail"></canvas>
    </div>
  );
};

export default CursorTrail;