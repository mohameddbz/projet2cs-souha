import React, { useState } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './Modifier.css';

function Devis({demende,onClose, onSave }) {
    const [montant, setMontant] = useState('');

    const handleSubmit = ()  => {
        const formData = new FormData();
        formData.append('montant', montant);
        formData.append('demande_devis',demende.id)

        const token = localStorage.getItem('token');
        axios.post(`${process.env.REACT_APP_API_URL}/devis/add/`, formData, {
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            onSave(response.data); // Déclenchez le rafraîchissement avec les nouvelles données
            onClose(); // Fermez la modale après le succès
        })
        .catch(error => {
            console.error('Failed to repondre au demende:', error);
            alert('Failed to repondre au demende. Please try again.');
        });
        };

        const handleCancel = () => {
            setMontant('');
          };

    return (
        <div className="popup-modifier">
            <h2>Repondre au  demende</h2>
           <button className="close-buttonn" onClick={onClose}><FaTimes /></button>

            <div className="ModifInputContainer">
                <label className="ModifLabel">Montant *</label>
                <input type="number" className="ModifInput" placeholder="Ecrire le montant" value={montant} onChange={(e) => setMontant(e.target.value)} />
            </div>

            <div className="button-modif-container">
                <button onClick={handleCancel} className="cancel-modif-button">Annuler</button>
                <button onClick={handleSubmit} className="submit-modif-button">Ajouter</button>
            </div>
        </div>
    );
}

export default Devis;
