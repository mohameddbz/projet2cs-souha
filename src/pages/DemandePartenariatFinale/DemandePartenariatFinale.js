import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import countryList from "react-select-country-list";
import styles from "./DemandePartenariatFinale.module.scss"
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Chatbot from "../../components/chatbot/Chatbot";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import FormPartenariat from "./FormPartenariat";
import CardPartenariat from "./CardPartenariat";

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function DemandePartenariatFinale(props) {
  const defaultCountryCode = "DZ"; // Algeria country code
  const [country, setCountry] = useState(defaultCountryCode);
  const countryOptions = useMemo(() => countryList().getData(), []);

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
  };

  const [tailleValue, setTailleValue] = useState("");

  const handleTailleChange = (event) => {
    setTailleValue(event.target.value);
  };
  const tailleOptions = [
    { label: "Moins de 10 personnes", value: "Moins de 10 personnes" },
    { label: "10 à 50 personnes", value: "10 à 50 personnes" },
    { label: "50 à 100 personnes", value: "50 à 100 personnes" },
    { label: "Plus de 100 personnes", value: "Plus de 100 personnes" },
  ];

  return (
    <div>
    <Navbar/>
    <div className={cn(styles.root, props.className, "DemandePartenariatFinale")}>
      <ScrollToTop />
      <Chatbot />
      <div className={styles.rect12}>
      </div>
      <div  className={styles.contentContainer}>
      <div className={styles.mainContainer}>

      <div className={styles.descContainer}>
       <h3 className={styles.subtitle_box}>
          <span className={styles.subtitle}>
            <span className={styles.subtitle_span0}>
              {`Joignez-vous à l'Élan de l'Excellence : `}
              <br />
              Devenez{" "}
            </span>
            <span className={styles.subtitle_span1}>Notre Partenaire!</span>
          </span>
        </h3>

        <h5 className={styles.textDescr}>
          Plongez dans un monde d'opportunités sans limites en devenant
          partenaire de l'ESI. Notre engagement envers l'excellence scientifique
          et économique se traduit par des alliances stratégiques dynamiques
          <br />
          {`l'avenir ensemble.`}
        </h5>

        <h3 className={styles.subtitle1}>
          {`Expertise, Collaboration & `}
          <br />
          Innovation
        </h3>

        <h5 className={styles.highlight5}>
          Que vous cherchiez une expertise pointue, des <br />
          collaborations de recherche stimulantes ou des <br />
          solutions de formation continue innovantes, notre <br />
          équipe dévouée est prête à transformer vos <br />
          aspirations en réalité. Rejoignez-nous pour façonner
          <br />
          {`l'avenir ensemble.`}
        </h5>
       </div>

      <FormPartenariat/>
      </div>

      <div className={styles.centeredDivv}>
      <h2 className={styles.medium_title}>Notre réseau de partenaires</h2>
      </div>
      
      <div className={styles.rect141Partenaires}>
        
      <img className={styles.image23prt} src={'/assets/4fd778fb2debfd63ba00ed3f426459a3.png'} alt="alt text" />
      <img className={styles.image24prt} src={'/assets/a04411374e37fb63d245db9bdc0585e8.png'} alt="alt text" />
      <img className={styles.image25prt} src={'/assets/084ab549acda233d9b17e97e5ccd3740.png'} alt="alt text" />
      <img className={styles.image22prt} src={'/assets/f28f31c1e283df752aabad027ad4bfc7.png'} alt="alt text" />

      <img className={styles.image23prt} src={'/assets/logo_benevity.png'} alt="alt text" />
      <img className={styles.image24prt} src={'/assets/cisco.jpg'} alt="alt text" />
      <img className={styles.image25prt} src={'/assets/084ab549acda233d9b17e97e5ccd3740.png'} alt="alt text" />
      <img className={styles.image22prt} src={'/assets/f28f31c1e283df752aabad027ad4bfc7.png'} alt="alt text" />

      <img className={styles.image23prt} src={'/assets/4fd778fb2debfd63ba00ed3f426459a3.png'} alt="alt text" />
      <img className={styles.image24prt } src={'/assets/a04411374e37fb63d245db9bdc0585e8.png'} alt="alt text" />
      <img className={styles.image25prt } src={'/assets/084ab549acda233d9b17e97e5ccd3740.png'} alt="alt text" />
      <img className={styles.image26prt } src={'/assets/alt.png'} alt="alt text" />
      <img className={styles.image22prt } src={'/assets/f28f31c1e283df752aabad027ad4bfc7.png'} alt="alt text" />
      <img className={styles.image26prt } src={'/assets/cleverreach.png'} alt="alt text" />
      <img className={styles.image24prt } src={'/assets/adobe_corporate_logo.png'} alt="alt text" />
      <img className={styles.image26prt } src={'/assets/dell.png'} alt="alt text" />

      <img className={styles.image23prt } src={'/assets/logo_benevity.png'} alt="alt text" />
      <img className={styles.image24prt } src={'/assets/cisco.jpg'} alt="alt text" />
      <img className={styles.image25prt } src={'/assets/084ab549acda233d9b17e97e5ccd3740.png'} alt="alt text" />
      <img className={styles.image26prt } src={'/assets/webex_1.png'} alt="alt text" />
      <img className={styles.image22prt } src={'/assets/f28f31c1e283df752aabad027ad4bfc7.png'} alt="alt text" />
      <img className={styles.image26prt } src={'/assets/cleverreach.png'} alt="alt text" />
      <img className={styles.image24prt } src={'/assets/a04411374e37fb63d245db9bdc0585e8.png'} alt="alt text" />
      <img className={styles.image26prt } src={'/assets/dell.png'} alt="alt text" />

      </div>

       <CardPartenariat/>
      <Footer/>
       
      </div>



    </div>
    
    
    </div>
  );
}

DemandePartenariatFinale.propTypes = {
  className: PropTypes.string,
};

export default DemandePartenariatFinale;
