import React from 'react';
import './Pres.css';

const Node = ({ id, x, y, icon, size, color }) => {
  const style = {
    left: `${x}px`,
    top: `${y}px`,
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${size * 0.5}px`,  // Ajuster la taille de l'icône en fonction de la taille du nœud
    backgroundColor: color,       // Couleur dynamique basée sur la propriété color
  };

  return (
    <div className="node" style={style} data-id={id}>
      {icon}
    </div>
  );
};

export default Node;
