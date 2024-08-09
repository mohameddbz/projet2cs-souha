import React, { useEffect, useState } from 'react';
import './Pres.css';

const Node = ({ id, relativeX, relativeY, initialSize, color, icon }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const updateStyle = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * initialSize / 1000; // Ajuster le facteur de redimensionnement
      setStyle({
        left: `${relativeX * 100}vw`,
        top: `${relativeY * 100}vh`,
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size * 0.5}px`,
        backgroundColor: color
      });
    };

    updateStyle();
    window.addEventListener('resize', updateStyle);
    return () => window.removeEventListener('resize', updateStyle);
  }, [relativeX, relativeY, initialSize, color]);

  return (
    <div className="node" style={style} data-id={id}>
      {icon}
    </div>
  );
};

export default Node;
