import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './PieceCard.css'

function PieceCard({ piece }) {
  return (
    <div className="piece-card">
      <img src={piece.image} alt={piece.name} className="piece-image" />
      
      <div className="piece-header">
        <h5>{piece.name}</h5>
        <span>
          {piece.available ? (
            <FaCheckCircle className="piece-icon" />
          ) : (
            <FaTimesCircle className="piece-icon unavailable" />
          )}
        </span>
      </div>
      
      <div className="piece-details">
        <p>Catégorie: {piece.category}</p>
        <p className="piece-stock">Stock: {piece.stock}</p>
      </div>
      
      <button className="piece-button">
        Voir plus
      </button>
    </div>
  );
}

export default PieceCard;
