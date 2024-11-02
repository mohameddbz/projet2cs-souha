import React, { useState , useEffect } from 'react';    
import '../Admin/Publier.css';
import axios from 'axios';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';

function AddChapitre(props) {
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [duree, setDuree] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!titre || !contenu || !duree ) {
      alert('Veuillez entrer à la fois un titre et un contenu et une duree');
      return;
    }
  
    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('contenu', contenu);
    formData.append('duree', duree);
   
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/add_chapitre/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `token ${token}`
        }
      });
      alert('Chapitre ajoutée avec succès!');
      setTitre('');
      setContenu('');
      setDuree('');
    } catch (error) {
      console.error('Il y a eu une erreur!', error);
      alert('Erreur lors de l’envoi des données');
    }
  };
  
  const handleCancel = () => {
    setTitre('');
    setContenu('');
    setDuree('');
  };

  return (
    <div className='admin-page-container'>
      <div className='sidebar'>
        <SidebarRelex />
      </div>
      <div className="admin-container">
        <div className="AdminTitleContainer">
          <h1 className="AdminTitle">Ajouter chapitre</h1>
        </div>

        <div className="AdminInputContainer">
          <label className="AdminLabel">Titre *</label>
          <input
            type="text"
            className="AdminInput"
            placeholder="Ecrire le titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </div>
        <div className="AdminInputContainer">
          <label className="AdminLabel">Contenue *</label>
          <input
            type="text"
            className="AdminInput"
            placeholder="Ecrire le contenu"
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
          />
        </div>
        <div className="AdminInputContainer">
          <label className="AdminLabel">Duree *</label>
          <input
            type='number'
            className="AdminInput"
            value={duree}
            onChange={(e) => setDuree(e.target.value)}
          />
        </div>

        <div className="button-container">
          <button onClick={handleCancel} className="cancel-button">Annuler</button>
          <button onClick={handleSubmit} className="submit-button">Envoyer</button>
        </div>
      </div>
    </div>
  );
}


export default AddChapitre;