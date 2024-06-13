import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Publier.css';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import SidebarPub from '../../components/Sidebar/SidebarAdmin/SidebarPub';

function Admin2(props) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [type, setType] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [datePublication, setDatePublication] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (!subject || !description) {
      alert('Veuillez entrer à la fois un sujet et une description.');
      return;
    }
  
    if (new Date(dateFin) < new Date(dateDebut)) {
      alert(`La date de fin (${dateFin}) ne peut pas être antérieure à la date de début (${dateDebut}).`);
      return;
    }
  
    if (new Date(datePublication) >= new Date(dateDebut)) {
      alert(`La date de validation (${datePublication}) doit être avant la date de début (${dateDebut}).`);
      return;
    }
  
    const formData = new FormData();
    formData.append('titre', subject);
    formData.append('description', description);
    formData.append('etat', 'en attente');
    formData.append('image', selectedFile);
    formData.append('type_publication', type);
    formData.append('date_debut', dateDebut);
    formData.append('date_fin', dateFin);
    formData.append('date_publication', datePublication);
    formData.append('categorie', 1);
    formData.append('publisher', 2);
  
    const token = localStorage.getItem('token');
  
    axios.post('http://127.0.0.1:8000/publication/add/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `token ${token}`
      }
    })
    .then(response => {
      console.log('Réponse du serveur:', response.data);
      alert('Publication ajoutée avec succès!');
      setSubject('');
      setDescription('');
      setSelectedFile(null);
      setType('');
      setDateDebut('');
      setDateFin('');
      setDatePublication('');
    })
    .catch(error => {
      console.error('Il y a eu une erreur!', error);
      alert('Erreur lors de l’envoi des données');
    });
  };
  
  const handleCancel = () => {
    setSubject('');
    setDescription('');
    setSelectedFile(null);
    setType('');
    setDateDebut('');
    setDateFin('');
    setDatePublication('');
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
        <SidebarPub />
      </div>
      <div className="admin-container">
        <div className="AdminTitleContainer">
          <h1 className="AdminTitle">Publier</h1>
        </div>

        <div className="AdminInputContainer">
          <label className="AdminLabel">Type de publication*</label>
          <select
            className="AdminInput"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Sélectionner un type</option>
            <option value="event">Événement</option>
            <option value="actualité">Actualité</option>
            <option value="article">Article</option>
          </select>
        </div>

        {type === 'event' && (
          <>
            <div className="AdminInputContainer">
              <label className="AdminLabel">Date de début*</label>
              <input
                type="datetime-local"
                className="AdminInput"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
              />
            </div>
            <div className="AdminInputContainer">
              <label className="AdminLabel">Date de fin*</label>
              <input
                type="datetime-local"
                className="AdminInput"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="AdminInputContainer">
          <label className="AdminLabel">Sujet*</label>
          <input
            type="text"
            className="AdminInput"
            placeholder="Ecrire le sujet"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="AdminDescriptionContainer">
          <label className="AdminLabel">Description*</label>
          <textarea
            className="AdminTextarea"
            placeholder="Ecrire la description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="AdminInputContainer">
              <label className="AdminLabel">Deadline de validation*</label>
              <input
                type="datetime-local"
                className="AdminInput"
                value={datePublication}
                onChange={(e) => setDatePublication(e.target.value)}
              />
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
        </div>

        <div className="button-container">
          <button onClick={handleCancel} className="cancel-button">Annuler</button>
          <button onClick={handleSubmit} className="submit-button">Envoyer</button>
        </div>
      </div>
    </div>
  );
}

Admin2.propTypes = {
  className: PropTypes.string,
};

export default Admin2;
