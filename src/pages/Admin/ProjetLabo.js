import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './ProjetLabo.css';
import SidebarPub from '../../components/Sidebar/SidebarAdmin/SidebarPub';

function Admin2(props) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [themeId, setThemeId] = useState('');
  const [type, setType] = useState('');
  const [researchStartYear, setResearchStartYear] = useState('');
  const [teamId, setTeamId] = useState('');
  const [themes, setThemes] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/theme`);
        console.log('Themes data:', response.data); // Log themes data
        setThemes(response.data);
      } catch (error) {
        console.error('Error fetching themes:', error);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/equipe_projet`);
        console.log('Teams data:', response.data); // Log teams data
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchThemes();
    fetchTeams();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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

  const handleCancel = () => {
    setSubject('');
    setDescription('');
    setSelectedFile(null);
    setThemeId('');
    setType('');
    setResearchStartYear('');
    setTeamId('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!subject || !description || !themeId || !type || !researchStartYear || !teamId) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }

    console.log('Selected Theme ID:', themeId); // Log selected theme ID
    console.log('Selected Team ID:', teamId); // Log selected team ID

    const projectData = {
      nom: subject,
      description: description,
      annee: researchStartYear,
      type: type,
      themes: themeId,
      equipe_projet: teamId
    };

    console.log('Project data being sent:', projectData); // Log project data being sent

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/project/add`, projectData);
      console.log('Project added successfully:', response.data); // Log success response
      handleCancel();
    } catch (error) {
      console.error('Error adding project:', error); // Log error
    }
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
              value={themeId}
              onChange={(e) => setThemeId(e.target.value)}
            >
              <option value="">Sélectionner un thème</option>
              {themes.map((theme) => (
                <option key={theme.id_theme} value={theme.id_theme}>
                  {theme.nom}
                </option>
              ))}
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
              <option value="Projet National">Projet National</option>
              <option value="Projet international">Projet international</option>
            </select>
          </div>
        </div>
       
        <div className='AdminInputGroup'>
          <div className="AdminInputContainer">
            <label className="AdminLabel">Année*</label>
            <select
              className="AdminInput"
              value={researchStartYear}
              onChange={(e) => setResearchStartYear(e.target.value)}
            >
              <option value="">Sélectionner une année</option>
              {generateYearOptions()}
            </select>
          </div>
          <div className="AdminInputContainer">
            <label className="AdminLabel">Equipe*</label>
            <select
              className="AdminInput"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
            >
              <option value="">Sélectionner une Equipe</option>
              {teams.map((team) => (
                <option key={team.id_equipe_projet} value={team.id_equipe_projet}>
                  {team.nom}
                </option>
              ))}
            </select>
          </div>
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

        <div className="button-container">
          <button onClick={handleCancel} className="cancel-button">Annuler</button>
          <button onClick={handleSubmit} className="submit-button">Envoyer</button>
        </div>
      </div>
    </div>
  );
}

Admin2.propTypes = {
  className: PropTypes.string,
};

export default Admin2;
