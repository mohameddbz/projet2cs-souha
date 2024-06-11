import React, { useState, useNavigate, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import countryList from "react-select-country-list";
import styles from "./DemandePartenariatFinale.module.scss";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";


function CardPartenariat(props) {
   


  return (
    <div className={styles.cardRow}>

    <div className={styles.extraMargin}>
    <div className={`${styles.box2}`}>
    <div className={styles.rect10}>
      <h4 className={styles.highlight11}>Accessibilité et Transparence Renforcées</h4>
    </div>
    <h5 className={styles.highlight21}>Accédez instantanément à notre gamme complète de formations continues
       grâce à une consultation en ligne des catalogues.</h5>
    </div>
    </div>

    <div className={styles.box2}>
    <div className={styles.rect10}>
      <h4 className={styles.highlight11}>Flexibilité et Engagement Améliorés</h4>
    </div>
    <h5 className={styles.highlight21}>Profitez d'une expérience de formation sur mesure avec la possibilité de suivre les sessions en cours à distance. Accédez aux ressources pédagogiques en ligne et aux documents administratifs à tout moment</h5>
  </div>
  <div className={styles.extraMargin}>
  <div className={`${styles.box2}`}>
    <div className={styles.rect10}>
      <h4 className={styles.highlight11}>Simulation des devis</h4>
    </div>
    <h5 className={styles.highlight21}>Personnalisez votre experience et simplifiez vos demandes de devis et
       simulez les coûts en quelques clics avec notre simulateur de devis !</h5>
  </div>
  </div>


  </div>
  );
}

CardPartenariat.propTypes = {
    
};

export default CardPartenariat;
