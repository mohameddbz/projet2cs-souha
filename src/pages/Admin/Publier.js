// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import './Publier.css';
// import { FaUpload } from 'react-icons/fa';
// import axios from 'axios';
// import SidebarPub from '../../components/Sidebar/SidebarAdmin/SidebarPub';

// function Admin2(props) {
//   const [subject, setSubject] = useState('');
//   const [description, setDescription] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [type, setType] = useState('');
//   const [dateDebut, setDateDebut] = useState('');
//   const [dateFin, setDateFin] = useState('');
//   const [datePublication, setDatePublication] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     if (!subject || !description) {
//       alert('Veuillez entrer à la fois un sujet et une description.');
//       return;
//     }
  
//     if (new Date(dateFin) < new Date(dateDebut)) {
//       alert(`La date de fin (${dateFin}) ne peut pas être antérieure à la date de début (${dateDebut}).`);
//       return;
//     }
  
//     if (new Date(datePublication) >= new Date(dateDebut)) {
//       alert(`La date de validation (${datePublication}) doit être avant la date de début (${dateDebut}).`);
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append('titre', subject);
//     formData.append('description', description);
//     formData.append('etat', 'en attente');
//     formData.append('image', selectedFile);
//     formData.append('type_publication', type);
//     formData.append('date_debut', dateDebut);
//     formData.append('date_fin', dateFin);
//     formData.append('date_publication', datePublication);
   
//     const token = localStorage.getItem('token');
  
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/publication/add/`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `token ${token}`
//         }
//       });
//       console.log('Réponse du serveur:', response.data);
//       alert('Publication ajoutée avec succès!');
//       setSubject('');
//       setDescription('');
//       setSelectedFile(null);
//       setType('');
//       setDateDebut('');
//       setDateFin('');
//       setDatePublication('');
//     } catch (error) {
//       console.error('Il y a eu une erreur!', error);
//       alert('Erreur lors de l’envoi des données');
//     }
//   };
  
//   const handleCancel = () => {
//     setSubject('');
//     setDescription('');
//     setSelectedFile(null);
//     setType('');
//     setDateDebut('');
//     setDateFin('');
//     setDatePublication('');
//   };

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleIconClick = () => {
//     document.getElementById('fileInput').click();
//   };

//   return (
//     <div className='admin-page-container'>
//       <div className='sidebar'>
//         <SidebarPub />
//       </div>
//       <div className="admin-container">
//         <div className="AdminTitleContainer">
//           <h1 className="AdminTitle">Publier</h1>
//         </div>

//         <div className="AdminInputContainer">
//           <label className="AdminLabel">Type de publication*</label>
//           <select
//             className="AdminInput"
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//           >
//             <option value="">Sélectionner un type</option>
//             <option value="event">Événement</option>
//             <option value="actualité">Actualité</option>
//             <option value="article">Article</option>
//             <option value="Success Story">Success Story</option>
//           </select>
//         </div>

//         {type === 'event' && (
//           <>
//             <div className="AdminInputContainer">
//               <label className="AdminLabel">Date de début*</label>
//               <input
//                 type="datetime-local"
//                 className="AdminInput"
//                 value={dateDebut}
//                 onChange={(e) => setDateDebut(e.target.value)}
//               />
//             </div>
//             <div className="AdminInputContainer">
//               <label className="AdminLabel">Date de fin*</label>
//               <input
//                 type="datetime-local"
//                 className="AdminInput"
//                 value={dateFin}
//                 onChange={(e) => setDateFin(e.target.value)}
//               />
//             </div>
//           </>
//         )}

//         <div className="AdminInputContainer">
//           <label className="AdminLabel">Sujet*</label>
//           <input
//             type="text"
//             className="AdminInput"
//             placeholder="Ecrire le sujet"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//           />
//         </div>

//         <div className="AdminDescriptionContainer">
//           <label className="AdminLabel">Description*</label>
//           <textarea
//             className="AdminTextarea"
//             placeholder="Ecrire la description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div className="AdminInputContainer">
//           <label className="AdminLabel">Deadline de validation*</label>
//           <input
//             type="datetime-local"
//             className="AdminInput"
//             value={datePublication}
//             onChange={(e) => setDatePublication(e.target.value)}
//           />
//         </div>

//         <div className="AdminFileContainer">
//           <div className="AdminHighlight">Joindre des fichiers</div>
//           <button className="file-upload-btn" onClick={handleIconClick}>
//             <FaUpload style={{ marginRight: "8px" }} />
//             Cliquez ici pour ajouter des fichiers
//           </button>
//           <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
//           {selectedFile && (
//             <div className="AdminFilePreview">
//               <span>Fichier choisi: {selectedFile.name}</span>
//             </div>
//           )}
//         </div>

//         <div className="button-container">
//           <button onClick={handleCancel} className="cancel-button">Annuler</button>
//           <button onClick={handleSubmit} className="submit-button">Envoyer</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// Admin2.propTypes = {
//   className: PropTypes.string,
// };

// export default Admin2;



// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import './Publier.css';
// import { FaUpload } from 'react-icons/fa';
// import axios from 'axios';
// import SidebarPub from '../../components/Sidebar/SidebarAdmin/SidebarPub';

// function Admin2() {
//   const [subject, setSubject] = useState('');
//   const [description, setDescription] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [type, setType] = useState('');
//   const [dateDebut, setDateDebut] = useState('');
//   const [dateFin, setDateFin] = useState('');
//   const [datePublication, setDatePublication] = useState('');
//   const [userInfo, setUserInfo] = useState({});
//   const [categorie, setCategorie] = useState('');

//   useEffect(() => {
//     getUser();
//   }, []);

//   const getUser = async () => {
//     const token = localStorage.getItem('token');
//     try {
//       const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/`, {
//         headers: { 'Authorization': `Token ${token}` }
//       });
//       setUserInfo(res.data);
//       setCategorie(res.data.Categorie.nom);
//     } catch (error) {
//       console.error('Error fetching user:', error);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!subject || !description) {
//       alert('Veuillez entrer à la fois un sujet et une description.');
//       return;
//     }

//     if (type === 'event' && new Date(dateFin) < new Date(dateDebut)) {
//       alert(`La date de fin (${dateFin}) ne peut pas être antérieure à la date de début (${dateDebut}).`);
//       return;
//     }

//     if (new Date(datePublication) >= new Date(dateDebut)) {
//       alert(`La date de validation (${datePublication}) doit être avant la date de début (${dateDebut}).`);
//       return;
//     }

//     const formData = new FormData();
//     formData.append('titre', subject);
//     formData.append('description', description);
//     formData.append('etat', 'en attente');
//     formData.append('image', selectedFile);
//     formData.append('type_publication', type);
//     formData.append('date_debut', dateDebut);
//     formData.append('date_fin', dateFin);
//     formData.append('date_publication', datePublication);

//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/publication/add/`, formData, {
//         headers: {
//           'Authorization': `Token ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       console.log(response)
//       console.log('Réponse du serveur:', response.data);
//       alert('Publication ajoutée avec succès!');
//     } catch (error) {
//       console.error('Il y a eu une erreur!', error);
//     }
//   };

//   const handleCancel = () => {
//     setSubject('');
//     setDescription('');
//     setSelectedFile(null);
//     setType('');
//     setDateDebut('');
//     setDateFin('');
//     setDatePublication('');
//   };

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleIconClick = () => {
//     document.getElementById('fileInput').click();
//   };

//   return (
//     <div className='admin-page-container'>
//       <div className='sidebar'>
//         <SidebarPub />
//       </div>
//       <div className="admin-container">
//         <div className="AdminTitleContainer">
//           <h1 className="AdminTitle">Publier</h1>
//         </div>

//         <select
//           className="AdminInput"
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//         >
//           {userInfo.is_editeur && categorie !== "alumni" && (
//             <>
//               <option value="event">Événement</option>
//               <option value="actualité">Actualité</option>
//             </>
//           )}

//           {userInfo.is_chercheur && (
//             <option value="article">Article</option>
//           )}

//           {userInfo.is_editeur && categorie === "alumni" && (
//             <option value="Success Story">Success Story</option>
//           )}
//         </select>

//         {type === 'event' && (
//           <>
//             <div className="AdminInputContainer">
//               <label className="AdminLabel">Date de début*</label>
//               <input
//                 type="datetime-local"
//                 className="AdminInput"
//                 value={dateDebut}
//                 onChange={(e) => setDateDebut(e.target.value)}
//               />
//             </div>
//             <div className="AdminInputContainer">
//               <label className="AdminLabel">Date de fin*</label>
//               <input
//                 type="datetime-local"
//                 className="AdminInput"
//                 value={dateFin}
//                 onChange={(e) => setDateFin(e.target.value)}
//               />
//             </div>
//           </>
//         )}

//         <div className="AdminInputContainer">
//           <label className="AdminLabel">Sujet*</label>
//           <input
//             type="text"
//             className="AdminInput"
//             placeholder="Ecrire le sujet"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//           />
//         </div>

//         <div className="AdminDescriptionContainer">
//           <label className="AdminLabel">Description*</label>
//           <textarea
//             className="AdminTextarea"
//             placeholder="Ecrire la description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="AdminInputContainer">
//           <label className="AdminLabel">Deadline de validation*</label>
//           <input
//             type="datetime-local"
//             className="AdminInput"
//             value={datePublication}
//             onChange={(e) => setDatePublication(e.target.value)}
//           />
//         </div>

//         <div className="AdminFileContainer">
//           <div className="AdminHighlight">Joindre des fichiers</div>
//           <button className="file-upload-btn" onClick={handleIconClick}>
//             <FaUpload style={{ marginRight: "8px" }} />
//             Cliquez ici pour ajouter des fichiers
//           </button>
//           <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
//           {selectedFile && (
//             <div className="AdminFilePreview">
//               <span>Fichier choisi: {selectedFile.name}</span>
//             </div>
//           )}
//         </div>

//         <div className="button-container">
//           <button onClick={handleCancel} className="cancel-button">Annuler</button>
//           <button onClick={handleSubmit} className="submit-button">Envoyer</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// Admin2.propTypes = {
//   className: PropTypes.string,
// };

// export default Admin2;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Publier.css';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import SidebarPub from '../../components/Sidebar/SidebarAdmin/SidebarPub';

function Admin2(props) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [type, setType] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [datePublication, setDatePublication] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [categorie, setCategorie] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errors, setErrors] = useState({}); // Error state

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
      console.error('Error fetching user info:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!subject) newErrors.subject = 'Veuillez entrer un sujet.';
    if (!description) newErrors.description = 'Veuillez entrer une description.';
    if (type === 'event') {
      if (new Date(dateFin) < new Date(dateDebut)) {
        newErrors.dateFin = `La date de fin ne peut pas être antérieure à la date de début.`;
      }
      if (new Date(datePublication) >= new Date(dateDebut)) {
        newErrors.datePublication = `La date de validation doit être avant la date de début.`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const formData = new FormData();
      formData.append('titre', subject);
      formData.append('description', description);
      formData.append('etat', 'en attente');
      formData.append('type_publication', type);
      formData.append('date_debut', dateDebut);
      formData.append('date_fin', dateFin);
      formData.append('date_publication', datePublication);
    console.log(formData)

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/publication/add/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `token ${token}`
        }
      });
      console.log('Réponse du serveur:', response.data);
      alert('Publication ajoutée avec succès!');
      handleCancel();
    } catch (error) {
      console.error('Il y a eu une erreur!', error);
      alert('Erreur lors de l’envoi des données');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSubject('');
    setDescription('');
    setSelectedFile(null);
    setType('');
    setDateDebut('');
    setDateFin('');
    setDatePublication('');
    setErrors({});
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Add file validation here if needed (e.g., file type or size check)
    setSelectedFile(file);
  };

  const handleIconClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className='admin-page-container'>
      <div className='sidebar'>
        <SidebarPub />
      </div>
      <div className="admin-container">
        <div className="AdminTitleContainer">
          <h1 className="AdminTitle">Publier</h1>
        </div>

        <div className="AdminInputContainer">
          <label className="AdminLabel">Type de publication*</label>
          <select
            className={`AdminInput ${errors.type ? 'error' : ''}`}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">choise one </option>
            <option value="actualité">Actualité</option>
            <option value="event"> Événement</option>
          </select>
          {errors.type && <span className="error-message">{errors.type}</span>}
        </div>

        {type === 'event' && (
          <>
            <div className="AdminInputContainer">
              <label className="AdminLabel">Date de début*</label>
              <input
                type="datetime-local"
                className={`AdminInput ${errors.dateDebut ? 'error' : ''}`}
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
              />
              {errors.dateDebut && <span className="error-message">{errors.dateDebut}</span>}
            </div>
            <div className="AdminInputContainer">
              <label className="AdminLabel">Date de fin*</label>
              <input
                type="datetime-local"
                className={`AdminInput ${errors.dateFin ? 'error' : ''}`}
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
              />
              {errors.dateFin && <span className="error-message">{errors.dateFin}</span>}
            </div>
          </>
        )}

        <div className="AdminInputContainer">
          <label className="AdminLabel">Sujet*</label>
          <input
            type="text"
            className={`AdminInput ${errors.subject ? 'error' : ''}`}
            placeholder="Ecrire le sujet"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          {errors.subject && <span className="error-message">{errors.subject}</span>}
        </div>

        <div className="AdminDescriptionContainer">
          <label className="AdminLabel">Description*</label>
          <textarea
            className={`AdminTextarea ${errors.description ? 'error' : ''}`}
            placeholder="Ecrire la description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
        <div className="AdminInputContainer">
          <label className="AdminLabel">Deadline de validation*</label>
          <input
            type="datetime-local"
            className={`AdminInput ${errors.datePublication ? 'error' : ''}`}
            value={datePublication}
            onChange={(e) => setDatePublication(e.target.value)}
          />
          {errors.datePublication && <span className="error-message">{errors.datePublication}</span>}
        </div>

        <div className="AdminFileContainer">
          <div className="AdminHighlight">Joindre des fichiers</div>
          <button className="file-upload-btn" onClick={handleIconClick} disabled={isLoading}>
            <FaUpload style={{ marginRight: "8px" }} />
            Cliquez ici pour ajouter des fichiers
          </button>
          <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
          {selectedFile && (
            <div className="AdminFilePreview">
              <span>Fichier choisi: {selectedFile.name}</span>
            </div>
          )}
        </div>

        <div className="button-container">
          <button onClick={handleCancel} className="cancel-button" disabled={isLoading}>Annuler</button>
          <button onClick={handleSubmit} className="submit-button" disabled={isLoading}>
            {isLoading ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </div>
  );
}

Admin2.propTypes = {
  className: PropTypes.string,
};

export default Admin2;
