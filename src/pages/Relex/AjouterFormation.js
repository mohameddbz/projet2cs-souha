import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';
import CompetanceModal from './CompetanceModal';
import '../Admin/Publier.css';

function AjouterFormation(props) {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [date_debut, setDateDebut] = useState('');
  const [date_fin, setDateFin] = useState('');
  const [Module, setModule] = useState([]); // Updated to array
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchModules();
  }, []);
  
  const fetchModules = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/modules/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setOptions(response.data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };


  const handleModuleChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    const selectedObjects = selectedValues.map(value => options.find(option => option.titre === value));
    const selectedIds = selectedObjects.map(obj => obj.id);
    setModule(selectedIds);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!titre || !description || !date_debut || !date_fin || !Module) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const formationData = {
      titre: titre,
      Module: Module,
      description: description,
      date_debut: date_debut,
      date_fin: date_fin
    };

    console.log(formationData);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/add-formation/`, formationData, {
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
    setDescription('');
    setDateDebut('');
    setDateFin('');
    setModule('');
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

        <div className='AdminDescriptionContainer'>
          <label className='AdminLabel'>Description *</label>
          <textarea
            className='AdminTextarea'
            placeholder='Ecrire la description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="AdminInputContainer">
            <label className="AdminLabel">Date de début*</label>
            <input
                type="date"
                className="AdminInput"
                value={date_debut}
                onChange={(e) => setDateDebut(e.target.value)}
            />
        </div>

        <div className="AdminInputContainer">
            <label className="AdminLabel">Date de fin*</label>
            <input
                type="date"
                className="AdminInput"
                value={date_fin}
                onChange={(e) => setDateFin(e.target.value)}
            />
        </div>

        <div>
          <label className='AdminLabel'>Module *</label>
          <select
            className='AdminInput'
            multiple={true} // Allows multiple selections
            onChange={handleModuleChange}
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

export default AjouterFormation;
