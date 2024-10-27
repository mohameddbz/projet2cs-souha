import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import './CatalogueFormation.css'; // Placez les imports de fichiers CSS ici
import FormationCard from './FormationCard';
import FormationFilters from './FormationFilters'; // Importez tout en haut
import ensa from '../../assets/LogoPartenaires/ensa 1.svg'
import entp from '../../assets/LogoPartenaires/entp 1.svg'
import oracle from '../../assets/LogoPartenaires/oracle 1.svg'
import sga from '../../assets/LogoPartenaires/sga 1.svg'
import aalto from '../../assets/LogoPartenaires/aalto univ 1.svg'
import suUTC from '../../assets/LogoPartenaires/SU-UTC18-70 1.svg'
import profile from '../../assets/profilePicture.jfif'
function CatalogueFormation() {
  const [formations, setFormations] = useState([]);
  const [filteredFormations, setFilteredFormations] = useState([]);
  const [visible, setVisible] = useState(4); // Number of visible formations (initially 4)
  const [expanded, setExpanded] = useState(false); // State to control "Voir plus" or "Voir moins"

  const [filters, setFilters] = useState({
    searchTerm: '',
    type: '',
    duree: '',
    mode: '',
    langue: '',
    dateDebut: '',
    certifiante: ''
  });

  // Fetch formations from the backend using Axios
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/themes-formation/`)
      .then((response) => {
        setFormations(response.data);
        setFilteredFormations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching formations:', error);
      });
  }, []);

  // Fonction pour appliquer les filtres
  useEffect(() => {
    const filtered = formations.filter((formation) => {
      return (
        formation.titre.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
    (Array.isArray(formation.cours) 
        ? formation.cours.some(cours => 
            cours.titre.toLowerCase().includes(filters.searchTerm.toLowerCase())
          )
        : typeof formation.cours === 'object' && formation.cours.titre.toLowerCase().includes(filters.searchTerm.toLowerCase())
    ) &&
        (filters.type === '' || formation.type === filters.type) &&
        (filters.duree === '' || formation.duree === filters.duree) &&
        (filters.mode === '' || formation.mode === filters.mode) &&
        (filters.langue === '' || formation.langue === filters.langue) &&
        (filters.dateDebut === '' || formation.dateDebut === filters.dateDebut) &&
        (filters.certifiante === '' || formation.certifiante === filters.certifiante)
      );
    });
    setFilteredFormations(filtered);
  }, [filters, formations]);

  // Fonction pour gérer les changements dans les filtres
  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleToggle = () => {
    if (expanded) {
      setVisible(4); // If "Voir moins" is clicked, show only 4 formations
    } else {
      setVisible(filteredFormations.length); // If "Voir plus" is clicked, show all formations
    }
    setExpanded(!expanded); // Toggle the expanded state
  };

  return (
    <div style={{ maxWidth: '100%' }}>
      <Navbar />
      <div className="sectionContainer" style={{ maxWidth: '100%' }}> {/* Classe existante pour conserver le style */}
        <h3 className="subtitle">Formations A La Carte</h3>

        {/* Barre de recherche et filtres */}
        <FormationFilters onFilterChange={handleFilterChange} />

        {/* Affichage des formations */}
        <div className="cardsContainer"> {/* Conserver les mêmes classes */}
          {filteredFormations.length > 0 ? (
            filteredFormations.map((formation) => (
              <FormationCard key={formation.id} nomFormation={formation.titre} formationId={formation.id} />
            ))
          ) : (
            <p>Aucune formation disponible</p>
          )}
        </div>
        {filteredFormations.length > 0 && (
          <button 
            className='imageButton' 
            onClick={handleToggle}>
            {expanded ? 'Voir moins' : 'Voir plus'}
          </button>
        )}


<div className="partenaires">
            <img src={oracle} alt="oracle" className="svg-icon" />
            <img src={sga} alt="societe generale " className="svg-icon" />
            <img src={aalto} alt="aalto univ" className="svg-icon" />
            <img src={entp} alt="entp" className="svg-icon" />
            <img src={suUTC} alt="SuUTC" className="svg-icon" />
            <img src={ensa} alt="ensa" className="svg-icon" />
          
            {/* Add more <img> tags for additional SVGs */}
        </div>
        <h3 className="subtitle">Voix des Apprenants : Témoignages Inspirants</h3>
        <div class="testimonials">
        <div class="testimonial">
            <blockquote>
                <p>La formation que j'ai suivie ici a été une expérience transformative. Les formateurs étaient exceptionnels, offrant des connaissances approfondies et des conseils pratiques.</p>
            </blockquote>
            <div class="author">
                <img src={profile} alt="Manel M" />
                <p>Manel M</p>
            </div>
        </div>
        <div class="testimonial">
            <blockquote>
                <p>La formation que j'ai suivie ici a été une expérience transformative. Les formateurs étaient exceptionnels, offrant des connaissances approfondies et des conseils pratiques.</p>
            </blockquote>
            <div class="author">
                <img src={profile} alt="Manel M" />
                <p>Manel M</p>
            </div>
        </div>
        <div class="testimonial">
            <blockquote>
                <p>La formation que j'ai suivie ici a été une expérience transformative. Les formateurs étaient exceptionnels, offrant des connaissances approfondies et des conseils pratiques.</p>
            </blockquote>
            <div class="author">
                <img src={profile} alt="Manel M" />
                <p>Manel M</p>
            </div>
        </div>
    </div>
      </div>
      <Footer />
    </div>
  );
}

export default CatalogueFormation;