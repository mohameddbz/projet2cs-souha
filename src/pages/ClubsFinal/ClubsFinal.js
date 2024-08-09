import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import cn from "classnames";
import styles from "./ClubsFinal.module.scss";
import Chatbot from "../../components/chatbot/Chatbot";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import axios from 'axios';

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function ClubsFinal(props) {
  const [clubs, setClubs] = useState([]);
  const [clubEvents, setClubEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [clickedSubtitle, setClickedSubtitle] = useState(null);

  const loadDataInfo = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/clubs`);
      setClubs(res.data);

      // Set default selected club to the first one
      if (res.data.length > 0) {
        const firstClubId = res.data[0].id_club;
        setClickedSubtitle(firstClubId);
        loadClubEventInfo(firstClubId);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(true);
      setLoading(false);
    }
  };

  const loadClubEventInfo = async (clubId) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/events/club/${clubId}/`);
      setClubEvents(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDataInfo();
  }, []);

  const handleSubtitleClick = (clubId) => {
    if (clubId === clickedSubtitle) {
      setClickedSubtitle(null); // If clicked again, reset to null
      setClubEvents([]);
    } else {
      setClickedSubtitle(clubId);
      loadClubEventInfo(clubId);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

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
                <img className={styles.logoClub} src={`${process.env.REACT_APP_API_URL}${selectedClub.logo}`} alt={selectedClub.nom}/> 
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
                  <img src={`${process.env.REACT_APP_API_URL}${event.image}`} alt="" className={styles.ImgClubEvent}></img>
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
