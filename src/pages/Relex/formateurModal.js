import React, { useState } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './Modifier.css';

function FormateurModal({ formateur, onClose, onSave }) {
    const [nom, setNom] = useState(formateur.nom);
    const [email, setEmail] = useState(formateur.email);
    const [prenom, setPrenom] = useState(formateur.prenom);
    const [specialites , setSpecialites] = useState(formateur.specialites);
    

    const handleSubmit = ()  => {
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom',prenom);
        formData.append('email', email);
        formData.append('specialites', specialites);
        console.log(formData)
        const token = localStorage.getItem('token');
        axios.put(`${process.env.REACT_APP_API_URL}/formateur/update/${formateur.id}/`, formData, {
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Formateur updated successfully:', response.data);
            onSave(response.data); // Déclenchez le rafraîchissement avec les nouvelles données
            onClose(); // Fermez la modale après le succès
        })
        .catch(error => {
            console.error('Failed to update the formateur:', error);
            alert('Failed to update the formateur. Please try again.');
        });
        };

    return (
        <div className="popup-modifier">
            <h2>Modifier formateur</h2>
           <button className="close-buttonn" onClick={onClose}><FaTimes /></button>

            <div className="ModifInputContainer">
                <label className="ModifLabel">Nom *</label>
                <input type="text" className="ModifInput" placeholder="Ecrire le nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>

            <div className="ModifInputContainer">
                <label className="ModifLabel">Prenom *</label>
                <input type="text" className="ModifInput" placeholder="Ecrire le prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            </div>

            <div className="ModifDescriptionContainer">
                <label className="ModifLabel">Email *</label>
                <input type="text" className="ModifInput" placeholder="Ecrire l'email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="ModifInputContainer">
                <label className="ModifLabel">Specialites *</label>
                <input type="text" className="ModifInput" value={specialites} onChange={(e) => setSpecialites(e.target.value)} />
            </div>

            <div className="button-modif-container">
                <button onClick={onClose} className="cancel-modif-button">Annuler</button>
                <button onClick={handleSubmit} className="submit-modif-button">Modifier</button>
            </div>
        </div>
    );
}

export default FormateurModal;
