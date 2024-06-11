import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import cn from "classnames";
import styles from "./Clubs.module.scss"
import Chatbot from "../../components/chatbot/Chatbot";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import { Slide } from '@mui/material';
import CarouselClub from "./CarouselClub";

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function Clubs(props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Navbar/>
       <Chatbot/>
      <div className={styles.clubsContainer}>
        <div className={styles.highlightContainer}>
        <h2 className={styles.subtitle2_box}>
          <span className={styles.subtitle2}>
            <span className={styles.subtitle2_span1}>Decouvrir les {" "}</span>
            <span className={styles.subtitle2_span0}>
              Clubs Estudiantins
            </span>
          </span>
        </h2>
        <h3 className={styles.descContainer}>
        Unis dans la diversité, nous cultivons l'excellence et l'innovation. Ensemble, nous façonnons l'avenir au sein de nos clubs étudiants.
        </h3>
        </div>
        <div className={styles.centeredCarousel}>
        <CarouselClub/>
        </div> 
        <div className={styles.prqTextContainer}>
        <img className={styles.prqClub} src={'/assets/prqClub.svg'} alt="alt text" />
        </div>
       

       <div className={styles.cardPrqContainer}>
       <img className={styles.cardPrq} src={'/assets/cardprq1.svg'} alt="alt text" />
       <img className={styles.cardPrq} src={'/assets/cardprq2.svg'} alt="alt text" />
       <img className={styles.cardPrq} src={'/assets/cardprq3.svg'} alt="alt text" />
       <img className={styles.cardPrq} src={'/assets/cardprq3.svg'} alt="alt text" />
        </div>

        <div className={styles.blueContainer}>
        <div className={styles.bleuImgContainer}>
        <img className={styles.bleuImg} src={'/assets/bleuImg.svg'} alt="alt text" />
        <img className={styles.textbleuImg} src={'/assets/textbleuImg.svg'} alt="alt text" />
        
        </div>
        <button className={styles.bleuButton}>
            S'inscrire
        </button>
        </div>
        
      
      

      </div>
      <Footer/>
    </div>
  );
}

Clubs.propTypes = {
  className: PropTypes.string,
};

export default Clubs;
