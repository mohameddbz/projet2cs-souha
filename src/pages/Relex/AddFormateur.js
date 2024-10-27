import React, { useState , useEffect } from 'react';    
import '../Admin/Publier.css';
import axios from 'axios';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';

function AddFormateur(props) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [specialites, setSpecialites] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!nom || !prenom || !email || !specialites) {
      alert('Veuillez entrer à la fois un sujet et une description et un email et contact');
      return;
    }
  
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('email', email);
    formData.append('specialites', specialites);
   
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/formateur/add/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `token ${token}`
        }
      });
      alert('Formateur ajoutée avec succès!');
      setNom('');
      setPrenom('');
      setEmail('');
      setSpecialites('');
    } catch (error) {
      console.error('Il y a eu une erreur!', error);
      alert('Erreur lors de l’envoi des données');
    }
  };
  
  const handleCancel = () => {
    setNom('');
    setPrenom('');
    setEmail('');
    setSpecialites('');
  };

  return (
    <div className='admin-page-container'>
      <div className='sidebar'>
        <SidebarRelex />
      </div>
      <div className="admin-container">
        <div className="AdminTitleContainer">
          <h1 className="AdminTitle">Ajouter Formateur</h1>
        </div>

        <div className="AdminInputContainer">
          <label className="AdminLabel">Nom *</label>
          <input
            type="text"
            className="AdminInput"
            placeholder="Ecrire le nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className="AdminInputContainer">
          <label className="AdminLabel">Prenom *</label>
          <input
            type="text"
            className="AdminInput"
            placeholder="Ecrire le prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </div>
        <div className="AdminInputContainer">
          <label className="AdminLabel">Email *</label>
          <input
            type="email"
            className="AdminInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="AdminDescriptionContainer">
          <label className="AdminLabel">Specialites *</label>
          <textarea
            className="AdminTextarea"
            placeholder="Ecrire les specialitites"
            value={specialites}
            onChange={(e) => setSpecialites(e.target.value)}
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


export default AddFormateur;