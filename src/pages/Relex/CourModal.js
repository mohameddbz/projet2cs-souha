import React, { useState , useEffect } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './Modifier.css';

function CourModal({ cour , onClose, onSave }) {
  const [titre, setTitre] = useState(cour.titre);
  const [description, setDescription] = useState(cour.description);
  const [chapitres, setChapitres] = useState(cour.chapitres);
  const [competances, setCompetances] = useState(cour.competences); // Updated to array
  const [options, setOptions] = useState([]);
  const [options1, setOptions1] = useState([]);

  useEffect(() => {
    fetchChapitres();
    fetchCompetance();
  }, []);

  const fetchChapitres = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/chapitres/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setOptions(response.data);
    } catch (error) {
      console.error('Error fetching chapitre:', error);
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


  const handlechapitreChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    const selectedObjects = selectedValues.map(value => options.find(option => option.titre === value));
    const selectedIds = selectedObjects.map(obj => obj.id);
    setChapitres(selectedIds);
  };

  const handleCompetanceChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    const selectedObjects = selectedValues.map(value => options1.find(option => option.nom === value));
    const selectedIds = selectedObjects.map(obj => obj.id);
    setCompetances(selectedIds);
  };
    
    const handleSubmit = async ()  => {
        if (!titre || !description  || !chapitres.length === 0 || competances.length === 0) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        const moduleData = {
            titre: titre,
            description: description,
            competences: [1],  //TODO il faut regler ce problem 
            chapitres: [1]    //TODO il faut regler ce problem
        };
        console.log(cour.id)
        const token = localStorage.getItem('token');
        await axios.put(`${process.env.REACT_APP_API_URL}/cour/update/${cour.id}/`, moduleData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
          })
        .then(response => {
            onSave(response.data); // Déclenchez le rafraîchissement avec les nouvelles données
            onClose(); // Fermez la modale après le succès
        })
        .catch(error => {
            console.error('Failed to update the course:', error);
            alert('Failed to update the course. Please try again.');
        });
        };

    return (
        <div className="popup-modifier">
            <h2>Modifier cour</h2>
           <button className="close-buttonn" onClick={onClose}><FaTimes /></button>

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
            onChange={handlechapitreChange}
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
        </div>

            <div className="button-modif-container">
                <button onClick={onClose} className="cancel-modif-button">Annuler</button>
                <button onClick={handleSubmit} className="submit-modif-button">Modifier</button>
            </div>
        </div>
    );

}

export default CourModal;
