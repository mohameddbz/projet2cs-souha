import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import cn from "classnames";
import styles from "./SuccessStories.module.scss"
import Chatbot from "../../components/chatbot/Chatbot";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import ArticleCard from "./articleCard";
import CarouselAlumni from "./CarouselAlumni";
import MapComponent from "./MapComponent";

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function SuccessStories(props) {
 

  const [showMoreAlumniContacts, setShowMoreAlumniContacts] = useState(false);

  const handleVoirPlusClick = () => {
    setShowMoreAlumniContacts(!showMoreAlumniContacts);
  };

  return (
    <div>
      <Navbar/>
       <Chatbot/>
      <div className={styles.SuccessStoriesContainer}>
        <img className={styles.alumniImg} src={'/assets/alumniImg.svg'} alt="alt text" />
        <div className={styles.alumniDescContainer}>
            <img className={styles.alumniDesc} src={'/assets/alumniDesc.svg'} alt="alt text" />
        </div>
        
        <div className={styles.centeredContainer}>
        <h2 className={styles.Title1}>Alumni episodes</h2>
        <iframe className={styles.videoFrame} width="560" height="315" src="https://www.youtube.com/embed/wv_lnc3wBJM?si=i0H14c_zm7sQsR3j" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3 className={styles.subtitle1}>Alumni Episode présente des interviews captivantes avec les anciens élèves de l'ESI, mettant en lumière leurs parcours professionnels inspirants et leurs conseils précieux pour les étudiants actuels.</h3>
        <h2 className={styles.Title1}>Alumni article</h2>
        <h3 className={styles.subtitle1}>Découvrez les récits inspirants et les succès professionnels de nos anciens élèves à travers nos articles Alumni..</h3>
        
        {/* <div className={styles.subtitle2}>Promo
        <div className={styles.sliderContainer}>
            <img className={styles.rightArrow} src={'/assets/rightArrow.svg'} alt="alt text" />
            <div className={styles.subtitle3}>2014</div>
            <img className={styles.nextArrow} src={'/assets/nextArrow.svg'} alt="alt text" />
            
        </div>
        </div> */}

        </div>
        
        <CarouselAlumni/>
        <br></br><br></br><br></br><br></br><br></br><br></br>
        <div className={styles.centeredContainer}>
            <img className={styles.ouSont} src={'/assets/ouSont.svg'} alt="alt text" />
            <div className={styles.carteContainer}>
                <img className={styles.blueRect} src={'/assets/blueRect.svg'} alt="alt text" />
                <MapComponent/>
            </div>
            <img className={styles.alumniContactTitle} src={'/assets/alumniContactTitle.svg'} alt="alt text" />
            <img className={styles.alumniContact} src={'/assets/alumniContact.svg'} alt="alt text" />
            {showMoreAlumniContacts && (
            <div className={cn(styles.centeredContainer, styles.transitionMaker)}>
            
            <img className={styles.alumniContact} src={'/assets/alumniContact.svg'} alt="alt text" />
            <img className={styles.alumniContact} src={'/assets/alumniContact.svg'} alt="alt text" />
          </div>
        )}
            <button className={styles.VoirPlusButton} onClick={handleVoirPlusClick}>
            {showMoreAlumniContacts ? "Voir Moins" : "Voir Plus"}
          </button>


        </div>
        
      </div>
      <Footer/>
    </div>
  );
}

SuccessStories.propTypes = {
  className: PropTypes.string,
};

export default SuccessStories;
