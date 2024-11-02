import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';
import CompetanceModal from './CompetanceModal';
import '../Admin/Publier.css';

function AjouterCour(props) {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [chapitre, setChaptre] = useState([]);
  const [competances, setCompetances] = useState([]); // Updated to array
  const [options, setOptions] = useState([]);
  const [options1, setOptions1] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchChapitre();
    fetchCompetance();
  }, []);

  const fetchChapitre = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/chapitres/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setOptions(response.data);
    } catch (error) {
      console.error('Error fetching chapitres:', error);
    }
  };

  const fetchCompetance = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/competances/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setOptions1(response.data);
    } catch (error) {
      console.error('Error fetching competance:', error);
    }
  };

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleChapitreChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    const selectedObjects = selectedValues.map(value => options.find(option => option.titre === value));
    const selectedIds = selectedObjects.map(obj => obj.id);
    setChaptre(selectedIds);
  };


  const handleCompetanceChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    const selectedObjects = selectedValues.map(value => options1.find(option => option.nom === value));
    const selectedIds = selectedObjects.map(obj => obj.id);
    setCompetances(selectedIds);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!titre || !description || !chapitre.length === 0 || competances.length === 0) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const moduleData = {
      titre: titre,
      description: description,
      competences: competances,
      chapitres: chapitre
  };

    console.log(moduleData);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/add_cours/`, moduleData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });
      console.log('Réponse du serveur:', response.data);
      alert('Cour ajouté avec succès!');
      handleCancel(); // Reset form after successful submission
    } catch (error) {
      console.error('Il y a eu une erreur!', error);
      alert('Erreur lors de l’envoi des données');
    }
  };

  const handleCancel = () => {
    setTitre('');
    setDescription('');
    setCompetances([]);
    setChaptre([]);
  };

  return (
    <div className='admin-page-container'>
      <div className='sidebar'>
        <SidebarRelex />
      </div>
      <div className='admin-container'>
        <div className='AdminTitleContainer'>
          <h1 className='AdminTitle'>Ajouter Cour</h1>
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

        <div>
          <label className='AdminLabel'>Chapitres * (Sélectionnez un ou plusieur )</label>
          <select
            className='AdminInput'
            multiple={true} // Allows multiple selections
            onChange={handleChapitreChange}
          >
            {options.map((option) => (
              <option key={option.id} value={option.titre}>
                {option.titre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='AdminLabel'>Compétences * (Sélectionnez un ou plusieur )</label>
          <select
            className='AdminInput'
            multiple={true} // Allows multiple selections
            onChange={handleCompetanceChange}
          >
            {options1.map((option) => (
              <option key={option.id} value={option.nom}>
                {option.nom}
              </option>
            ))}
          </select>
          <button className='submit-button' onClick={handleClick}>
            Ajouter une compétence
          </button>
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

      {showPopup && (
        <CompetanceModal
          onClose={() => setShowPopup(false)}
          onSave={() => {
            setShowPopup(false);
            fetchCompetance(); // Refresh the list after saving
          }}
        />
      )}
    </div>
  );
}

export default AjouterCour;
