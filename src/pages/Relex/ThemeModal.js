import React, { useState , useEffect } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './Modifier.css';

function ThemeModal({ form , onClose, onSave }) {
    const [titre, setTitre] = useState(form.titre);
    const [cours, setCours] = useState(form.cours); // Updated to array
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
      console.log(response.data)
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
    
    const handleSubmit = async ()  => {
        if (!titre || !cours) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
          }
        const formationData = {
            titre: titre,
            cours: [2],
        };
        console.log(formationData)
        
        const token = localStorage.getItem('token');
        await axios.put(`${process.env.REACT_APP_API_URL}/theme-formation/update/${form.id}/`, formationData, {
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
            console.error('Failed to update the formatio:', error);
            alert('Failed to update the formation. Please try again.');
        });
        };

    return (
        <div className="popup-modifier">
            <h2>Modifier moduule</h2>
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

            <div className="button-modif-container">
                <button onClick={onClose} className="cancel-modif-button">Annuler</button>
                <button onClick={handleSubmit} className="submit-modif-button">Modifier</button>
            </div>
        </div>
    );

}

export default ThemeModal;
