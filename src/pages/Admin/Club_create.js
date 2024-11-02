import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Publier.css';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import SidebarPub from '../../components/Sidebar/SidebarAdmin/SidebarPub';

function ClubEvent(props) {
  const [titre, setTitre] = useState('');
  const [link, setLink] = useState('');
  const [selectedClub, setSelectedClub] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [dateArchivage, setDateArchivage] = useState('');
  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errors, setErrors] = useState({}); // Error state

  useEffect(() => {
    getClubs();
  }, []);


  const getClubs = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/clubs/`);
      setClubs(res.data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!titre) newErrors.titre = 'Veuillez entrer un sujet.';
    if (!description) newErrors.description = 'Veuillez entrer une description.';
    if (!selectedClub) newErrors.club = 'Veuillez entrer un club.';
    if (!link) newErrors.link = 'Veuillez entrer un link.';
    if (!dateArchivage) newErrors.dateArchivage = 'Veuillez entrer une date Archivage.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const selectedClubData = clubs.find(club => club.nom === "CSE");
    const selectedClubId = selectedClubData ? selectedClubData.id_club : null;

    const data = {
        titre,
        description,
        link,
        date_archivage: dateArchivage,
        club: selectedClubId,  
        image: selectedFile  
      };
      console.log(data)
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/events/create/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `token ${token}`
        }
      });
      console.log('Réponse du serveur:', response.data);
      alert('Publication ajoutée avec succès!');
      handleCancel();
    } catch (error) {
      console.error('Il y a eu une erreur!', error);
      alert('Erreur lors de l’envoi des données');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTitre('');
    setDescription('');
    setSelectedFile(null);
    setSelectedClub('');
    setDateArchivage('');
    setLink('')
    setErrors({});
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Add file validation here if needed (e.g., file type or size check)
    setSelectedFile(file);
  };

  const handleIconClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleClubChange = (event) => {
    setSelectedClub(event.target.value);  
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
          <label className="AdminLabel">Titre *</label>
          <input
            type="text"
            className={`AdminInput ${errors.titre ? 'error' : ''}`}
            placeholder="Ecrire le sujet"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
          {errors.titre && <span className="error-message">{errors.titre}</span>}
        </div>


        <div className="AdminInputContainer">
          <label className="AdminLabel">Link *</label>
          <input
            type="text"
            className={`AdminInput ${errors.link ? 'error' : ''}`}
            placeholder="Ecrire le sujet"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          {errors.link && <span className="error-message">{errors.link}</span>}
        </div>

        <div>
            <label className='AdminLabel'>Club * </label>
            <select
                className='AdminInput'
                value={selectedClub}  // Bind the state to the select input
                onChange={handleClubChange}  // Handle changes
            >
                <option value="" disabled>Select a club</option>  {/* Placeholder option */}
                {clubs.map((option) => (
                <option key={option.id} value={option.id}>  {/* Use the club's ID as the value */}
                    {option.nom}
                </option>
                ))}
            </select>
        </div>

        <div className="AdminDescriptionContainer">
          <label className="AdminLabel">Description*</label>
          <textarea
            className={`AdminTextarea ${errors.description ? 'error' : ''}`}
            placeholder="Ecrire la description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="AdminInputContainer">
          <label className="AdminLabel">Date d'Archivage *</label>
          <input
            type="datetime-local"
            className={`AdminInput ${errors.dateArchivage ? 'error' : ''}`}
            value={dateArchivage}
            onChange={(e) => setDateArchivage(e.target.value)}
          />
          {errors.dateArchivage && <span className="error-message">{errors.dateArchivage}</span>}
        </div>

        <div className="AdminFileContainer">
          <div className="AdminHighlight">Joindre des fichiers</div>
          <button className="file-upload-btn" onClick={handleIconClick} disabled={isLoading}>
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
          <button onClick={handleCancel} className="cancel-button" disabled={isLoading}>Annuler</button>
          <button onClick={handleSubmit} className="submit-button" disabled={isLoading}>
            {isLoading ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </div>
  );
}

ClubEvent.propTypes = {
  className: PropTypes.string,
};

export default ClubEvent;
