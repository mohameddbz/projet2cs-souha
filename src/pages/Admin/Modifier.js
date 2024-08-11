import React, { useState } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './Modifier.css';

function PublicationModal({ publication, onClose, onSave }) {
    const [subject, setSubject] = useState(publication.titre);
    const [status, setStatus] = useState(publication.etat);
    const [category, setCategory] = useState(publication.categorie);
    const [auteur, setAuteur] = useState(publication.publisher);
    const [description, setDescription] = useState(publication.description);
    const [type, setType] = useState(publication.type_publication);
    const [dateDebut, setDateDebut] = useState(publication.date_debut);
    const [dateFin, setDateFin] = useState(publication.date_fin);
    const [datePublication, setDatePublication] = useState(publication.date_publication);
    const [selectedFile, setSelectedFile] = useState(null);
     // Ajustez ici pour inclure l'URL de base si nécessaire
     const baseUrl = `${process.env.REACT_APP_API_URL}`;
     const [imagePreview, setImagePreview] = useState(baseUrl + publication.image); // Assurez-vous que l'URL est complète
    const [newImagePreview, setNewImagePreview] = useState(null); // URL pour la nouvelle image sélectionnée
   
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setNewImagePreview(URL.createObjectURL(file)); // Nouvelle image pour prévisualisation
        }
    };

    const handleIconClick = () => {
        document.getElementById('fileInput').click();
      };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('titre', subject);
        formData.append('etat', status);
        formData.append('description', description);
        formData.append('type_publication', type);
        formData.append('date_debut', dateDebut);
        formData.append('date_fin', dateFin);
        formData.append('categorie', category);
        formData.append('publisher', auteur);
        formData.append('date_publication', datePublication);
    // Ajoutez l'image seulement si un nouveau fichier a été sélectionné
    if (selectedFile) {
        formData.append('image', selectedFile);
    }
        
        
        const token = localStorage.getItem('token');
        console.log(publication);
        axios.put(`${process.env.REACT_APP_API_URL}/publication/${publication.id_publication}/`, formData, {
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
                <label className="ModifLabel">Type de publication*</label>
                <select className="ModifInput" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Sélectionner un type</option>
                    <option value="event">Événement</option>
                    <option value="actualité">Actualité</option>
                    <option value="article">Article</option>
                </select>
            </div>

            {type === 'event' && (
                <>
                    <div className="ModifInputContainer">
                        <label className="ModifLabel">Date de début*</label>
                        <input type="datetime-local" className="ModifInput" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
                    </div>
                    <div className="ModifInputContainer">
                        <label className="ModifLabel">Date de fin*</label>
                        <input type="datetime-local" className="ModifInput" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
                    </div>
                </>
            )}

            <div className="ModifInputContainer">
                <label className="ModifLabel">Sujet*</label>
                <input type="text" className="ModifInput" placeholder="Ecrire le sujet" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>

            <div className="ModifDescriptionContainer">
                <label className="ModifLabel">Description*</label>
                <textarea className="ModifTextarea" placeholder="Ecrire la description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="ModifInputContainer">
                <label className="ModifLabel">Deadline de validation*</label>
                <input type="datetime-local" className="ModifInput" value={datePublication} onChange={(e) => setDatePublication(e.target.value)} />
            </div>

            <div className="AdminFileContainer">
          <div className="AdminHighlight">Joindre des fichiers</div>
          <button className="file-upload-btn" onClick={handleIconClick}>
            <FaUpload style={{ marginRight: "8px" }} />
            Cliquez ici pour ajouter des fichiers
          </button>
          <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
          {selectedFile && (
            <div className="AdminFilePreview">
              <span>Fichier choisi: {selectedFile.name}</span>
              
            </div>
          )}
           <div className="image-preview-container">
               {imagePreview && (
                   <div className="image-preview">
                       <img src={imagePreview} alt="Current Image" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                   </div>
               )}
               {newImagePreview && (
                   <div className="image-preview">
                       <img src={newImagePreview} alt="New Image" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                   </div>
               )}
           </div>
        </div>

            <div className="button-modif-container">
                <button onClick={onClose} className="cancel-modif-button">Annuler</button>
                <button onClick={handleSubmit} className="submit-modif-button">Modifier</button>
            </div>
        </div>
    );
}

export default PublicationModal;
