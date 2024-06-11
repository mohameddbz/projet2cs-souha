import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import StarRatingComponent from "react-star-rating-component";
import { Link} from 'react-router-dom';
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";
import styles from "./index.module.scss";


function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}


function DF(props) {
  const [rating, setRating] = useState(1); // Initial rating state

  // Function to handle rating change
  const onStarClick = (nextValue) => {
    setRating(nextValue); // Update rating state
  };

  return (
    <div>
      <Navbar/>{/* Navbar */}
      <Chatbot/>
    <div className={cn(styles.root, props.className, "details-formation")}>
      <ScrollToTop />
      <div className={styles.rect1}>
        <div className={styles.detailsContainer}>
          <h3 className={styles.subtitle}>
            Formation Complète en Développement Mobile avec Flutter : Du Niveau
            Débutant à Expert
          </h3>
          <h5 className={styles.highlight}>
            Apprenez le développement mobile avec Flutter comme un
            professionnel,
            <br />
            {`en partant des bases jusqu'à la création de vos propres applications `}
            <br />
            mobiles.
          </h5>

          <div className={styles.ratingContainer}>
            <div className={styles.text}>5.0</div>
            <StarRatingComponent
              name="rate1" /* Unique name for the rating component */
              starCount={5} /* Total number of stars */
              value={rating} /* Current rating value */
              onStarClick={onStarClick} /* Function to handle rating change */
              starColor="#F59E0B"
            />
          </div>

          <div className={styles.info}>Certifiée</div>

          <div className={styles.text11_box}>
            <span className={styles.text11}>
              <span className={styles.text11_span0}>Enseignée par </span>
              <span className={styles.text11_span1}>Ilyes Benamor</span>
            </span>
          </div>

          <div className={styles.text1}>1,382 Apprenants</div>

          <div className={styles.languesContainer}>
            <img
              className={styles.image11}
              src={"/assets/black_and_white_dice.png"}
              alt="alt text"
            />
            <div className={styles.text11_box1}>
              <span className={styles.text11}>
                <span className={styles.text11_span0}>Anglais </span>
                <span className={styles.text11_span11}>· </span>
                <span className={styles.text11_span2}> </span>
                <span className={styles.text11_span3}>Francais</span>
              </span>
            </div>
          </div>

          <div className={styles.text2_box}>
            <span className={styles.text2}>
              <span className={styles.text2_span0}>cr</span>
              <span className={styles.text2_span1}>éée le 01/03/2024</span>
            </span>
          </div>

          <div className={styles.textContainer1}>
            <h3 className={styles.subtitle1}>Ce que vous apprendrez :</h3>
            <p className={styles.text37}>
              ✓ Maîtrisez Flutter pour créer des applications mobiles efficaces.
              <br />✓ Apprenez à utiliser les fonctionnalités avancées de
              Flutter pour créer des jeux et des applications interactives.
              <br />✓ Construisez un portefeuille de projets Flutter que vous
              pourrez partager avec les employeurs potentiels.
              <br />
              {`✓ Acquérez une compréhension approfondie du développement mobile avec Flutter, en partant des concepts fondamentaux jusqu'aux fonctionnalités avancées.`}
              <br />✓ Créez des interfaces utilisateur conviviales et
              attrayantes avec Flutter.
            </p>
          </div>

          <div className={styles.textContainer2}>
            <h3 className={styles.subtitle1}>Description</h3>
            <div className={styles.text37}>
              <p>
                Découvrez une formation complète et immersive en développement
                mobile avec Flutter, conçue pour vous guider de vos premiers pas
                jusqu'à la maîtrise avancée. Que vous soyez novice dans le
                domaine du développement ou que vous souhaitiez perfectionner
                vos compétences existantes, cette formation est faite pour vous.
              </p>
              <br></br>
              <ul>
                <li className={styles.listItems}>
                Formation complète et immersive en développement mobile avec
                  Flutter.
                </li>
                <li className={styles.listItems}>
                Conçue pour vous guider de vos premiers pas jusqu'à la
                  maîtrise avancée.
                </li>
                <li className={styles.listItems}>
                Adaptée aussi bien aux novices qu'aux personnes souhaitant
                  perfectionner leurs compétences existantes.
                </li>
                <li className={styles.listItems}>
                Apprentissage de l'utilisation de Flutter pour créer des
                  applications mobiles dynamiques et performantes.
                </li>
                <li className={styles.listItems}>
                Exploration de toutes les fonctionnalités offertes par ce
                  framework moderne.
                </li>
                <li className={styles.listItems}>
                Couverture détaillée de chaque aspect essentiel du
                  développement mobile.
                </li>
                <li className={styles.listItems}>
                Accès à des vidéos instructives, des exercices pratiques, des
                  projets concrets.
                </li>
                <li className={styles.listItems}>
                Fournir les compétences nécessaires pour devenir un
                  développeur d'applications mobiles professionnel.
                </li>
                <li className={styles.listItems}>
                Invitation à rejoindre la formation dès aujourd'hui pour
                  transformer les ambitions en réalisations tangibles.
                </li>
              </ul>
              <br></br>
              <p>
                En plus des vidéos instructives, vous aurez accès à des
                exercices pratiques, des projets concrets et des ressources
                supplémentaires pour consolider vos connaissances et renforcer
                votre compréhension de Flutter. Que vous aspiriez à devenir un
                développeur d'applications mobiles professionnel ou que vous
                souhaitiez simplement concrétiser vos idées créatives, cette
                formation vous fournira les compétences et la confiance
                nécessaires pour atteindre vos objectifs dans le monde du
                développement mobile avec Flutter. Rejoignez-nous dès
                aujourd'hui et transformez vos ambitions en réalisations
                tangibles !
              </p>
            </div>
            
          </div>

          <div className={styles.textContainer2}>
          <h3 className={styles.subtitle1}>Cette formation est idéale pour :</h3>
            <p className={styles.text37}>
              ✓ Les débutants qui souhaitent se lancer dans le développement mobile avec Flutter.
              ✓  Les développeurs expérimentés qui veulent maîtriser Flutter pour enrichir leurs compétences.
            </p>
          </div>











        </div>

       

        <div className={styles.rect3}>
          <img
            className={styles.image21}
            src={"/assets/business_presentation_group.png"}
            alt="alt text"
          />
          <h5 className={styles.highlight1}>La formation implique :</h5>

          <div className={styles.row1}>
            <img
              className={styles.image7}
              src={"/assets/user_silhouette_icon.png"}
              alt="alt text"
            />
            <div className={styles.text36}>Niveau Debutant - intermediaire</div>
          </div>

          <div className={styles.row1}>
            <img
              className={styles.image111}
              src={"/assets/crosshair_icon.png"}
              alt="alt text"
            />
            <div className={styles.text35}>Du 07/03/2024 au 07/05/2024</div>
          </div>

          <div className={styles.row1}>
            <div className={styles.imageContainer}>
              <img
                className={styles.image31}
                src={"/assets/99958096e01582a42b56826c5c052e45.png"}
                alt="alt text"
              />
              <img
                className={styles.image41}
                src={"/assets/14dc0d91e50b21423dde4c2fa3a21ed1.png"}
                alt="alt text"
              />
            </div>
            <div className={styles.text34}>200 heures d’apprentissage</div>
          </div>

          <div className={styles.row1}>
            <img
              className={styles.image6}
              src={"/assets/b32596392266ec36f86af2879ea0cfd9.png"}
              alt="alt text"
            />
            <div className={styles.text31}>
              Certification a la fin de formation
            </div>
          </div>

          <div className={styles.row1}>
            <div className={styles.imageContainer}>
              <img
                className={styles.image8}
                src={"/assets/527616c6da3ad2c46c9ff9eebdb0c85a.png"}
                alt="alt text"
              />
              <img
                className={styles.image9}
                src={"/assets/5c8db45b4e68420b02e07fc90108905e.png"}
                alt="alt text"
              />
            </div>

            <div className={styles.text32}>Materiel telechargeable</div>
          </div>

          <div className={styles.row1}>
            <img
              className={styles.image5}
              src={"/assets/148c18a98ee523eb103e13301d290857.png"}
              alt="alt text"
            />
            <div className={styles.text33}>Presentiel</div>
          </div>

          <div className={styles.text4_box}>
            <span className={styles.text4}>
              <span className={styles.text4_span0}>Brochure</span>
              <span className={styles.text4_span1}>  </span>
              <span className={styles.text4_span2}>· </span>
              <span className={styles.text4_span3}>  </span>
              <span className={styles.text4_span0}>Convention</span>
            </span>
          </div>

          <div className={styles.text5}>A propos des prix</div>
          <div className={styles.text3}>Essayer notre simulateur de devis </div>
          <Link to="/DemandeDevis">
          <button className={styles.simulButton}>
            <span className={styles.text6}>Simuler</span>
          </button>
          </Link>



        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

DF.propTypes = {
  className: PropTypes.string,
};

export default DF;
