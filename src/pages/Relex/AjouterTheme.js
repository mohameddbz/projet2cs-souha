import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';
import CompetanceModal from './CompetanceModal';
import '../Admin/Publier.css';

function AjouterTheme(props) {
  const [titre, setTitre] = useState('');
  const [cours, setCours] = useState([]); // Updated to array
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchCours();
  }, []);
  
  const fetchCours = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/cours/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setOptions(response.data);
    } catch (error) {
      console.error('Error fetching cours:', error);
    }
  };


  const handleCourChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    const selectedObjects = selectedValues.map(value => options.find(option => option.titre === value));
    const selectedIds = selectedObjects.map(obj => obj.id);
    setCours(selectedIds);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!titre || !cours) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const formationData = {
      titre: titre,
      cours: cours
    };

    console.log(formationData);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/add_theme-formation/`, formationData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });
      console.log('Réponse du serveur:', response.data);
      alert('Formation ajouté avec succès!');
      handleCancel(); // Reset form after successful submission
    } catch (error) {
      console.error('Il y a eu une erreur!', error);
      alert('Erreur lors de l’envoi des données');
    }
  };

  const handleCancel = () => {
    setTitre('');
    setCours('');
  };

  return (
    <div className='admin-page-container'>
      <div className='sidebar'>
        <SidebarRelex />
      </div>
      <div className='admin-container'>
        <div className='AdminTitleContainer'>
          <h1 className='AdminTitle'>Ajouter Formation</h1>
        </div>

        <div className='AdminInputContainer'>
          <label className='AdminLabel'>Titre *</label>
          <input
            type='text'
            className='AdminInput'
            placeholder='Ecrire le titre'
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </div>

        <div>
          <label className='AdminLabel'>Cours *</label>
          <select
            className='AdminInput'
            multiple={true} // Allows multiple selections
            onChange={handleCourChange}
          >
            {options.map((option) => (
              <option key={option.id} value={option.titre}>
                {option.titre}
              </option>
            ))}
          </select>
        </div>

        <div className='button-container'>
          <button onClick={handleCancel} className='cancel-button'>
            Annuler
          </button>
          <button onClick={handleSubmit} className='submit-button'>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}

export default AjouterTheme;
