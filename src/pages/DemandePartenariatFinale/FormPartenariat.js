import React, { useState, useNavigate, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import countryList from "react-select-country-list";
import styles from "./DemandePartenariatFinale.module.scss";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link } from 'react-router-dom';

function FormPartenariat(props) {
  
    const defaultCountryCode = "DZ"; // Algeria country code
  const [country, setCountry] = useState(defaultCountryCode);
  const countryOptions = useMemo(() => countryList().getData(), []);

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
  };

  const [tailleValue, setTailleValue] = useState("");

  const handleTailleChange = (event) => {
    setTailleValue(event.target.value);
  };
  const tailleOptions = [
    { label: "Moins de 10 personnes", value: "Moins de 10 personnes" },
    { label: "10 à 50 personnes", value: "10 à 50 personnes" },
    { label: "50 à 100 personnes", value: "50 à 100 personnes" },
    { label: "Plus de 100 personnes", value: "Plus de 100 personnes" },
  ];

  const handleButtonClick = () => {
    
  };


  return (
    <div className={styles.rect13}>
    <div className={styles.rect14}>
        <h4 className={styles.highlight4}>Rejoignez-nous</h4>
        <div className={styles.text21_box}>
            <span className={styles.text21}>
              <span className={styles.text21_span0}>Email Professionnel </span>
              <span className={styles.text21_span1}>*</span>
            </span>
        </div>
        <div className={styles.rect15}>
           <input className={styles.transparentInput} type="text" />
        </div>
        <div className={styles.inputRow}>
            <div className={styles.inputCol}>
            <div className={styles.text21_box1}>
              <span className={styles.text21}>
              <span className={styles.text21_span0}>Prenom </span>
              <span className={styles.text21_span1}>*</span>
              </span>
             </div>
             <div className={styles.rect16}>
                <input className={styles.transparentInput} type="text" />
             </div>
            </div>
            
            
            <div className={styles.inputCol}>
            <div className={styles.text21_box1}>
              <span className={styles.text21}>
              <span className={styles.text21_span0}>Nom </span>
              <span className={styles.text21_span1}>*</span>
              </span>
             </div>
             <div className={styles.rect16}>
                <input className={styles.transparentInput} type="text" />
             </div>
            </div>

        </div>


        <div className={styles.inputRow}>
            <div className={styles.inputCol}>
            <div className={styles.text21_box1}>
              <span className={styles.text21}>
              <span className={styles.text21_span0}>Profession </span>
              <span className={styles.text21_span1}>*</span>
              </span>
             </div>
             <div className={styles.rect16}>
                <input className={styles.transparentInput} type="text" />
             </div>
            </div>

            <div className={styles.inputCol}>
            <div className={styles.text21_box1}>
              <span className={styles.text21}>
              <span className={styles.text21_span0}>Pays </span>
              <span className={styles.text21_span1}>*</span>
              </span>
             </div>

             <div className={styles.rect165}>
            <select
              className={styles.countrySelector}
              onChange={handleCountryChange}
              value={country}
            >
              {countryOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
            </div>
        </div>

        <div className={styles.text21_box5}>
            <span className={styles.text21}>
              <span className={styles.text21_span0}>Numero de telephone </span>
              <span className={styles.text21_span1}>*</span>
            </span>
        </div>

        <PhoneInput
            placeholder="Entrez votre numero"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className={`${styles.transparentInput} ${styles.rect151}`}
          />

          <div className={styles.inputRow}>
            <div className={styles.inputCol}>
            <div className={styles.text21_box5}>
              <span className={styles.text21}>
              <span className={styles.text21_span0}>Nom de l'organisme </span>
              <span className={styles.text21_span1}>*</span>
              </span>
             </div>
             <div className={styles.rect16}>
                <input className={styles.transparentInput} type="text" />
             </div>
            </div>
                 
           <div className={styles.inputCol}>
            <div className={styles.text21_box5}>
              <span className={styles.text21}>
              <span className={styles.text21_span0}>Taille de l'organisme </span>
              <span className={styles.text21_span1}>*</span>
              </span>
             </div>
             <div className={styles.rect16}>
                <input className={styles.transparentInput} type="text" />
             </div>
            </div>
        </div>

        <div className={styles.text21_box5}>
              <span className={styles.text21}>
              <span className={styles.text21_span0}>URL du site web </span>
              </span>
        </div>

        <div className={styles.rect15}>
           <input className={styles.transparentInput} type="text" />
        </div>

       <div className={styles.buttonContainer}>
        <Link to="/DemandeEnregistree">
        <button className={styles.cover1} onClick={handleButtonClick}>
         Soumettre
        </button>
        </Link>
       </div>


    </div>
    </div>
  );
}

FormPartenariat.propTypes = {
  className: PropTypes.string,
};

export default FormPartenariat;
