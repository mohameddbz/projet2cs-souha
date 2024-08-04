import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AjouterPiece.css';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import SidebarFablab from '../../components/Sidebar/SidebarAdmin/SidebarFablab';

function AjouterPiece(props) {
  const [nom, setNom] = useState('');
  const [quantiteDisponible, setQuantiteDisponible] = useState(0);
  const [etat, setEtat] = useState(true);
  const [categorie, setCategorie] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:8000/categories/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
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
    formData.append('photo', selectedFile);

    const token = localStorage.getItem('token');

    axios.post('http://127.0.0.1:8000/ajouter_piece/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `token ${token}`
      }
    })
    .then(response => {
      console.log('Réponse du serveur:', response.data);
      alert('Pièce ajoutée avec succès!');
      setNom('');
      setQuantiteDisponible(0);
      setEtat(true);
      setCategorie('');
      setDescription('');
      setSelectedFile(null);
    })
    .catch(error => {
      console.error('Il y a eu une erreur!', error);
      alert('Erreur lors de l’envoi des données');
    });
  };

  const handleCancel = () => {
    setNom('');
    setQuantiteDisponible(0);
    setEtat(true);
    setCategorie('');
    setDescription('');
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleIconClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className='admin-page-container'>
      <div className='sidebar'>
        <SidebarFablab />
      </div>
      <div className="admin-container">
        <div className="AdminTitleContainer">
          <h1 className="AdminTitle">Ajouter une Pièce</h1>
        </div>

        <div className="AdminInputContainer">
          <label className="AdminLabel">Nom*</label>
          <input
            type="text"
            className="AdminInput"
            placeholder="Nom de la pièce"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        <div className="AdminInputContainer">
          <label className="AdminLabel">Quantité Disponible*</label>
          <input
            type="number"
            className="AdminInput"
            placeholder="Quantité Disponible"
            value={quantiteDisponible}
            onChange={(e) => setQuantiteDisponible(e.target.value)}
            required
          />
        </div>

        <div className="AdminInputContainer">
          <label className="AdminLabel">État*</label>
          <select
            className="AdminInput"
            value={etat}
            onChange={(e) => setEtat(e.target.value === 'true')}
          >
            <option value="true">Disponible</option>
            <option value="false">Non disponible</option>
          </select>
        </div>

        <div className="AdminInputContainer">
          <label className="AdminLabel">Catégorie*</label>
          <select
            className="AdminInput"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map(category => (
              <option key={category.id_category} value={category.id_category}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="AdminDescriptionContainer">
          <label className="AdminLabel">Description*</label>
          <textarea
            className="AdminTextarea"
            placeholder="Description de la pièce"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="AdminFileContainer">
          <div className="AdminHighlight">Joindre une photo</div>
          <button className="file-upload-btn" onClick={handleIconClick}>
            <FaUpload style={{ marginRight: "8px" }} />
            Cliquez ici pour ajouter une photo
          </button>
          <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
          {selectedFile && (
            <div className="AdminFilePreview">
              <span>Fichier choisi: {selectedFile.name}</span>
            </div>
          )}
        </div>

        <div className="button-container">
          <button onClick={handleCancel} className="cancel-button">Annuler</button>
          <button onClick={handleSubmit} className="submit-button">Envoyer</button>
        </div>
      </div>
    </div>
  );
}

AjouterPiece.propTypes = {
  className: PropTypes.string,
};

export default AjouterPiece;
