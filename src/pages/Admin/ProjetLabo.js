import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProjetLabo.css';
import SidebarPub from '../../components/Sidebar/SidebarAdmin/SidebarPub';

function Admin2(props) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [type, setType] = useState('');
  const [researchStartYear, setResearchStartYear] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleIconClick = () => {
    document.getElementById('fileInput').click();
  };

  const generateYearOptions = () => {
    const years = [];
    for (let year = 2024; year >= 1960; year--) {
      years.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return years;
  };

  return (
    <div className='admin-page-container'>
      <div className='sidebar'>
        <SidebarPub />
      </div>
      <div className="admin-container">
        <div className="AdminTitleContainer">
          <h1 className="AdminTitle">Ajouter un projet</h1>
        </div>


          <div className="AdminInputContainer">
            <label className="AdminLabel">Titre*</label>
            <input
              type="text"
              className="AdminInput"
              placeholder="Ecrivez le titre de projet"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className='AdminInputGroup'>
          <div className="AdminInputContainer">
            <label className="AdminLabel">Thème*</label>
            <select
              className="AdminInput"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Sélectionner un type</option>
              <option value="Maitre de conférence classe B">Système d'information</option>
              <option value="Maitre de conférence classe A">Intelligence artificielle</option>
              <option value="Professeur">Sécurité données</option>
            </select>
          </div>
        
          <div className="AdminInputContainer">
            <label className="AdminLabel">Type*</label>
            <select
              className="AdminInput"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Sélectionner un type</option>
              <option value="Maitre de conférence classe B">Projet National</option>
              <option value="Maitre de conférence classe A">Projet international</option>
            
            </select>
          </div>
          </div>
       
          <div className="AdminInputContainer">
            <label className="AdminLabel">année*</label>
            <select
              className="AdminInput"
              value={researchStartYear}
              onChange={(e) => setResearchStartYear(e.target.value)}
            >
              <option value="">Sélectionner une année</option>
              {generateYearOptions()}
            </select>

       
        </div>

       

        <div className="AdminDescriptionContainer">
          <label className="AdminLabel">Déscription*</label>
          <textarea
            className="AdminTextarea1"
            placeholder="Ecrire le résumé"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

       

       

      


       
      </div>
    </div>
  );
}

Admin2.propTypes = {
  className: PropTypes.string,
};

export default Admin2;
