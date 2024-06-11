import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import cn from "classnames";
import styles from "./ClubsFinal.module.scss"
import Chatbot from "../../components/chatbot/Chatbot";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import { Slide } from '@mui/material';

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function ClubsFinal(props) {
    const clubSubtitles = [
        "Google Developer Groups",
        "Shellmates club",
        "Women Techmakers Algiers",
        "Club Etudiants ETIC",
        "Club scientifique de l'ESI",
        "Sourire à l'innocence",
        "Club Artistique Et Culturel",
        "Sport and entraitainement"
      ];
    
      const [clickedSubtitle, setClickedSubtitle] = useState(clubSubtitles[0]);

  const handleSubtitleClick = (subtitle) => {
    if (subtitle === clickedSubtitle) {
      setClickedSubtitle(null); // If clicked again, reset to null
    } else {
      setClickedSubtitle(subtitle);
    }
  };

  return (
    <div>
      <Navbar/>
       <Chatbot/>
      <div className={styles.ClubsFinalContainer}>
        <div className={styles.highlightContainer}>
        <h2 className={styles.subtitle2_box}>
          <span className={styles.subtitle2}>
            <span className={styles.subtitle2_span1}>S'impliquer dans  {" "}</span>
            <span className={styles.subtitle2_span0}>
              les clubs etudiants
            </span>
          </span>
        </h2>
        <h3 className={styles.descContainer}>
        À ESI, vous avez de nombreuses opportunités de vous impliquer et d'être actif dans la vie sur le campus. L'engagement des étudiants souhaite que vous viviez pleinement l'expérience collégiale en profitant des événements et des activités tout au long de l'année, et nous rendons cela aussi facile que possible.
        </h3>
        </div>
        <br></br><br></br><br></br><br></br>


        <div className={styles.bigTextContainer}>
            <div className={styles.clubListContainer}>
                <h3 className={styles.clubTitle}>Les clubs scientifiques</h3>
                {clubSubtitles.map((subtitle, index) => (
              <h4
                key={index}
                className={`${styles.clubSubtitle} ${clickedSubtitle === subtitle ? styles.clickedSubtitle : ""}`}
                onClick={() => handleSubtitleClick(subtitle)}
              >
                {subtitle}
              </h4>
            ))}
            </div>
            <img className={styles.lineClub} src={'/assets/lineClub.svg'} alt="alt text" />
            <div className={styles.clubDescContainer}>
                <h3 className={styles.clubSubtitle2}>School Of Ai Club</h3>
                <h4 className={styles.clubSubtitle3}>Intelligence artificielle   2019</h4>
                <h5 className={styles.descClub}>À ESI, vous avez de nombreuses opportunités de vous impliquer et d'être actif dans la vie sur le campus. L'engagement des étudiants souhaite que vous viviez pleinement l'expérience collégiale en profitant des événements et des activités tout au long de l'année, et nous rendons cela aussi facile que possible.</h5>
                <h5 className={styles.subtitle3_box}>
              <span className={styles.subtitle3}>
            <span className={styles.subtitle3_span1}>President :  {" "}</span>
            <span className={styles.subtitle3_span0}>
              Nassim Ihab AOUADJ
            </span>
             </span>
           </h5>

           <h5 className={styles.subtitle3_box}>
              <span className={styles.subtitle3}>
            <span className={styles.subtitle3_span1}>Evenements majeurs :  {" "}</span>
            <span className={styles.subtitle3_span0}>
            AI2E / HAIck Algieria
            </span>
             </span>
           </h5>
           <div className={styles.iconsRow}>
            <Link to="LinkedInPage">
            <img className={styles.icon} src={'/assets/xIcon.svg'} alt="alt text" /></Link>
           <img className={styles.icon} src={'/assets/fbIcon.svg'} alt="alt text" />
           <img className={styles.icon} src={'/assets/instaIcon.svg'} alt="alt text" />
           <img className={styles.icon} src={'/assets/linkedinIcon.svg'} alt="alt text" />
           <img className={styles.icon} src={'/assets/ytbIcon.svg'} alt="alt text" />
           </div>
            </div>
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

ClubsFinal.propTypes = {
  className: PropTypes.string,
};

export default ClubsFinal;
