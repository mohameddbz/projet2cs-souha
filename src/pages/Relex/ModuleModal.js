import React, { useState , useEffect } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './Modifier.css';

function ModuleModal({ module , onClose, onSave }) {
  const [titre, setTitre] = useState(module.titre);
  const [description, setDescription] = useState(module.description);
  const [volume_horaire, setVolumeHoraire] = useState(module.volume_horaire);
  const [formateur, setFormateur] = useState(module.formateur);
  const [competances, setCompetances] = useState(module.competences); // Updated to array
  const [options, setOptions] = useState([]);
  const [options1, setOptions1] = useState([]);

  useEffect(() => {
    fetchFormateur();
    fetchCompetance();
  }, []);

  const fetchFormateur = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/formateur/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setOptions(response.data);
    } catch (error) {
      console.error('Error fetching formateur:', error);
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


  const handleFormateurChange = (e) => {
    setFormateur(e.target.value);
  };

  const handleCompetanceChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    const selectedObjects = selectedValues.map(value => options1.find(option => option.nom === value));
    const selectedIds = selectedObjects.map(obj => obj.id);
    setCompetances(selectedIds);
  };
    
    const handleSubmit = async ()  => {
        if (!titre || !description || !volume_horaire || !formateur || competances.length === 0) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        const moduleData = {
            titre: titre,
            description: description,
            competences: [3],  //TODO il faut regler ce problem 
            volume_horaire: volume_horaire,
            formateur: 1    //TODO il faut regler ce problem
        };
        console.log(module.id)
        const token = localStorage.getItem('token');
        await axios.put(`${process.env.REACT_APP_API_URL}/module/update/${module.id}/`, moduleData, {
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
            console.error('Failed to update the module:', error);
            alert('Failed to update the module. Please try again.');
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

            <div className='AdminInputContainer'>
            <label className='AdminLabel'>Volume horaire *</label>
            <input
                type='number'
                className='AdminInput'
                value={volume_horaire}
                onChange={(e) => setVolumeHoraire(e.target.value)}
            />
            </div>

            <div>
            <label className='AdminLabel'>Formateur *</label>
            <select
                className='AdminInput'
                value={formateur}
                onChange={handleFormateurChange}
            >
                <option value=''>Sélectionner un formateur</option>
                {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.nom}
                </option>
                ))}
            </select>
            </div>

            <div>
            <label className='AdminLabel'>Compétences *</label>
            <select
                className='AdminInput'
                multiple={true} 
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

export default ModuleModal;
