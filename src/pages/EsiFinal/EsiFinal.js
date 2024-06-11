import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import cn from "classnames";
import styles from "./EsiFinal.module.scss"
import Chatbot from "../../components/chatbot/Chatbot";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import Collapsible from 'react-collapsible';
import CollapsibleComponent from "./CollapsibleComponent";


function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function EsiFinal(props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
    console.log('isOpen:', isOpen);
  };

  const [isOpen1, setIsOpen1] = useState(false);

  const toggleCollapsible1 = () => {
    setIsOpen1(!isOpen1);
  };


  return (
    <div>
      <Navbar/>
       <Chatbot/>
      <div className={styles.EsiFinalContainer}>
      <img className={styles.esiFinalCover} src={'/assets/esiFinalCover.svg'} alt="alt text" />
      <div className={styles.coverTextContainer}>
      <h2 className={styles.Title2}>Plongez dans l'avant-garde des systèmes informatiques</h2>
      <h1 className={styles.Title1}>Innovation et application redéfinissant la communication.</h1>
      <button className={styles.contactButton}>
        @  Contactez-nous
      </button>
      </div>

      <div className={styles.bigInfoContainer}>
      <div className={styles.titlesContainer}>
        <div className={styles.pgmContainer}>
        <h3 className={styles.title3}>Programme</h3>
        <img className={styles.EsiFinalLine1} src={'/assets/EsiFinalLine1.svg'} alt="line" />
        </div>
        
        <h3 className={styles.subtitle3}>Introduction</h3>
        <h3 className={styles.subtitle3}>inscription</h3>
        <h3 className={styles.subtitle3}>Programme</h3>
        <h3 className={styles.subtitle3}>Graduation</h3>
        <h3 className={styles.subtitle3}>Opportunité de carrière</h3>
        <h3 className={styles.subtitle3}>Poser une question</h3>
      </div>
      <div className={styles.ContentContainer}>
         

          <CollapsibleComponent i="1" title="Informations clés" content={
          <div className={styles.collapsibleContentContainer}>
          <img className={styles.EsiFinalLine2} src={'/assets/EsiFinalLine2.svg'} alt="line" />
          <img className={styles.collapsibleContent} src={'/assets/collapsibleContent.svg'} alt="line" />
          </div>
          }/>

       <CollapsibleComponent i="2" title="Introduction" content={
          <div className={styles.collapsibleContentContainer}>
          <img className={styles.EsiFinalLine2} src={'/assets/EsiFinalLine2.svg'} alt="line" />
          <img className={styles.collapsibleContent} src={'/assets/collapsibleContent.svg'} alt="line" />
          </div>
          }/>

        <CollapsibleComponent i="3" title="Programme" content={
          <div className={styles.collapsibleContentContainer}>
          <img className={styles.EsiFinalLine2} src={'/assets/EsiFinalLine2.svg'} alt="line" />
          <img className={styles.collapsibleContent} src={'/assets/collapsibleContent.svg'} alt="line" />
          </div>
          }/>


       <CollapsibleComponent i="4" title="Graduation" content={
          <div className={styles.collapsibleContentContainer}>
          <img className={styles.EsiFinalLine2} src={'/assets/EsiFinalLine2.svg'} alt="line" />
          <img className={styles.collapsibleContent} src={'/assets/collapsibleContent.svg'} alt="line" />
          </div>
          }/>


      <CollapsibleComponent i="5" title="Opportunité de carrière" content={
          <div className={styles.collapsibleContentContainer}>
          <img className={styles.EsiFinalLine2} src={'/assets/EsiFinalLine2.svg'} alt="line" />
          <img className={styles.collapsibleContent} src={'/assets/collapsibleContent.svg'} alt="line" />
          </div>
          }/>

     <CollapsibleComponent i="6" title="Opportunité de carrière" content={
          <div className={styles.collapsibleContentContainer}>
          <img className={styles.EsiFinalLine2} src={'/assets/EsiFinalLine2.svg'} alt="line" />
          <img className={styles.collapsibleContent} src={'/assets/collapsibleContent.svg'} alt="line" />
          </div>
          }/>



      </div>

      </div>
      </div>
      <Footer/>
    </div>
  );
}

EsiFinal.propTypes = {
  className: PropTypes.string,
};

export default EsiFinal;
