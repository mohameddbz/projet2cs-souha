// import React, { useState , useEffect } from 'react';
// import PropTypes from 'prop-types';
// import '../Admin/Publier.css';
// import axios from 'axios';
// import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';
// import CompetanceModal from './CompetanceModal'

// function AjouterModule(props) {
//   const [titre, setTitre] = useState('');
//   const [description, setDescription] = useState('');
//   const [volume_horaire, setVolumeHoraire] = useState(null);
//   const [formateur, setFormateur] = useState({});
//   const [competance, setCompetance] = useState({});
//   const [options, setOptions] = useState([]);
//   const [options1, setOptions1] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);

  

//   useEffect(() => {
//     fetchFormateur();
//     fetchCompetance();
//   }, []);

//   const fetchFormateur = async () => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/formateur/`, {
//         headers: { 'Authorization': `Token ${token}` }  

//     });
//       const data = response.data;
//       console.log(data)
//       setOptions(data); // Assuming data is an array of options
//     } catch (error) {
//       console.error('Error fetching formateur:', error);
//     }
//   };

//   const fetchCompetance = async () => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/competances/`, {
//         headers: { 'Authorization': `Token ${token}` }  

//     });
//       const data = response.data;
//       console.log(data)
//       setOptions1(data); // Assuming data is an array of options
//     } catch (error) {
//       console.error('Error fetching competance:', error);
//     }
//   };

//   const handleClick = (event) => {
//     setShowPopup(true);
//   }

//   const handleChange = (e) => {
//     const selectedValue = e.target.value;
//     const selectedObj = options.find(option => option.nom === selectedValue);
//     setFormateur(selectedObj.id);
//   };
//   const handlchange1 = (e) => {
//     const selectedValue = e.target.value;
//     const selectedObj = options1.find(option => option.nom === selectedValue);
//     setCompetance(selectedObj.id);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     if (!titre || !description || !volume_horaire || !formateur || !competance) {
//       alert('Veuillez entrer à la fois un titre et une description et un volume_horaire et competance');
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append('titre', titre);
//     formData.append('description', description);
//     formData.append('competences', competance);
//     formData.append('volume_horaire', volume_horaire);
//     formData.append('formateur', formateur);
    
//     console.log(formData)
//     const token = localStorage.getItem('token');
  
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/add_module/`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `token ${token}`
//         }
//       });
//       console.log('Réponse du serveur:', response.data);
//       alert('Partenaire ajoutée avec succès!');
//       setTitre('');
//       setDescription('');
//       setCompetance(null);
//       setFormateur('');
//       setVolumeHoraire('');
//     } catch (error) {
//       console.error('Il y a eu une erreur!', error);
//       alert('Erreur lors de l’envoi des données');
//     }
//   };
  
//   const handleCancel = () => {
//     setTitre('');
//     setDescription('');
//     setCompetance(null);
//     setFormateur('');
//     setVolumeHoraire('');
//   };

//   return (
//     <div className='admin-page-container'>
//       <div className='sidebar'>
//         <SidebarRelex />
//       </div>
//       <div className="admin-container">
//         <div className="AdminTitleContainer">
//           <h1 className="AdminTitle">Ajouter Module</h1>
//         </div>

//         <div className="AdminInputContainer">
//           <label className="AdminLabel">Titre *</label>
//           <input
//             type="text"
//             className="AdminInput"
//             placeholder="Ecrire le titre"
//             value={titre}
//             onChange={(e) => setTitre(e.target.value)}
//           />
//         </div>

//         <div className="AdminDescriptionContainer">
//           <label className="AdminLabel">Description *</label>
//           <textarea
//             className="AdminTextarea"
//             placeholder="Ecrire la description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div className="AdminInputContainer">
//           <label className="AdminLabel">volume horaire *</label>
//           <input
//             type="number"
//             className="AdminInput"
//             value={volume_horaire}
//             onChange={(e) => setVolumeHoraire(e.target.value)}
//           />
//         </div>
//         <div>
//             <label className="AdminLabel">Formateur *</label>
//             <select 
//               className="AdminInput"
//               onChange={handleChange}>
//             <option> </option>
//             {options.map((option) => (
//                 <option key={option.id} value={option.nom}>
//                 {option.nom}
//                 </option>
//             ))}
//             </select>
//         </div>
//         <div>
//             <label className="AdminLabel">Competance *</label>
//             <select
//               className="AdminInput"
//               onChange={handlchange1}>
//             <option> </option>
//             {options1.map((option) => (
//                 <option key={option.id} value={option.nom}>
//                 {option.nom}
//                 </option>
//             ))}
//             </select>
//             <button className="submit-button" onClick={handleClick}>Ajouter une competance</button>
//         </div>
        

//         <div className="button-container">
//           <button onClick={handleCancel} className="cancel-button">Annuler</button>
//           <button onClick={handleSubmit} className="submit-button">Envoyer</button>
//         </div>
//       </div>
//       {showPopup && (
//           <CompetanceModal
//             onClose={() => setShowPopup(false)}
//             onSave={() => {
//               setShowPopup(false);
//               fetchCompetance();  // Refresh the list after saving
//             }}
//           />
//       )}
//     </div>
//   );
// }


// export default AjouterModule;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';
import CompetanceModal from './CompetanceModal';
import '../Admin/Publier.css';

function AjouterModule(props) {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [volume_horaire, setVolumeHoraire] = useState('');
  const [formateur, setFormateur] = useState('');
  const [competances, setCompetances] = useState([]); // Updated to array
  const [options, setOptions] = useState([]);
  const [options1, setOptions1] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

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

  const handleClick = () => {
    setShowPopup(true);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!titre || !description || !volume_horaire || !formateur || competances.length === 0) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const moduleData = {
      titre: titre,
      description: description,
      competences: competances,
      volume_horaire: volume_horaire,
      formateur: formateur
  };

    console.log(moduleData);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/add_module/`, moduleData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });
      console.log('Réponse du serveur:', response.data);
      alert('Module ajouté avec succès!');
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
    setFormateur('');
    setVolumeHoraire('');
  };

  return (
    <div className='admin-page-container'>
      <div className='sidebar'>
        <SidebarRelex />
      </div>
      <div className='admin-container'>
        <div className='AdminTitleContainer'>
          <h1 className='AdminTitle'>Ajouter Module</h1>
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

export default AjouterModule;
