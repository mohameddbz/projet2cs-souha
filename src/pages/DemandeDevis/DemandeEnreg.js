import React , { useState , useEffect}from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import Chatbot from "../../components/chatbot/Chatbot";

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function DemandeEnreg(props) {

   
  
    return (
      <div className={cn(styles.rootEnreg, props.className, 'demande-devis')}>
       <ScrollToTop />
       <Navbar/>
       <Chatbot/>
        <div className={styles.rect1Enreg} />
  
        <div className={styles.formDevis} >
        <div className={styles.rect2Enreg} >
        <h2 className={styles.medium_title_box2}>
           <span className={styles.medium_title}>
          <span className={styles.medium_title_span02}>Demande enregistrée avec succès !</span>
          </span>
         </h2>
        </div>
        
       
         </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
       <Footer/>
      </div>
    );
  }
  
  DemandeEnreg.propTypes = {
    className: PropTypes.string
  };
  
  export default DemandeEnreg;
  