import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import cn from "classnames";
import styles from "./DetailsPgme.module.scss"
import Chatbot from "../../components/chatbot/Chatbot";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import Select from 'react-select';





function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function ModuleComponent(props) {
 
    const styleSelect = {
        Input: () => ({
            font:'400 14px/1.42 "Poppins", Helvetica, Arial, serif',
            
          }),
        indicatorSeparator: () => ({
            display: 'none',
          }),

        control: base => ({
          ...base,

width: '350px',
height: '36px',

background:'#FFFFFF',
border: '1px solid #007BFF',
borderRadius: '4px',
outline:'none',
font:'400 16px/1.42 "Segoe UI", Helvetica, Arial, serif',



        })
      };

  return (
    <div className={styles.moduleComponentContainer}>
      <h2 className={styles.title2}>AL</h2>
      <h2 className={styles.title2}>SIT/ SIL</h2>
      <h2 className={styles.title2}>ArchitecturesLogicielles</h2>
      <h2 className={styles.title2}>Ingénierie du Logiciel</h2>
      <h2 className={styles.title2}>4</h2>
      <h2 className={styles.title2}>4</h2>
      <h2 className={styles.title2}>30</h2>
      <h2 className={styles.title2}>30</h2>
      <h2 className={styles.title2}>30</h2>
    </div>
  );
}

ModuleComponent.propTypes = {
  className: PropTypes.string,
};

export default ModuleComponent;
