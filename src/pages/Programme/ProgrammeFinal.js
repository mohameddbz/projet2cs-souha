import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import cn from "classnames";
import styles from "./ProgrammeFinal.module.scss"
import Chatbot from "../../components/chatbot/Chatbot";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import Select from 'react-select';
import PgmeCard from "./pgmeCard";


const optionCycle = [
    { value: 'Prepa', label: 'Cycle Preparatoire' },
    { value: 'Sup', label: 'Cycle Superieur' },
  ];

  const optionAnnee = [
    { value: '1', label: '1CP' },
    { value: '2', label: '2CP' },
    { value: '3', label: '1CS' },
    { value: '4', label: '2CS' },
    { value: '5', label: '3CS' },
  ];



function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function ProgrammeFinal(props) {
 
    const styleSelect = {
        Input: () => ({
            font:'400 14px/1.42 "Poppins", Helvetica, Arial, serif',
            
          }),
        indicatorSeparator: () => ({
            display: 'none',
          }),

        control: base => ({
          ...base,

width: '400px',
height: '36px',

background:'#FFFFFF',
border: '1px solid #007BFF',
borderRadius: '4px',
outline:'none',
font:'400 16px/1.42 "Segoe UI", Helvetica, Arial, serif',



        })
      };

  return (
    <div>
      <Navbar/>
       <Chatbot/>
      <div className={styles.ProgrammeFinalContainer}>
       <img className={styles.pgmeDesc} src={'/assets/pgmeDesc.svg'} alt="alt text" />
       <div className={styles.blueContainer}>
       <Select
        options={optionCycle}
        styles={styleSelect}
        placeholder="Cycle"

         />

       <Select
        options={optionAnnee}
        styles={styleSelect}
        placeholder="Année"

         />

         <div  className={styles.inputsearch}> 
         <input className={styles.transparentInput} placeholder="Search..">
         </input>
         <img className={styles.searchPgme} src="/assets/searchPgme.svg" alt="search" /> 
         </div>      
       </div>

       <div className={styles.prepaContainer}>
            <PgmeCard title="Cycle Preparatoire"/>
            <img className={styles.prepaDesc2} src={'/assets/prepaDesc2.svg'} alt="alt text" />
         </div>

         <div className={styles.secondContainer}>
            <PgmeCard title="Second Cycle"/>
            <img className={styles.secondCylceDesc} src={'/assets/secondCylceDesc.svg'} alt="alt text" />
         </div>

         <div className={styles.thirdContainer}>
            <PgmeCard title="Troisieme Cycle"/>
            <img className={styles.thirdCycleDesc} src={'/assets/thirdCycleDesc.svg'} alt="alt text" />
         </div>
        <img src='/assets/linePgme.svg' className={styles.linePgme} />
        <img className={styles.pgmeCard2} src='/assets/pgmeCard2.svg' alt="pgmeCard2" />
        
      </div>
      <Footer/>
    </div>
  );
}

ProgrammeFinal.propTypes = {
  className: PropTypes.string,
};

export default ProgrammeFinal;
