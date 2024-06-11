import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import cn from "classnames";
import styles from "./Specialites.module.scss"
import Chatbot from "../../components/chatbot/Chatbot";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import Select from 'react-select';



function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function SpecCard({Image,Spec}) {
 
   

  return (
    <div className={styles.specCardContainer}>
        <div>
        <h1 className={styles.specCardTitle}>{Spec}</h1>
      <h2 className={styles.specCardDesc}>La formation en ingénierie informatique proposée forme des ingénieurs généralistes spécialisés dans les systèmes informatiques. Elle couvre un large éventail de connaissances, notamment les systèmes, les réseaux, la sécurité, l'informatique distribuée et les systèmes embarqués.

Les étudiants acquièrent des compétences dans des domaines variés tels que le développement logiciel, les systèmes et réseaux.</h2>
        </div>
     
     <img className={styles.specCardImage} src={Image} alt="alt text" />
    </div>
  );
}

SpecCard.propTypes = {
  className: PropTypes.string,
};

export default SpecCard;
