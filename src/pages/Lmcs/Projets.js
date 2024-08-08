import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Projets.css';
import { FcNext, FcPrevious } from "react-icons/fc";
import { GrLinkNext } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { RxDividerVertical } from "react-icons/rx";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";

const pageSize = 5;

function Projets() {
  const [showMenu, setShowMenu] = useState(false);
  const [recherche, setRecherche] = useState('');
  const [projets, setProjets] = useState([]);
  const [filteredProjets, setFilteredProjets] = useState([]);
  const [themes, setThemes] = useState([]);
  const [annees, setAnnees] = useState([]);
  const [theme, setTheme] = useState('');
  const [annee, setAnnee] = useState('');
  const [type, setType] = useState('national');
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showAnneeMenu, setShowAnneeMenu] = useState(false);

  useEffect(() => {
    fetchProjets();
    fetchThemes();
    fetchAnnees();
  }, [type, theme, annee]);

  useEffect(() => {
    filterProjets();
  }, [recherche, projets]);

  const fetchProjets = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/projets/lmcs`, {
        params: { theme, annee, type }
      });
      setProjets(response.data.projets || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchThemes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/theme`);
      setThemes(response.data || []);
    } catch (error) {
      console.error('Error fetching themes:', error);
    }
  };

  const fetchAnnees = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/annees-projets/`);
      setAnnees(response.data.annees || []);
    } catch (error) {
      console.error('Error fetching years:', error);
    }
  };

  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme);
    setShowThemeMenu(false);
  };

  const handleAnneeSelect = (selectedAnnee) => {
    setAnnee(selectedAnnee);
    setShowAnneeMenu(false);
  };

  const toggleThemeMenu = () => {
    setShowThemeMenu(!showThemeMenu);
  };

  const toggleAnneeMenu = () => {
    setShowAnneeMenu(!showAnneeMenu);
  };

  const handleChange = (event) => {
    setRecherche(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const réinitialiser = (e) => {
    e.preventDefault();
    setTheme('');
    setAnnee('');
    setRecherche('');
  };

  const handleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setCurrentPage(0);
  };

  const filterProjets = () => {
    const lowercasedRecherche = recherche.toLowerCase();
    const filtered = projets.filter(projet =>
      projet.nom.toLowerCase().includes(lowercasedRecherche) ||
      projet.description.toLowerCase().includes(lowercasedRecherche)
    );
    setFilteredProjets(filtered);
  };

  const totalPages = Math.ceil(filteredProjets.length / pageSize);
  const getCurrentPageCards = () => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredProjets.slice(startIndex, endIndex);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Navbar />
      <div className='page-container'>
        <div className='hero-container'>
          <RxDividerVertical className='first-icon' />
          <div className='hero-title'>
            <h1>Les projets</h1>
          </div>
        </div>
        <div className='description-container'>
          <h2 className='description'>{filteredProjets.length} Projets</h2>
        </div>
        <div className='semi-title'>
          <a href="#" className={`lien ${type === 'national' ? 'active' : ''}`} onClick={() => handleTypeChange('national')}>
            Projets nationaux
          </a>
          <a href="#"
             className={`lien ${type === 'international' ? 'active' : ''}`}
             onClick={() => handleTypeChange('international')}>
            Projets Internationaux
          </a>
        </div>
        <div className='recherche-container'>
          <div className='recherche-bar'>
            <input
              className='rech'
              type="text"
              value={recherche}
              onChange={handleChange}
              placeholder="Rechercher par un mot clé"
            />
            <IoMdSearch color='white' size={25} style={{ position: 'relative', top: '12', right: '20' }} />
          </div>
          <div className="filtres">
            <button className="custom-button">Filtrer</button>
            <button onClick={réinitialiser}>Réinitialiser</button>
          </div>
          <div className='filtres'>
            <span className=''>Thèmes</span>
            <IoIosArrowDown color='black' size={25} style={{ position: 'relative', left: '160', cursor: 'pointer' }} onClick={toggleThemeMenu} />
            {showThemeMenu && (
              <ul className="options-list">
                {themes.map((t) => (
                  <li key={t.id} onClick={() => handleThemeSelect(t.nom)}>{t.nom}</li>
                ))}
              </ul>
            )}
            <span style={{ right: `100px` }}>{theme}</span>
          </div>
          <div className='filtres'>
            <span className=''>Année</span>
            <IoIosArrowDown color='black' size={25} style={{ position: 'relative', left: '168', cursor: 'pointer' }} onClick={toggleAnneeMenu} />
            {showAnneeMenu && (
              <ul className="options-list">
                {annees.map((a) => (
                  <li key={a} onClick={() => handleAnneeSelect(a)}>{a}</li>
                ))}
              </ul>
            )}
            <span style={{ right: `100px` }}>{annee}</span>
          </div>
        </div>
        <div className='projet-container'>
          {getCurrentPageCards().map((projet, index) => (
            <div key={index} className='projet'>
              <div className='projet-title'>
                <h3 className='p-title'>
                  {projet.nom}
                  <GrLinkNext style={{ marginLeft: '10px' }} onClick={() => handleExpand(index)} />
                </h3>
                <section className={`projet-detail${expandedIndex === index ? ' expanded' : ''}`}>
                  <span>{projet.description}</span>
                </section>
              </div>
              <hr className='ligne' style={{ marginTop: '20px', marginBottom: '20px' }} />
            </div>
          ))}
        </div>
        <div className='pagination'>
          <button onClick={prevPage} disabled={currentPage === 0}><FcPrevious /></button>
          <span>{currentPage + 1} / {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages - 1}><FcNext /></button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Projets;
