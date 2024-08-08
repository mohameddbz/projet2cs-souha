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
         

          <CollapsibleComponent i="1" title="Introduction" content={
          <div className={styles.collapsibleContentContainer}>
          <img className={styles.EsiFinalLine2} src={'/assets/EsiFinalLine2.svg'} alt="line" />
          <img className={styles.collapsibleContent} src={'/assets/collapsibleContent.svg'} alt="line" />
          </div>
          }/>

       <CollapsibleComponent i="2" title="Inscription" content={
          <div className={styles.collapsibleContentContainer}>
          <img className={styles.EsiFinalLine2} src={'/assets/EsiFinalLine2.svg'} alt="line" />
          <h2 className={styles.textInscription}>Découvrez comment rejoindre notre communauté dynamique en vous inscrivant dès aujourd'hui ! Que vous soyez un étudiant en herbe, un professionnel désireux de perfectionner ses compétences ou un curieux avide d'apprendre, notre processus d'inscription simple et convivial vous permettra de commencer votre parcours éducatif sans tracas.</h2>
          </div>
          }/>

        <CollapsibleComponent i="3" title="Programme" content={
          <div className={styles.collapsibleContentContainer}>
          <img className={styles.EsiFinalLine2} src={'/assets/EsiFinalLine2.svg'} alt="line" />
         <h2 className={styles.textInscription}>Explorez nos programmes diversifiés conçus pour répondre à une multitude d'intérêts et de besoins. De la technologie à l'art, en passant par les affaires et les sciences, nos programmes offrent une formation de qualité dispensée par des experts du domaine. Plongez-vous dans une expérience d'apprentissage enrichissante et découvrez les possibilités infinies qui s'offrent à vous.</h2>
          </div>
          }/>


       <CollapsibleComponent i="4" title="Graduation" content={
          <div className={styles.collapsibleContentContainer}>
          <img className={styles.EsiFinalLine2} src={'/assets/EsiFinalLine2.svg'} alt="line" />
          <h2 className={styles.textInscription}>Félicitations aux diplômés ! Notre cérémonie de remise des diplômes est un moment inoubliable où nous célébrons vos succès et vos réalisations. C'est le moment de reconnaître votre travail acharné, votre dévouement et votre persévérance. Rejoignez-nous pour une journée de célébration, de nostalgie et de nouveaux départs alors que vous franchissez cette étape importante de votre vie.</h2>
          </div>
          }/>


      <CollapsibleComponent i="5" title="Opportunité de carrière" content={
          <div className={styles.collapsibleContentContainer}>
          <img className={styles.EsiFinalLine2} src={'/assets/EsiFinalLine2.svg'} alt="line" />
          <h2  className={styles.textInscription}>Explorez les opportunités de carrière passionnantes qui s'offrent à vous après avoir suivi nos programmes. Grâce à nos partenariats avec des entreprises de premier plan et notre réseau mondial d'anciens élèves, nous vous connectons avec des possibilités professionnelles stimulantes et enrichissantes. Transformez votre éducation en action et lancez-vous dans une carrière prometteuse.</h2>
          </div>
          }/>

     <CollapsibleComponent i="6" title="Poser Une Question" content={
          <div className={styles.collapsibleContentContainer}>
          <img className={styles.EsiFinalLine2} src={'/assets/EsiFinalLine2.svg'} alt="line" />
          <h2  className={styles.textInscription}>Avez-vous des interrogations sur nos programmes, notre processus d'inscription ou toute autre question ? Nous sommes là pour vous aider ! N'hésitez pas à poser vos questions, notre équipe dévouée se fera un plaisir de vous fournir les réponses dont vous avez besoin pour prendre des décisions éclairées sur votre parcours éducatif.</h2>
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
