import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PieceModal.css'; // Assurez-vous que le CSS pour le modal est bien inclus
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';

function PieceModal({ piece, onClose, onSave }) {
    const [nom, setNom] = useState(piece.nom || '');
    const [quantiteDisponible, setQuantiteDisponible] = useState(piece.quantite_disponible || 0);
    const [etat, setEtat] = useState(piece.etat || true);
    const [categorie, setCategorie] = useState(piece.categorie_id || '');
    const [description, setDescription] = useState(piece.description || '');
    const [selectedFile, setSelectedFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [currentPhoto, setCurrentPhoto] = useState(piece.photo || '');

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/categories/', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            setCategories(response.data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des catégories:', error);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!nom || !description || !categorie) {
            alert('Veuillez remplir tous les champs requis.');
            return;
        }

        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('quantite_disponible', quantiteDisponible);
        formData.append('etat', etat);
        formData.append('categorie_id', categorie);
        formData.append('description', description);
        if (selectedFile) {
            formData.append('photo', selectedFile);
        }

        onSave({ id_piece: piece.id_piece, ...formData });
    };

    const handleCancel = () => {
        onClose();
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleIconClick = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Modifier une Pièce</h2>
                    <button className="close-button" onClick={handleCancel}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Nom*</label>
                            <input
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Quantité Disponible*</label>
                            <input
                                type="number"
                                value={quantiteDisponible}
                                onChange={(e) => setQuantiteDisponible(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>État*</label>
                            <select
                                value={etat}
                                onChange={(e) => setEtat(e.target.value === 'true')}
                                required
                            >
                                <option value="true">Disponible</option>
                                <option value="false">Non disponible</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Catégorie*</label>
                            <select
                                value={categorie}
                                onChange={(e) => setCategorie(e.target.value)}
                                required
                            >
                                <option value="">Sélectionner une catégorie</option>
                                {categories.map(category => (
                                    <option key={category.id_category} value={category.id_category}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description*</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Joindre une photo</label>
                            <button type="button" className="file-upload-btn" onClick={handleIconClick}>
                                <FaUpload style={{ marginRight: '8px' }} />
                                Cliquez ici pour ajouter une photo
                            </button>
                            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
                            {selectedFile ? (
                                <div className="file-preview">
                                    <span>Fichier choisi: {selectedFile.name}</span>
                                </div>
                            ) : currentPhoto && (
                                <div className="file-preview">
                                    <img src={currentPhoto} alt="Photo actuelle" className="current-photo" />
                                    <span>Photo actuelle</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="cancel-button" onClick={handleCancel}>Annuler</button>
                        <button type="submit" className="submit-button">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

PieceModal.propTypes = {
    piece: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default PieceModal;