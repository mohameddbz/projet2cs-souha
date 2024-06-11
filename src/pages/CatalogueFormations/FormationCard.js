import React ,{useState} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Select from 'react-select';
import StarRatingComponent from "react-star-rating-component";


import styles from './index.module.scss';
function FormationCard(props) {

    const [rating, setRating] = useState(1); // Initial rating state

    // Function to handle rating change
    const onStarClick = (nextValue) => {
      setRating(nextValue); // Update rating state
    };

  return (
    <div className={styles.rect12}>
      <img className={styles.image3} src={'/assets/b687d54b811173b5ed4439a14e015bdc.png'} alt="alt text" />
      <div className={styles.text2}>Formation Mobile</div>
      <div className={styles.info12}>Mode Projet</div>
      <div className={styles.infoCertif}>Certifiée</div>
      <div className={styles.ratingContainer}>
            <div className={styles.info4}>5.0</div>
            <StarRatingComponent
              name="rate1" /* Unique name for the rating component */
              starCount={5} /* Total number of stars */
              value={rating} /* Current rating value */
              onStarClick={onStarClick} /* Function to handle rating change */
              starColor="#F59E0B"
            />
      </div>
    </div>
  );
}

FormationCard.propTypes = {
  className: PropTypes.string
};

export default FormationCard;
