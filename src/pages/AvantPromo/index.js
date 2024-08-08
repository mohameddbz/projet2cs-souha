import React  , {useState} from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import Collapsible from 'react-collapsible';
import Navbar from "../../components/navbar/navbar";
import styles from "./index.module.scss";
import Footer from "../../components/Footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";
function AvantPromo(props) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };


  const [isOpen1, setIsOpen1] = useState(false);

  const toggleCollapsible1 = () => {
    setIsOpen1(!isOpen1);
  };


  return (
    <div>
    <Navbar/>
    <Chatbot/>
    <div className={cn(styles.root, props.className, "AvantPromo")}>
      <div className={styles.infoContainer}>
        <div className={styles.infoTextContainer}>
          <h1 className={styles.hero_title}>Formation avant promotion</h1>
          <img
            className={styles.line1}
            src={"/assets/3429ab5567897947a70400c570ef3df3.png"}
            alt="alt text"
          />
          <p className={styles.paragraph}>
              L’école nationale supérieure d’informatique organise la 4ème session
            de formation avant promotion « Mars 2024 » pour l’accès au grade
            d’assistant ingénieur en informatique Niveau 1 au profit des
            techniciens supérieures en informatique des établissements publics.
            <br />
            <br />
            La formation permettra l’accès au grade d’assistant en informatique
            et contient un enseignement de 210 heures réparti sur 7 mois à
            raison d’une semaine par mois.
          </p>

          <h3 className={styles.subtitle2}>Ce que vous apprendrez :</h3>
          <p className={styles.paragraph2}>
            ✓ Acquérir des compétences de base en informatique, y compris la
            programmation et la manipulation des données.
            <br />✓ Comprendre les principes et les technologies des réseaux
            informatiques pour la communication et le partage de ressources.
            <br />
            {`✓ Maîtriser les systèmes d'information, y compris la gestion de bases de données et l'analyse des données.
`}
            <br />✓ Développer des compétences dans le développement logiciel,
            en utilisant divers langages et frameworks pour créer des
            applications et des systèmes.
            <br />✓ Cultiver des compétences transversales telles que la
            résolution de problèmes, la collaboration et la communication pour
            réussir dans un environnement professionnel.
          </p>
        </div>

        <div className={styles.contactContainer}>
          <button className={styles.inscriptionButton}>S'inscrire</button>
          <img
            className={styles.line2}
            src={"/assets/11d01e9e5564968d2526c8c07973a61c.png"}
            alt="alt text"
          />
          <h3 className={styles.subtitle1}>CONTACTEZ-NOUS !</h3>
          <p className={styles.paragraph1}>
            Vous avez des questions sur les études à ESI ? Nous vous invitons à
            entrer en contact avec notre équipe des formations pour en savoir
            plus.
          </p>
          <button className={styles.inscriptionButton}>Contactez-Nous</button>
          <h3 className={styles.subtitle11}>Agenda</h3>
          <div className={styles.rect6}>
            <div className={styles.rect7}>
              <h3 className={styles.subtitle4}>20</h3>
              <div className={styles.text8}>Janvier</div>
            </div>

            <div className={styles.infoCalendar}>
              <p className={styles.paragraph11}>
                Formation avant promotion 2024
              </p>
              <div className={styles.info3}>Lundi,20 Janvier 2024</div>
              <div className={styles.locationContainer}>
                <img
                  className={styles.image7}
                  src={"/assets/bx_map.svg"}
                  alt="alt text"
                />
                <div className={styles.info2}>
                  {" "}
                  ESI, Oued Smar Alger , 16309
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.moduleSection}>
        <h3 className={styles.subtitle}>Programme de la formation</h3>

        <div className={styles.gridModules}>
          <img
            className={styles.gridItem}
            src={"/assets/module1.svg"}
            alt="alt text"
          />
          <img
            className={styles.gridItem}
            src={"/assets/module2.svg"}
            alt="alt text"
          />
          <img
            className={styles.gridItem}
            src={"/assets/module3.svg"}
            alt="alt text"
          />
          <img
            className={styles.gridItem}
            src={"/assets/module4.svg"}
            alt="alt text"
          />
          <img
            className={styles.gridItem}
            src={"/assets/module3.svg"}
            alt="alt text"
          />
          <img
            className={styles.gridItem}
            src={"/assets/module1.svg"}
            alt="alt text"
          />
          <img
            className={styles.gridItem}
            src={"/assets/module2.svg"}
            alt="alt text"
          />
          <img
            className={styles.gridItem}
            src={"/assets/module4.svg"}
            alt="alt text"
          />
          <img
            className={styles.gridItem}
            src={"/assets/module3.svg"}
            alt="alt text"
          />
          <img
            className={styles.gridItem}
            src={"/assets/module2.svg"}
            alt="alt text"
          />
          <img
            className={styles.gridItem}
            src={"/assets/module3.svg"}
            alt="alt text"
          />
          <img
            className={styles.gridItem}
            src={"/assets/module4.svg"}
            alt="alt text"
          />
        </div>
      </div>

    <div className={styles.whiteRect}>
      <h3 className={styles.subtitle5}>Votre dossier d’inscription</h3>
      <div className={styles.collapsibleHeader} onClick={toggleCollapsible}>
    
      <Collapsible 
        open={isOpen}
         trigger={<div className={styles.collapsibleContainer}>
        Contenu du dossier
        <img
          className={cn(styles.chevronIcon, isOpen && styles.chevronIconOpen)}

          src={"/assets/chevron.svg"}
          alt="alt text"
        />
         </div>}
         triggerClassName={styles.collapsibleTrigger}
          triggerOpenedClassName={styles.collapsibleTriggerOpened}
          contentOuterClassName={styles.collapsibleContentOuter}
          contentInnerClassName={styles.collapsibleContentInner}
          transitionTime={200}
          easing="ease-out"
          >
      <p className={styles.text37}>
              ✓ Copie de la carte d'identite.
              <br />✓ Extrait de naissance.
              <br />✓ Extrait des roles des parents.
              <br />✓  certificat Medical.
            </p>
      </Collapsible>
      </div>

      <div className={styles.collapsibleHeader} onClick={toggleCollapsible1}>
    
      <Collapsible 
        open={isOpen1}
         trigger={<div className={styles.collapsibleContainer}>
        Convention
        <img
          className={cn(styles.chevronIcon, isOpen1 && styles.chevronIconOpen)}

          src={"/assets/chevron.svg"}
          alt="alt text"
        />
         </div>}
         triggerClassName={styles.collapsibleTrigger}
          triggerOpenedClassName={styles.collapsibleTriggerOpened}
          contentOuterClassName={styles.collapsibleContentOuter}
          contentInnerClassName={styles.collapsibleContentInner}
          transitionTime={200}
          easing="ease-out"
          >
      <p className={styles.text37}>
              ✓ Copie de la carte d'identite.
              <br />✓ Extrait de naissance.
              <br />✓ Extrait des roles des parents.
              <br />✓  certificat Medical.
            </p>
      </Collapsible>
      </div>

      <h3 className={styles.subtitle3}>Documents a telecharger</h3>
      <div className={styles.docContainer}>
        <div className={styles.docCard}>
          <h3 className={styles.reglement}>Reglement interieur</h3>
          <button className={styles.downloadBtn}>
          <img
          src={"/assets/telecharger.svg"}
          alt="alt text"
          className={styles.downloadImg}
        />
          </button>
          
        </div>

        <div className={styles.docCard}>
          <h3 className={styles.reglement}>Reglement interieur</h3>
          <button className={styles.downloadBtn}>
          <img
          src={"/assets/telecharger.svg"}
          alt="alt text"
          className={styles.downloadImg}
        />
          </button>
          
        </div>

        <div className={styles.docCard}>
          <h3 className={styles.reglement}>Reglement interieur</h3>
          <button className={styles.downloadBtn}>
          <img
          src={"/assets/telecharger.svg"}
          alt="alt text"
          className={styles.downloadImg}
        />
          </button>
          
        </div>
      </div>

      </div>

    </div>
    <Footer/>
    </div>
    
  );
}

AvantPromo.propTypes = {
  className: PropTypes.string,
};

export default AvantPromo;
