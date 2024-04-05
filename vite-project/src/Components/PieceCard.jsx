import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function PieceCard({ piece }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg p-4 bg-white">
      <img src={piece.image} alt={piece.name} className="w-full h-48 object-cover mb-4" />
      
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-lg font-bold">{piece.name}</h5>
        <span>
          {piece.available ? (
            <FaCheckCircle className="text-green-500" />
          ) : (
            <FaTimesCircle className="text-red-500" />
          )}
        </span>
      </div>
      
      <div className="text-sm">
        <p className="text-gray-700 mb-2">Catégorie: {piece.category}</p>
        <p className="text-gray-500">Stock: {piece.stock}</p>
      </div>
      
      <button className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4" style={{ background:'#FFA500'}} >
        Voir plus
      </button>
    </div>
  );
}

export default PieceCard;
