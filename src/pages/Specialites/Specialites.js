import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import cn from "classnames";
import styles from "./Specialites.module.scss"
import Chatbot from "../../components/chatbot/Chatbot";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import Select from 'react-select';
import SpecCard from "./SpecCard";


function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function Specialites(props) {
 
   

  return (
    <div>
      <Navbar/>
       <Chatbot/>
      <div className={styles.SpecialitesContainer}>

      <img className={styles.esiFinalCover} src={'/assets/esiFinalCover.svg'} alt="alt text" />
      <div className={styles.coverTextContainer}>
      <h1 className={styles.Title1}>Explorez nos Spécialités d'Ingénierie en 4ème et 5ème Année</h1>
      <h2 className={styles.Title2}>Plongez dans notre gamme de spécialisations pour le cycle ingénieur, offrant deux années dédiées à l'expertise. Choisissez parmi quatre options captivantes : Systèmes d’Information et Technologie (SIT), Systèmes Informatiques (SIQ), Systèmes et Ingénierie du Logiciel (SIL), et Systèmes Intelligents et Données (SID).</h2>

      </div>

      <SpecCard Image={'/assets/sit.jpeg'} Spec={'Systèmes d’Information et Technologies'}/>
      <SpecCard Image={'/assets/sit.jpeg'} Spec={'Systèmes Informatiques et Logiciel'}/>
      <SpecCard Image={'/assets/sit.jpeg'} Spec={'Systèmes Intelligents de donees'}/>
      <SpecCard Image={'/assets/sit.jpeg'} Spec={'Systèmes Informatiques'}/>

        
      </div>
      <Footer/>
    </div>
  );
}

Specialites.propTypes = {
  className: PropTypes.string,
};

export default Specialites;
