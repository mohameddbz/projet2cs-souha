import React, { useState } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './Modifier.css';

function ChapitreModal({ chapitre, onClose, onSave }) {
    const [titre, setTitre] = useState(chapitre.titre);
    const [contenu, setContenu] = useState(chapitre.contenu);
    const [duree, setDuree] = useState(chapitre.duree);

    

    const handleSubmit = ()  => {
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('contenu',contenu);
        formData.append('duree', duree);
        const token = localStorage.getItem('token');
        axios.put(`${process.env.REACT_APP_API_URL}/chapitre/update/${chapitre.id}/`, formData, {
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
            console.error('Failed to update the chapitre :', error);
            alert('Failed to update the chapitre. Please try again.');
        });
        };

    return (
        <div className="popup-modifier">
            <h2>Modifier chapitre</h2>
           <button className="close-buttonn" onClick={onClose}><FaTimes /></button>

            <div className="ModifInputContainer">
                <label className="ModifLabel">Titre *</label>
                <input type="text" className="ModifInput" placeholder="Ecrire le titre" value={titre} onChange={(e) => setTitre(e.target.value)} />
            </div>

            <div className="ModifInputContainer">
                <label className="ModifLabel">Contenu *</label>
                <input type="text" className="ModifInput" placeholder="Ecrire le contenu" value={contenu} onChange={(e) => setContenu(e.target.value)} />
            </div>

            <div className="ModifDescriptionContainer">
                <label className="ModifLabel">Duree *</label>
                <input type="number" className="ModifInput" placeholder="Ecrire duree" value={duree} onChange={(e) => setDuree(e.target.value)} />
            </div>

            <div className="button-modif-container">
                <button onClick={onClose} className="cancel-modif-button">Annuler</button>
                <button onClick={handleSubmit} className="submit-modif-button">Modifier</button>
            </div>
        </div>
    );
}

export default ChapitreModal;
