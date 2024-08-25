import React, { useState , useEffect } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './Modifier.css';

function FormationModal({ form , onClose, onSave }) {
    const [titre, setTitre] = useState(form.titre);
    const [description, setDescription] = useState(form.description);
    const [date_debut, setDateDebut] = useState(form.date_debut);
    const [date_fin, setDateFin] = useState(form.date_fin);
    const [Module, setModule] = useState(form.Module); // Updated to array
    const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchModule();
  }, []);

  const fetchModule = async () => {
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
    
    const handleSubmit = async ()  => {
        if (!titre || !description || !date_debut || !date_fin || !Module) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
          }
        const formationData = {
            titre: titre,
            Module: [7],
            description: description,
            date_debut: date_debut,
            date_fin: date_fin
        };
        console.log(formationData)
        
        const token = localStorage.getItem('token');
        await axios.put(`${process.env.REACT_APP_API_URL}/formation/update/${form.id}/`, formationData, {
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

            <div className="button-modif-container">
                <button onClick={onClose} className="cancel-modif-button">Annuler</button>
                <button onClick={handleSubmit} className="submit-modif-button">Modifier</button>
            </div>
        </div>
    );

}

export default FormationModal;
