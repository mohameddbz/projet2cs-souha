import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Admchercheur.css';
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
          <h1 className="AdminTitle">Créer un chercheur</h1>
        </div>

        <div className="AdminInputGroup">
          <div className="AdminInputContainer">
            <label className="AdminLabel">Nom complet*</label>
            <input
              type="text"
              className="AdminInput"
              placeholder="Ecrivez votre nom complet"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="AdminInputContainer">
            <label className="AdminLabel">Grade*</label>
            <select
              className="AdminInput"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Sélectionner un type</option>
              <option value="Maitre de conférence classe B">Maitre de conférence classe B</option>
              <option value="Maitre de conférence classe A">Maitre de conférence classe A</option>
              <option value="Professeur">Professeur</option>
            </select>
          </div>
        </div>

        <div className="AdminInputGroup">
        <div className="AdminInputContainer">
            <label className="AdminLabel">Email*</label>
            <input
              type="email"
              className="AdminInput"
              placeholder="Ecrivez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="AdminInputContainer">
            <label className="AdminLabel">Chercheur depuis*</label>
            <select
              className="AdminInput"
              value={researchStartYear}
              onChange={(e) => setResearchStartYear(e.target.value)}
            >
              <option value="">Sélectionner une année</option>
              {generateYearOptions()}
            </select>
          </div>

       
        </div>

        <div className="AdminInputGroup">
          <div className="AdminInputContainer">
            <label className="AdminLabel">LinkedIn*</label>
            <input
              type="url"
              className="AdminInput"
              placeholder="Lien vers votre profil LinkedIn"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>

          <div className="AdminInputContainer">
            <label className="AdminLabel">Twitter*</label>
            <input
              type="url"
              className="AdminInput"
              placeholder="Lien vers votre profil Twitter"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
        </div>

        <div className="AdminDescriptionContainer">
          <label className="AdminLabel">Résumé*</label>
          <textarea
            className="AdminTextarea1"
            placeholder="Ecrire le résumé"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="AdminDescriptionContainer">
          <label className="AdminLabel">Défis*</label>
          <textarea
            className="AdminTextarea"
            placeholder="Ecrire les défis"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="AdminDescriptionContainer">
          <label className="AdminLabel">Réalisation*</label>
          <textarea
            className="AdminTextarea"
            placeholder="Ecrire les réalisations et les réussites"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="AdminDescriptionContainer">
          <label className="AdminLabel">Horizons*</label>
          <textarea
            className="AdminTextarea"
            placeholder="Ecrire les horizons et objectifs"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="AdminDescriptionContainer">
          <label className="AdminLabel">Motivation*</label>
          <textarea
            className="AdminTextarea"
            placeholder="Ecrire votre motivation"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="button-container">
          <button className="cancel-button">Annuler</button>
          <button className="submit-button">Envoyer</button>
        </div>
      </div>
    </div>
  );
}

Admin2.propTypes = {
  className: PropTypes.string,
};

export default Admin2;
