import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SidebarAdm from '../../components/Sidebar/SidebarAdmin/SidebarAdm';
import './Publier.css';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';



function Admin2(props) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (event) => {
  
    event.preventDefault();
  
    if (!subject || !description) {
      alert('Veuillez entrer à la fois un sujet et une description.');
      return;
    }
    const formData = new FormData();
  formData.append('titre', subject);
  formData.append('description', description);
  formData.append('etat', 'non valide'); // ajoutez d'autres valeurs fixes comme nécessaire
  formData.append('image', selectedFile); // assurez-vous que 'image' est le bon nom de champ attendu par votre API
  formData.append('type_publication', 'event'); // exemple de valeur fixe
  formData.append('date_debut', '2024-07-15T09:00:00Z');
  formData.append('date_fin', '2024-07-15T17:00:00Z');
  formData.append('date_publication', '2024-06-10T08:00:00Z');
  formData.append('categorie', 1); // exemple d'ID de catégorie
  formData.append('publisher', 1); // exemple d'ID de l'éditeur
  const s = localStorage.getItem('token'); // Assurez-vous que le token est bien géré
  console.log(localStorage.getItem('token'));


  axios.post('http://127.0.0.1:8000/publication/add/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `token ${s}` // Assurez-vous d'utiliser le bon préfixe
    }
  })
  .then(response => {
    console.log('Réponse du serveur:', response.data);
    alert('Publication ajoutée avec succès!');
    setSubject('');
    setDescription('');
    setSelectedFile(null);
  })
  .catch(error => {
    console.error('Il y a eu une erreur!', error);
    alert('Erreur lors de l’envoi des données');
  });
};
    // console.log('Subject:', subject);
    // console.log('Description:', description);
    // setSubject('');
    // setDescription('');

  const handleCancel = () => {
    setSubject('');
    setDescription('');
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
      <SidebarAdm />
    </div>
    <div className="admin-container">
      <div className="AdminTitleContainer">
        <div className="AdminIconCircle">
        <svg className="AdminImage1" xmlns="http://www.w3.org/2000/svg" width="0.5em" height="0.5em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M17 19.22H5V7h7V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2z"></path>
          <path fill="currentColor" d="M19 2h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V7h3V5h-3zM7 9h8v2H7zm0 3v2h8v-2h-3zm0 3h8v2H7z"></path>
        </svg>
        </div>
        <h1 className="AdminTitle">Publier</h1>
      </div>

      <div className="AdminInputContainer">
          <label className="AdminLabel">Sujet*</label>
          <input
            type="text"
            className="AdminInput"
            placeholder="Ecrire le sujet"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
        </div>

        <div className="AdminDescriptionContainer">
          <label className="AdminLabel">Description*</label>
          <textarea
            className="AdminTextarea"
            placeholder="Ecrire la description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
