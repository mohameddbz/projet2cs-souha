import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import cn from "classnames";
import countryList from "react-select-country-list";
import styles from "./DetailsClubsFinale.module.scss"
import Chatbot from "../../components/chatbot/Chatbot";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import CarouselItem from "./CarouselItem";
import CarouselSecond from "./carouselSecond";
import CarouselThird from "./CarouselThird";
import CarouselFeedback from "./CarouselFeedback";
import { Slide } from '@mui/material';

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function DetailsClubsFinale(props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Navbar/>
       <Chatbot/>
      <div className={styles.clubsdetailscontainer}> 
      
      <div className={styles.descrContainer}>
        <div className={styles.descText}>
        <h1 className={styles.subtitle_box}>
          <span className={styles.subtitle}>
            <span className={styles.subtitle_span1}>School of {" "}</span>
            <span className={styles.subtitle_span0}>
              AI Algiers
            </span>
          </span>
        </h1>
        <h3 className={cn(styles.descParagraph, { [styles.expanded]: expanded })}>
        L'École de l'IA d'Alger, fondée en 2018 à l'ESI Alger, est un club scientifique rassemblant des passionnés de l'intelligence artificielle. Son objectif est de permettre aux membres d'explorer leur potentiel dans ce domaine et d'améliorer leurs compétences en IA. Le club propose des cours, des ateliers, des discussions et des événements pour aider les membres à se perfectionner dans ce domaine. Rejoignez-nous pour en savoir plus sur l'IA et pour participer à des projets passionnants! En reconnaissance de ses efforts pour promouvoir l'éducation et la recherche en intelligence artificielle, l'École de l'IA d'Alger a établi des partenariats avec des entreprises technologiques de premier plan, des institutions académiques renommées et des organisations gouvernementales. Ces collaborations permettent aux membres d'accéder à des ressources et des opportunités uniques telles que des stages, des projets de recherche appliquée et des programmes de mentorat, renforçant ainsi leur parcours professionnel et académique dans le domaine de l'IA. 
        </h3>
        </div>
      
      <img className={styles.descImg} src={'/assets/descImg.svg'} alt="alt text" />
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.grpButton1}>
          <Link to="https://linktr.ee/soai_algiers?fbclid=IwZXh0bgNhZW0CMTAAAR0qWw-8EDUF7fJgLxkGX8ll3RTFIZXyL6fWP5RAedUn6NQOic83ypboE6c_aem_AYahKtqssPEuYvVi6rr5XxGjRb0wPdUuuwfZiQA0un481MR0kxDqlpFftOzxIZvBGNFC7fFuZ1p9MUM2zXAjO3TK">
          <button  className={styles.joinButton}>
        Nous rejoindre
       </button>
       </Link>
      
      
      <div className={styles.regarderNousContainer}>
      <Link to="https://www.youtube.com/@schoolofaialgiers">
       <img className={styles.regarderNousIcon} src={'/assets/regard.svg'} alt="alt text" /></Link>
       Regardez Nous!
       </div>
       

       </div>

       <div className={styles.lirePlus} onClick={toggleExpand}>{expanded ? "Lire moins" : "Lire plus"}
       <img className={styles.lirePlusArrow} src={'/assets/arrow.svg'} alt="alt text" />
       </div>
      </div>

     <div className={styles.objEqContainer}>
      <div className={styles.eqContainer}>
      <h2 className={styles.subtitle2_box}>
          <span className={styles.subtitle2}>
            <span className={styles.subtitle2_span1}>Notre Meilleure {" "}</span>
            <span className={styles.subtitle2_span0}>
              Equipe
            </span>
          </span>
        </h2> 
        <CarouselItem/>
      </div>
      <div className={styles.objContainer}>
      <img className={styles.objClub} src={'/assets/objClub.svg'} alt="alt text" />
      </div>

      </div>

      <div className={styles.cards1Container}>
      <h2 className={styles.subtitle2_box}>
          <span className={styles.subtitle2}>
            <span className={styles.subtitle2_span1}>Discussions {" "}</span>
            <span className={styles.subtitle2_span0}>
              et cours
            </span>
          </span>
        </h2> 
       <CarouselSecond/>
      </div>

      <div className={styles.cards2Container}>
      <h2 className={styles.subtitle2_box}>
          <span className={styles.subtitle2}>
            <span className={styles.subtitle2_span1}>Principaux {" "}</span>
            <span className={styles.subtitle2_span0}>
            événements
            </span>
          </span>
        </h2> 
       <CarouselThird/>
      </div>

      <div className={styles.whiteContainer}>
        <div className={styles.feedbackContainer}>
        <h2 className={styles.subtitle2_box}>
          <span className={styles.subtitle2}>
            <span className={styles.subtitle2_span1}>Feedback des {" "}</span>
            <span className={styles.subtitle2_span0}>
            participants
            </span>
          </span>
        </h2> 
        <CarouselFeedback/>
        </div>

        <div className={styles.newsContainer}>
            <h2 className={styles.textNewsletter}>Inscrivez-vous pour recevoir notre newsletter</h2>
            <div className={styles.subscribeRow}>
            <div className={styles.input}>
  <input
    type="email"
    placeholder="Votre email"
    style={{ fontSize: '21px', fontFamily: 'Arial, sans-serif',border:'none',outline:'none',textAlign: 'center'  }} // Adjust size and font family
  />
</div>
            
            <button className={styles.subscribeButton}>
                S'inscrire
            </button>
            </div>
        </div>
      </div>
      



      </div>
      <Footer/>
    </div>
  );
}

DetailsClubsFinale.propTypes = {
  className: PropTypes.string,
};

export default DetailsClubsFinale;
