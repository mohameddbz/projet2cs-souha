import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Select from 'react-select';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import styles from './index.module.scss';
import FormationCard from './FormationCard';
import Chatbot from "../../components/chatbot/Chatbot";

const optionsType = [
  { value: 'Avant Promotion', label: 'Avant Promotion' },
  { value: 'A La Carte', label: 'A La Carte' },
];

const optionsMode = [
  { value: 'presentiel', label: 'Présentiel' },
  { value: 'en_ligne', label: 'En ligne' },
  { value: 'hybride', label: 'Hybride' },
];

const optionsDuree = [
  { value: '1', label: '20 heures' },
  { value: '2', label: '60 heures' },
  { value: '3', label: '150 heures' },
  { value: '4', label: '250 heures' },
  { value: '4', label: 'plus de 250 heures' },
];

const optionsNiveau = [
  { value: 'debutant', label: 'Débutant' },
  { value: 'intermediaire', label: 'Intermédiaire' },
  { value: 'avance', label: 'Avancé' },
];

const optionsLangue = [
  { value: 'francais', label: 'Français' },
  { value: 'anglais', label: 'Anglais' },
  { value: 'arabe', label: 'Arabe' },
];
function CatalogueFormation(props) {
  const [formations, setFormations] = useState([]); 

  // Fetch formations from the backend using Axios
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/themes-formation/`) 
      .then(response => {
        setFormations(response.data); // Set the formations from the API response
      })
      .catch(error => {
        console.error('Error fetching formations:', error);
      });
  }, []);


  const [selectedCertif, setSelectedCertif] = useState(null);

  const handleCertifClick = (option) => {
  setSelectedCertif(selectedCertif === option ? null : option);
  };

   
    const styleSelect = {
        Input: () => ({
            font:'400 14px/1.42 "Poppins", Helvetica, Arial, serif',
          }),
        indicatorSeparator: () => ({
            display: 'none',
          }),

        control: base => ({
          ...base,
          border: 0,
          font:'400 14px/1.42 "Poppins", Helvetica, Arial, serif',
          borderRadius:"18px",
          boxShadow: 'none',
          outline: "1px solid rgb(229, 231, 235)",
          filter: "drop-shadow(0px 1px 8px rgba(31, 41, 55, 0.078))",
          outlineOffset:"-1px",
          width: "140px",
          height: "36px",
          marginRight: "20px"


        })
      };
  return (
    <div style={{maxWidth:'100%'}}>
      <Navbar />
      <Chatbot />
      <div className={cn(styles.root, props.className, 'cf')}>
        {/* <div className={styles.filterSearch}>
          
      <div className={styles.box6} >
        <div className={styles.searchIcon}>
     
      <img className={styles.image211} src={'/assets/2a63cc849a1e4df7c901fc115bc0f1f5.png'} alt="alt text" />
      <img className={styles.image1311} src={'/assets/b5625f3b5c6851244774194e3b2055a9.png'} alt="alt text" />
        </div>

        <input className={styles.transparentInput} type="text" placeholder="Rechercher" />
      </div>
       
     
        <Select
        options={optionsType}
        styles={styleSelect}
        placeholder="Type"

         />

        <Select
        options={optionsDuree}
        styles={styleSelect}
        placeholder="Duree"

         />

        <Select
        options={optionsMode}
        styles={styleSelect}
        placeholder="Mode"

         />

       <Select
        options={optionsLangue}
        styles={styleSelect}
        placeholder="Langue"

         />


        <Select
        options={optionsNiveau}
        styles={styleSelect}
        placeholder="Niveau"

         />

      <button onClick={() => handleCertifClick('selected')} 
      className={selectedCertif === 'selected' ? ` ${styles.boxSelected}` : styles.box}>
        <div className={selectedCertif === 'selected' ? ` ${styles.text31Selected}` : styles.text31}>Certifiante</div>
      </button>

      </div>


        <div className={styles.sectionContainer}>
          <h3 className={styles.subtitle}>Formations A La Carte</h3>
          <div className={styles.cardsContainer}>
            {formations.length > 0 ? (
              formations.map((formation) => (
                <FormationCard key={formation.id} nomFormation={formation.titre } />
              ))
            ) : (
              <p>Aucune formation disponible</p>
            )}
          </div>
          <button className={styles.imageButton}>
            Voir plus
          </button>
        </div> */}
      </div>
      <Footer />
    </div>
  );
}

CatalogueFormation.propTypes = {
  className: PropTypes.string
};

export default CatalogueFormation;
