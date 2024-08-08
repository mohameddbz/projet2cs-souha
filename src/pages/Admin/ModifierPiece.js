import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PieceModal from './PieceModal'; // Assurez-vous que le chemin est correct

function ModifierPiece() {
  const { id } = useParams();
  const [piece, setPiece] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://127.0.0.1:8000/pieces/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setPiece(response.data);
    })
    .catch(error => {
      console.error('Il y a eu une erreur!', error);
    });
  }, [id]);

  const handleSave = (updatedPiece) => {
    const token = localStorage.getItem('token');
    axios.put(`http://127.0.0.1:8000/modifier_piece/${id}/`, updatedPiece, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      alert('Pièce modifiée avec succès!');
      setPiece(response.data);
      setShowModal(false);
    })
    .catch(error => {
      console.error('Erreur lors de la modification de la pièce!', error);
      alert('Erreur lors de la modification');
    });
  };

  return (
    <div className='admin-page-container'>
      <div className="admin-container">
        <div className="AdminTitleContainer">
          <h1 className="AdminTitle">Modifier une Pièce</h1>
        </div>

        <button onClick={() => setShowModal(true)} className="open-modal-button">Modifier Pièce</button>

        {showModal && (
          <PieceModal
            piece={piece}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
}

export default ModifierPiece;