import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Publier.css';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import SidebarPub from '../../components/Sidebar/SidebarAdmin/SidebarStory';

function Admin2(props) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [type, setType] = useState('Success Story');
  const [datePublication, setDatePublication] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [categorie, setCategorie] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/`, {
        headers: { 'Authorization': `Token ${token}` }
      });
      setUserInfo(res.data);
      setCategorie(res.data.Categorie.nom);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!subject || !description) {
      alert('Veuillez entrer à la fois un sujet et une description.');
      return;
    }

    const formData = new FormData();
    formData.append('titre', subject);
    formData.append('description', description);
    formData.append('etat', 'en attente');
    formData.append('image', selectedFile);
    formData.append('type_publication', type);
    formData.append('date_publication', datePublication);

    const token = localStorage.getItem('token');

    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/publication/add/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `token ${token}`
        }
      });
      console.log('Réponse du serveur:', response.data);
      alert('Publication ajoutée avec succès!');
      handleCancel(); // Reset form after submission
    } catch (error) {
      console.error('Il y a eu une erreur!', error);
      alert('Erreur lors de l’envoi des données');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSubject('');
    setDescription('');
    setSelectedFile(null);
    setType('Success Story');
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
            <option value="Success Story">Success Story</option>
          </select>
        </div>

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
          <button onClick={handleCancel} className="cancel-button" disabled={loading}>Annuler</button>
          <button onClick={handleSubmit} className="submit-button" disabled={loading}>
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </div>
  );
}

Admin2.propTypes = {
  className: PropTypes.string,
};

export default Admin2;