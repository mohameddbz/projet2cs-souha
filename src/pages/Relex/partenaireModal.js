import React, { useState } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './Modifier.css';

function PartenaireModala({ partenaire, onClose, onSave }) {
    const [nom, setNom] = useState(partenaire.nom);
    const [email, setEmail] = useState(partenaire.email);
    const [contact, setContact] = useState(partenaire.contact);
    

    const handleSubmit = ()  => {
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('email', email);
        formData.append('description', partenaire.description);
        formData.append('contact', contact);
        console.log(formData)
        const token = localStorage.getItem('token');
        
        
        axios.put(`${process.env.REACT_APP_API_URL}/partenaire/${partenaire.id}/update/`, formData, {
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Publication updated successfully:', response.data);
            onSave(response.data); // Déclenchez le rafraîchissement avec les nouvelles données
            onClose(); // Fermez la modale après le succès
        })
        .catch(error => {
            console.error('Failed to update the publication:', error);
            alert('Failed to update the publication. Please try again.');
        });
        };

    return (
        <div className="popup-modifier">
            <h2>Modifier</h2>
           <button className="close-buttonn" onClick={onClose}><FaTimes /></button>

            <div className="ModifInputContainer">
                <label className="ModifLabel">Nom *</label>
                <input type="text" className="ModifInput" placeholder="Ecrire le nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>

            <div className="ModifDescriptionContainer">
                <label className="ModifLabel">Email *</label>
                <input type="text" className="ModifInput" placeholder="Ecrire l'email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="ModifInputContainer">
                <label className="ModifLabel">Contact *</label>
                <input type="number" className="ModifInput" value={contact} onChange={(e) => setContact(e.target.value)} />
            </div>

            <div className="button-modif-container">
                <button onClick={onClose} className="cancel-modif-button">Annuler</button>
                <button onClick={handleSubmit} className="submit-modif-button">Modifier</button>
            </div>
        </div>
    );
}

export default PartenaireModala;
