import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import cn from "classnames";
import styles from "./Contact.module.scss"
import Chatbot from "../../components/chatbot/Chatbot";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import MapComponent from "./MapComponent";

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function Contact(props) {
 

  return (
    <div>
      <Navbar/>
       <Chatbot/>
      <div className={styles.ContactContainer}>
        <div className={styles.Container1}>
            <h1 className={styles.title1}>Comment nous trouver ?</h1>
            <MapComponent/>
            <img className={styles.contactRelex} src={'/assets/contactRelex.svg'} alt="alt text" />
        </div>
        <div className={styles.Container2}>
        <h1 className={styles.title1}>CONTACTEZ-NOUS</h1>
        <h3 className={styles.subtitle}>Vous avez des questions sur les études à ESI ? Nous vous invitons à entrer en contact avec notre équipe des formations pour en savoir plus.</h3>
        <div className={styles.formContainer}>
            <div className={styles.nameRow}>
            <input
      type="text"
      placeholder="Nom"
      style={{
        height: '28px',
        width: '70%',
        padding: '10px',
        borderRadius: '5px',
        outline:'none',
        border: '1px solid #ccc',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        fontFamily:'poppins',
        fontSize:'15px',
        marginRight:'10px'
      }}
    />
    <input
      type="text"
      placeholder="Prenom"
      style={{
        height: '28px',
        width: '70%',
        padding: '10px',
        borderRadius: '5px',
        outline:'none',
        border: '1px solid #ccc',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        fontFamily:'poppins',
        fontSize:'15px',
      }}
    />
            </div>
        <input
      type="email"
      placeholder="Email"
      style={{
        height: '28px',
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        outline:'none',
        border: '1px solid #ccc',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        fontFamily:'poppins',
        fontSize:'15px',
      }}
    />

<input
      type="Telephone"
      placeholder="number"
      style={{
        height: '28px',
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        outline:'none',
        border: '1px solid #ccc',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        fontFamily:'poppins',
        fontSize:'15px',
      }}
    />

<textarea
      placeholder="Votre question"
      style={{
        height: '80px',
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        outline:'none',
        border: '1px solid #ccc',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        fontFamily:'poppins',
        fontSize:'15px',
      }}
    />
    <button className={styles.envoiButton}>Envoyer</button>
        </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

Contact.propTypes = {
  className: PropTypes.string,
};

export default Contact;
