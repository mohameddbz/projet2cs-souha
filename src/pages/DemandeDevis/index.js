import React , { useState,useEffect }from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';
import {  Link } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import Chatbot from "../../components/chatbot/Chatbot";
import Datepicker from './Datepicker';
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function DemandeDevis(props) {

  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };



  //manage organisme buttons
  const [selectedOption, setSelectedOption] = useState(null);

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  //manage mode buttons

  const [selectedMode, setSelectedMode] = useState(null);

  const handleModeClick = (option) => {
    setSelectedMode(option);
  };

  //manage certification
  const [selectedCertif, setSelectedCertif] = useState(null);

  const handleCertifClick = (option) => {
  setSelectedCertif(selectedCertif === option ? null : option);
  };

   //manage option materiel
   const [selectedMateriel, setSelectedMateriel] = useState(null);

  const handleMaterielClick = (option) => {
  setSelectedMateriel(selectedMateriel === option ? null : option);
  };

  //validation

  const handleValider = () => {
    console.log('Valider button clicked!');
  };

  return (
    <div>
      <Navbar/>
      <Chatbot/>
    <div className={cn(styles.root, props.className, 'demande-devis')}>
      <ScrollToTop />
      <div className={styles.rect1} />
      <div className={styles.description_container}>
      <h2 className={styles.medium_title_box}>
        <span className={styles.medium_title}>
          <span className={styles.medium_title_span0}>Personnalisez vos </span>
          <span className={styles.medium_title_span1}>
            coûts !<br />
          </span>
        </span>
      </h2>
      
      <h5 className={styles.highlight_box}>
        <span className={styles.highlight}>
          <span className={styles.highlight_span0}>Ce </span>
          <span className={styles.highlight_span1}>simulateur</span>
          <span
            className={
              styles.highlight_span2
            }>{` vous permet de calculer rapidement et facilement le coût estimé d'une formation sur mesure pour votre entreprise ou votre organisation. En fournissant quelques détails sur vos besoins en formation, notre outil générera un `}</span>
          <span className={styles.highlight_span3}>devis personnalisé</span>
          <span className={styles.highlight_span4}>
            {' '}
            afin que vous puissiez planifier votre budget en toute tranquillité.
          </span>
        </span>
      </h5>
      </div>

      <div className={styles.formContainer}>
      <div className={styles.formDevis} >
      <div className={styles.rect2} />
      <input
      type="text"
      className={`${styles.text} ${styles.transparentinput} `}
      placeholder="Nombre d'apprenants prevu"
      value={props.value}
      onChange={props.onChange}
      />
      <div className={styles.line} />

      <Link to="/DemandeEnregistree">
      <img className={styles.cover} src={'/assets/solid_blue_background.png'} alt="alt text" />
      <h3 className={styles.subtitle}>Valider</h3>
      </Link>

      <input
      type="text"
      className={`${styles.text1} ${styles.transparentinput} `}
      placeholder="Lieu preferentiel de formation"
      value={props.value}
      onChange={props.onChange}
      />      
      <div className={styles.line1} />
      <input
      type="text"
      className={`${styles.text2} ${styles.transparentinput} `}
      placeholder="Nom de l'organisme"
      value={props.value}
      onChange={props.onChange}
      />
      <div className={styles.line2} />
      <input
      type="text"
      className={`${styles.text3} ${styles.transparentinput} `}
      placeholder="Intitule de la formation"
      value={props.value}
      onChange={props.onChange}
      />      <div className={styles.line3} />
     <input
      type="text"
      className={`${styles.text4} ${styles.transparentinput} `}
      placeholder="Theme de la formation"
      value={props.value}
      onChange={props.onChange}
      />      <div className={styles.line4} />
      <input
      type="text"
      className={`${styles.text5} ${styles.transparentinput} `}
      placeholder="Adresse E-mail"
      value={props.value}
      onChange={props.onChange}
      />
      <div className={styles.line5} />
      <h5 className={styles.highlight1}>Vous etes :</h5>
      <h5 className={selectedOption === 'option1' ? `${styles.highlight2White}` : styles.highlight2}>Association</h5>
      
      <button className={selectedOption === 'option1' ? `${styles.selectedRect3}` : styles.rect3}
        onClick={() => handleButtonClick('option1')}></button>
      <button className={selectedOption === 'option2' ? `${styles.selectedRect31}` : styles.rect31}
        onClick={() => handleButtonClick('option2')}></button>
      <h5 className={styles.highlight11}>Mode d’enseignement:</h5>
      <h5 className={selectedMode === 'option3' ? ` ${styles.highlight21White}` : styles.highlight21}>Hybride</h5>

      <button className={selectedMode === 'option3' ? `${styles.selectedRect4}` : styles.rect4}
        onClick={() => handleModeClick('option3')}></button>

      <h5 className={selectedMode === 'option2' ? ` ${styles.highlight22White}` : styles.highlight22}>En ligne</h5>

      <button className={selectedMode === 'option2' ? `${styles.selectedRect5}` : styles.rect5}
        onClick={() => handleModeClick('option2')}></button>

      <button  className={selectedOption === 'option3' ? `${styles.selectedRect6}` : styles.rect6}
        onClick={() => handleButtonClick('option3')}></button>
      <h5 className={selectedOption === 'option3' ? ` ${styles.highlight3White}` : styles.highlight3}>Organisme privé</h5>

      <button className={selectedMode === 'option1' ? `${styles.selectedRect7}` : styles.rect7}
        onClick={() => handleModeClick('option1')}></button>

      <h5 className={selectedMode === 'option1' ? `${styles.highlight31White}` : styles.highlight31}>Presentiel</h5>
      <h5 className={styles.highlight12}>Autres  options:</h5>
      <h5 className={selectedMateriel === 'selected' ? ` ${styles.highlight23White}` : styles.highlight23}>Materiel telechargeable</h5>

      <button className={selectedMateriel === 'selected' ? `${styles.selectedRect8}` : styles.rect8}
        onClick={() => handleMaterielClick('selected')}></button>

      <button 
      onClick={() => handleCertifClick('certif')}
      className={selectedCertif === 'certif' ? `${styles.selectedRect9}` : styles.rect9}
        ></button>

      <h5 className={selectedCertif === 'certif' ? `${styles.highlight32White}` : styles.highlight32}>Certification</h5>
      <h5 className={selectedOption === 'option2' ? ` ${styles.highlight24White}` : styles.highlight24}>Organisme publique</h5>
      <img className={styles.image} 
      src={selectedOption === 'option2' ? '/assets/white_government_building_icon.png' : '/assets/government_building_icon.png'} 
      alt="alt text" />
      <img className={styles.image1} 
      src={selectedOption === 'option3' ? '/assets/white_lock_and_key_icon.png' : '/assets/lock_and_key_icon.png'} 
      alt="alt text" />
      <img className={styles.image2} 
      src={selectedOption === 'option1' ? '/assets/white_wrench_icon.png' : '/assets/wrench_icon.png'}
      alt="alt text" />
      <div className={styles.text6}>
      <Datepicker placeholderText="Date Debut"/> </div>
       


     
      <img className={styles.image3} src={'/assets/calendar_icon.png'} alt="alt text"  onClick={handleClick}
      />
      



      <div className={styles.line6} />
      <div className={styles.text7}><Datepicker placeholderText="Date Fin"/> </div>
      <img className={styles.image31} src={'/assets/calendar_icon.png'} alt="alt text" />
      <div className={styles.line7} />
     
    </div>


    </div>

    </div>
    <Footer/>
    </div>
  );
}

DemandeDevis.propTypes = {
  className: PropTypes.string
};

export default DemandeDevis;
