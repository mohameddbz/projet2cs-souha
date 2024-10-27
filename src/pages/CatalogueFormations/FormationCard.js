import React, { useState } from 'react';

import PropTypes from 'prop-types';
import StarRatingComponent from "react-star-rating-component";
import { useNavigate } from 'react-router-dom'; // Remplacement par useNavigate
import styles from './index.module.scss';

function FormationCard({ nomFormation, formationId }) {
  const [rating, setRating] = useState(1); // Initial rating state
  const navigate = useNavigate(); // Utilisation de useNavigate

  // Function to handle rating change
  const onStarClick = (nextValue) => {
    setRating(nextValue); // Update rating state
  };

  // Function to handle card click and navigate to details page
  const handleCardClick = () => {
    navigate(`/DetailFormation/${formationId}`); // Redirection vers la page des détails avec l'ID
  };

  return (
    <div className={styles.rect12} onClick={handleCardClick}> {/* Ajout de l'événement onClick */}
      <img className={styles.image3} src={'/assets/b687d54b811173b5ed4439a14e015bdc.png'} alt="alt text" />
      <div className={styles.text2}>{nomFormation}</div> {/* Utilisation de nomFormation */}
      <div className={styles.info12}>Mode Projet</div>
      <div className={styles.infoCertif}>Certifiée</div>
      <div className={styles.ratingContainer}>
        <div className={styles.info4}>5.0</div>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={onStarClick}
          starColor="#F59E0B"
        />
      </div>
    </div>
  );
}

FormationCard.propTypes = {
  nomFormation: PropTypes.string.isRequired,
  formationId: PropTypes.number.isRequired, // Ajout du prop pour l'ID de la formation
};

export default FormationCard;
