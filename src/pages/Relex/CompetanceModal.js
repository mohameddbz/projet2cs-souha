import React, { useState } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './Modifier.css';

function FormateurModal({onClose, onSave }) {
    const [nom, setNom] = useState('');

    const handleSubmit = ()  => {
        const formData = new FormData();
        formData.append('nom', nom);

        const token = localStorage.getItem('token');
        axios.post(`${process.env.REACT_APP_API_URL}/competence/add/`, formData, {
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
            console.error('Failed to update the formateur:', error);
            alert('Failed to update the formateur. Please try again.');
        });
        };

        const handleCancel = () => {
            setNom('');
          };

    return (
        <div className="popup-modifier">
            <h2>Ajouter Competance</h2>
           <button className="close-buttonn" onClick={onClose}><FaTimes /></button>

            <div className="ModifInputContainer">
                <label className="ModifLabel">Nom *</label>
                <input type="text" className="ModifInput" placeholder="Ecrire le nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>

            <div className="button-modif-container">
                <button onClick={handleCancel} className="cancel-modif-button">Annuler</button>
                <button onClick={handleSubmit} className="submit-modif-button">Ajouter</button>
            </div>
        </div>
    );
}

export default FormateurModal;
