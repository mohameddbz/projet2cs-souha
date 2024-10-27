import React, { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import '../Admin/Publier.css';
import axios from 'axios';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';

function AjouterPartenaire(props) {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState(null);
  const [email, setEmail] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [categorie, setCategorie] = useState('');


  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/`, {
        headers: { 'Authorization': `token ${token}` }
      });
      setUserInfo(res.data);
      setCategorie(res.data.Categorie.nom);
    } catch (error) {
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!nom || !description || !email || !contact) {
      alert('Veuillez entrer à la fois un sujet et une description et un email et contact');
      return;
    }
  
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('email', email);
    formData.append('contact', contact);
   
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/partenaire/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `token ${token}`
        }
      });
      console.log('Réponse du serveur:', response.data);
      alert('Partenaire ajoutée avec succès!');
      setNom('');
      setDescription('');
      setEmail(null);
      setContact('');
    } catch (error) {
      console.error('Il y a eu une erreur!', error);
      alert('Erreur lors de l’envoi des données');
    }
  };
  
  const handleCancel = () => {
    setNom('');
      setDescription('');
      setEmail(null);
      setContact('');
  };

  return (
    <div className='admin-page-container'>
      <div className='sidebar'>
        <SidebarRelex />
      </div>
      <div className="admin-container">
        <div className="AdminTitleContainer">
          <h1 className="AdminTitle">Ajouter</h1>
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

        <div className="AdminDescriptionContainer">
          <label className="AdminLabel">Description *</label>
          <textarea
            className="AdminTextarea"
            placeholder="Ecrire la description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
        <div className="AdminInputContainer">
          <label className="AdminLabel">Contact *</label>
          <input
            type="tel"
            className="AdminInput"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            pattern="[0-9]{10}"
            placeholder="Enter 10-digit phone number"
            required
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


export default AjouterPartenaire;