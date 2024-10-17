import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import cn from "classnames";
import styles from "./ClubsFinal.module.scss";
import Chatbot from "../../components/chatbot/Chatbot";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";

function ScrollToTop() {
  useState(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function ClubsFinal(props) {
  const [clickedSubtitle, setClickedSubtitle] = useState(null);

  // Static data
  const clubs = [
    {
      id_club: 1,
      nom: "Club de Robotique",
      slogan: "Innovons ensemble",
      description: "Le club de robotique propose des ateliers et des projets en robotique pour les passionnés de technologie.",
      president: "Jean Dupont",
      logo: "https://via.placeholder.com/150" // Static image
    },
    {
      id_club: 2,
      nom: "Club Informatique",
      slogan: "Codons le futur",
      description: "Le club informatique organise des événements sur la programmation et le développement logiciel.",
      president: "Marie Curie",
      logo: "https://via.placeholder.com/150" // Static image
    }
  ];

  const clubEvents = [
    {
      id: 1,
      titre: "Hackathon",
      description: "Participez au Hackathon pour résoudre des défis technologiques.",
      image: "https://via.placeholder.com/150", // Static image
      link: "#"
    },
    {
      id: 2,
      titre: "Atelier Python",
      description: "Apprenez à coder en Python lors de cet atelier.",
      image: "https://via.placeholder.com/150", // Static image
      link: "#"
    }
  ];

  const handleSubtitleClick = (clubId) => {
    if (clubId === clickedSubtitle) {
      setClickedSubtitle(null); // If clicked again, reset to null
    } else {
      setClickedSubtitle(clubId);
    }
  };

  const selectedClub = clubs.find(club => club.id_club === clickedSubtitle);

  return (
    <div>
      <Navbar />
      <Chatbot />
      <div className={styles.ClubsFinalContainer}>
        <div className={styles.highlightContainer}>
          <h2 className={styles.subtitle2_box}>
            <span className={styles.subtitle2}>
              <span className={styles.subtitle2_span1}>S'impliquer dans {" "}</span>
              <span className={styles.subtitle2_span0}>les clubs étudiants</span>
            </span>
          </h2>
          <h3 className={styles.descContainer}>
            À ESI, vous avez de nombreuses opportunités de vous impliquer et d'être actif dans la vie sur le campus. L'engagement des étudiants souhaite que vous viviez pleinement l'expérience collégiale en profitant des événements et des activités tout au long de l'année, et nous rendons cela aussi facile que possible.
          </h3>
        </div>
        <br /><br /><br /><br />

        <div className={styles.contentContainer}>
          <div className={styles.clubListContainer}>
            <h3 className={styles.clubTitle}>Les clubs scientifiques</h3>
            {clubs.map((club, index) => (
              <div key={index} onClick={() => handleSubtitleClick(club.id_club)}>
                <h4
                  className={cn(styles.clubSubtitle, { [styles.clickedSubtitle]: clickedSubtitle === club.id_club })}
                >
                  {club.nom}
                </h4>
              </div>
            ))}
          </div>

          <img className={styles.lineClub} src={'/assets/lineClub.svg'} alt="alt text" />

          <div className={styles.clubDetailContainer}>
            {selectedClub ? (
              <div>
                <img className={styles.logoClub} src={selectedClub.logo} alt={selectedClub.nom} /> 
                <h3 className={styles.clubSubtitle2}>{selectedClub.nom}</h3>
                <h4 className={styles.clubSubtitle3}>{selectedClub.slogan}</h4>
                <p className={styles.descClub}>{selectedClub.description}</p>
                <h5 className={styles.subtitle3_box}>
                  <span className={styles.subtitle3}>
                    <span className={styles.subtitle3_span1}>President : {" "}</span>
                    <span className={styles.subtitle3_span0}>{selectedClub.president}</span>
                  </span>
                </h5>
              </div>
            ) : (
              <div>Select a club to see the details</div>
            )}
          </div>
        </div>

        <div className={styles.blueCardContainer}>
          {clubEvents.length > 0 ? (
            clubEvents.map(event => (
              <div className={styles.blueCard} key={event.id}>
                <div className={styles.imageClubEvent}>
                  <img src={event.image} alt="" className={styles.ImgClubEvent} />
                </div>
                <div className={styles.detailClubEvent}>
                  <div className={styles.titleClubEvent}>Rejoignez aujourd'hui l'événement de <span className={styles.spanClubEvent}>{event.titre}</span> </div>
                  <div className={styles.paragClubEvent}>{event.description}</div>
                  <div className={styles.btnClubEvent}><Link to={event.link} className={styles.linkClubEvent}>S'inscrire</Link></div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noEvents}>No upcoming events</div>
          )}
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

ClubsFinal.propTypes = {
  classes: PropTypes.object,
};

export default ClubsFinal;
