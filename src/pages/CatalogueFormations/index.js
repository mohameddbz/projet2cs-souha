import React ,{useState} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Select from 'react-select';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import styles from './index.module.scss';
import FormationCard from './FormationCard';
import Chatbot from "../../components/chatbot/Chatbot";

const optionsType = [
    { value: 'Avant Promotion', label: 'Avant Promotion' },
    { value: 'A La Carte', label: 'A La Carte' },
  ];

  const optionsMode = [
    { value: 'presentiel', label: 'Présentiel' },
    { value: 'en_ligne', label: 'En ligne' },
    { value: 'hybride', label: 'Hybride' },
];

const optionsDuree = [
    { value: '1', label: '20 heures' },
    { value: '2', label: '60 heures' },
    { value: '3', label: '150 heures' },
    { value: '4', label: '250 heures' },
    { value: '4', label: 'plus de 250 heures' },
];

const optionsNiveau = [
    { value: 'debutant', label: 'Débutant' },
    { value: 'intermediaire', label: 'Intermédiaire' },
    { value: 'avance', label: 'Avancé' },
];

const optionsLangue = [
    { value: 'francais', label: 'Français' },
    { value: 'anglais', label: 'Anglais' },
    { value: 'arabe', label: 'Arabe' },
];

function CatalogueFormation(props) {


  const [selectedCertif, setSelectedCertif] = useState(null);

  const handleCertifClick = (option) => {
  setSelectedCertif(selectedCertif === option ? null : option);
  };

   
    const styleSelect = {
        Input: () => ({
            font:'400 14px/1.42 "Poppins", Helvetica, Arial, serif',
          }),
        indicatorSeparator: () => ({
            display: 'none',
          }),

        control: base => ({
          ...base,
          border: 0,
          font:'400 14px/1.42 "Poppins", Helvetica, Arial, serif',
          borderRadius:"18px",
          boxShadow: 'none',
          outline: "1px solid rgb(229, 231, 235)",
          filter: "drop-shadow(0px 1px 8px rgba(31, 41, 55, 0.078))",
          outlineOffset:"-1px",
          width: "140px",
          height: "36px",
          marginRight: "20px"


        })
      };

  return (
    <div>
      <Navbar/>
      <Chatbot/>
    <div className={cn(styles.root, props.className, 'cf')}>

      <div className={styles.filterSearch}>

      <div className={styles.box6} >
        <div className={styles.searchIcon}>
     
      <img className={styles.image211} src={'/assets/2a63cc849a1e4df7c901fc115bc0f1f5.png'} alt="alt text" />
      <img className={styles.image1311} src={'/assets/b5625f3b5c6851244774194e3b2055a9.png'} alt="alt text" />
        </div>

        <input className={styles.transparentInput} type="text" placeholder="Rechercher" />
      </div>
       
     
        <Select
        options={optionsType}
        styles={styleSelect}
        placeholder="Type"

         />

        <Select
        options={optionsDuree}
        styles={styleSelect}
        placeholder="Duree"

         />

        <Select
        options={optionsMode}
        styles={styleSelect}
        placeholder="Mode"

         />

       <Select
        options={optionsLangue}
        styles={styleSelect}
        placeholder="Langue"

         />


        <Select
        options={optionsNiveau}
        styles={styleSelect}
        placeholder="Niveau"

         />

      <button onClick={() => handleCertifClick('selected')} 
      className={selectedCertif === 'selected' ? ` ${styles.boxSelected}` : styles.box}>
        <div className={selectedCertif === 'selected' ? ` ${styles.text31Selected}` : styles.text31}>Certifiante</div>
      </button>

      </div>


      <div className={styles.sectionContainer}>
       <h3 className={styles.subtitle}>Formations A La Carte</h3>
       <div className={styles.cardsContainer}>
        <FormationCard/>
        <FormationCard/>
        <FormationCard/>
        <FormationCard/>
        <FormationCard/>
        <FormationCard/>
       </div>
       <button className={styles.imageButton}>
        Voir plus
       </button>

      </div>


      <div className={styles.sectionContainer}>
       <h3 className={styles.subtitle}>Formations Avant Promotion</h3>
       <div className={styles.cardsContainer}>
        <FormationCard/>
        <FormationCard/>
        <FormationCard/>
        <FormationCard/>
        <FormationCard/>
        <FormationCard/>
       </div>
       <button className={styles.imageButton}>
        Voir plus
       </button>

      </div>



      <div className={styles.sectionContainer}>
       <h3 className={styles.subtitle}>Les plus demandees</h3>
       <div className={styles.cardsContainer}>
        <FormationCard/>
        <FormationCard/>
        <FormationCard/>
        <FormationCard/>
        <FormationCard/>
        <FormationCard/>
       </div>
       <button className={styles.imageButton}>
        Voir plus
       </button>

      </div>

      <div className={styles.rect141}>
        
      <img className={styles.image23} src={'/assets/4fd778fb2debfd63ba00ed3f426459a3.png'} alt="alt text" />
      <img className={styles.image24} src={'/assets/a04411374e37fb63d245db9bdc0585e8.png'} alt="alt text" />
      <img className={styles.image25} src={'/assets/084ab549acda233d9b17e97e5ccd3740.png'} alt="alt text" />
      <img className={styles.image22} src={'/assets/f28f31c1e283df752aabad027ad4bfc7.png'} alt="alt text" />

      <img className={styles.image23} src={'/assets/logo_benevity.png'} alt="alt text" />
      <img className={styles.image24} src={'/assets/cisco.jpg'} alt="alt text" />
      <img className={styles.image25} src={'/assets/084ab549acda233d9b17e97e5ccd3740.png'} alt="alt text" />
      <img className={styles.image22} src={'/assets/f28f31c1e283df752aabad027ad4bfc7.png'} alt="alt text" />

      <img className={styles.image23} src={'/assets/4fd778fb2debfd63ba00ed3f426459a3.png'} alt="alt text" />
      <img className={styles.image24} src={'/assets/a04411374e37fb63d245db9bdc0585e8.png'} alt="alt text" />
      <img className={styles.image25} src={'/assets/084ab549acda233d9b17e97e5ccd3740.png'} alt="alt text" />
      <img className={styles.image26} src={'/assets/alt.png'} alt="alt text" />
      <img className={styles.image22} src={'/assets/f28f31c1e283df752aabad027ad4bfc7.png'} alt="alt text" />
      <img className={styles.image26} src={'/assets/cleverreach.png'} alt="alt text" />
      <img className={styles.image24} src={'/assets/adobe_corporate_logo.png'} alt="alt text" />
      <img className={styles.image26} src={'/assets/dell.png'} alt="alt text" />

      <img className={styles.image23} src={'/assets/logo_benevity.png'} alt="alt text" />
      <img className={styles.image24} src={'/assets/cisco.jpg'} alt="alt text" />
      <img className={styles.image25} src={'/assets/084ab549acda233d9b17e97e5ccd3740.png'} alt="alt text" />
      <img className={styles.image26} src={'/assets/webex_1.png'} alt="alt text" />
      <img className={styles.image22} src={'/assets/f28f31c1e283df752aabad027ad4bfc7.png'} alt="alt text" />
      <img className={styles.image26} src={'/assets/cleverreach.png'} alt="alt text" />
      <img className={styles.image24} src={'/assets/a04411374e37fb63d245db9bdc0585e8.png'} alt="alt text" />
      <img className={styles.image26} src={'/assets/dell.png'} alt="alt text" />

      </div>
      
      <div className={styles.temContainer}>
      <h3 className={styles.subtitle}>Voix des Apprenants : Témoignages Inspirants</h3>
      <div className={styles.temFlex}>
      <img className={styles.test1} src={'/assets/testimonial1.svg'} alt="alt text" />
      <img className={styles.test2} src={'/assets/testimonial2.svg'} alt="alt text" />
      <img className={styles.test3} src={'/assets/testimonial3.svg'} alt="alt text" />
      </div>
      </div>
  
      
    </div>
    <Footer/>
    </div>
  );
}

CatalogueFormation.propTypes = {
  className: PropTypes.string
};

export default CatalogueFormation;
