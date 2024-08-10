import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import countryList from "react-select-country-list";
import styles from "./DemandePartenariatFinale.module.scss";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from 'react-router-dom';

function FormPartenariat(props) {

  const defaultCountryCode = "DZ"; // Algeria country code
  const [country, setCountry] = useState(defaultCountryCode);
  const countryOptions = useMemo(() => countryList().getData(), []);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [profession, setProfession] = useState("");
  const [organisme, setOrganisme] = useState("");
  const [tailleOrganisme, setTailleOrganisme] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
  };

  const navigate = useNavigate();

  const handleButtonClick = async () => {
    const formData = {
      email,
      prenom,
      nom,
      profession,
      country,
      phoneNumber,
      organisme,
      tailleOrganisme,
      websiteUrl,
    };

    try {
      console.log(formData)
      const response = await fetch(`${process.envREACT_APP_API_URL}/demande_partenariat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Navigate to the success page or show success message
        navigate('/DemandeEnregistree');
      } else {
        console.error('Error submitting the form');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
          <input
            className={styles.transparentInput}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
              <input
                className={styles.transparentInput}
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
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
              <input
                className={styles.transparentInput}
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
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
              <input
                className={styles.transparentInput}
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
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
              <input
                className={styles.transparentInput}
                type="text"
                value={organisme}
                onChange={(e) => setOrganisme(e.target.value)}
              />
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
              <input
                className={styles.transparentInput}
                type="text"
                value={tailleOrganisme}
                onChange={(e) => setTailleOrganisme(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.text21_box5}>
          <span className={styles.text21}>
            <span className={styles.text21_span0}>URL du site web </span>
          </span>
        </div>

        <div className={styles.rect15}>
          <input
            className={styles.transparentInput}
            type="text"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.cover1} onClick={handleButtonClick}>
            Soumettre
          </button>
        </div>
      </div>
    </div>
  );
}

FormPartenariat.propTypes = {
  className: PropTypes.string,
};

export default FormPartenariat;
