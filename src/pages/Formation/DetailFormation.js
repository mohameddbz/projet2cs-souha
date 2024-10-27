import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import detailFormation from '../../assets/DetailFormation.png';
import './DetailFormation.css';
import { useParams } from 'react-router-dom';
const DetailFormation = () => {
  const {id} = useParams();
  const [formation, setFormation] = useState(null);
  const [competences, setCompetences] = useState([]);

  useEffect(() => {
    const fetchFormationDetails = async () => {
      try {
        // 1. Récupérer les détails de la formation
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/theme-formation/${id}/`);
        const formationData = response.data;

        // 2. Récupérer les chapitres et les compétences pour chaque cours
        const coursWithDetails = await Promise.all(
          formationData.cours.map(async (cours) => {
            // Récupération des chapitres
            const chapitres = await Promise.all(
              cours.chapitres.map((chapitreId) =>
                axios.get(`${process.env.REACT_APP_API_URL}/chapitre/${chapitreId}/`)
              )
            );

            // Récupération des compétences
            const coursCompetences = await Promise.all(
              cours.competences.map((competenceId) =>
                axios.get(`${process.env.REACT_APP_API_URL}/competence/${competenceId}/`)
              )
            );

            return {
              ...cours,
              chapitres: chapitres.map(res => res.data), // Retourner les chapitres
              competences: coursCompetences.map(res => res.data), // Retourner les compétences
            };
          })
        );

        // Mise à jour de l'objet formation avec les cours et leurs détails
        setFormation({ ...formationData, cours: coursWithDetails });

        // Récupération de toutes les compétences uniques de la formation
        const allCompetences = coursWithDetails.flatMap(cours => cours.competences);
        setCompetences([...new Set(allCompetences.map(c => c.nom))]); // Évite les doublons
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    // Appel de la fonction pour récupérer les données de la formation
    fetchFormationDetails();
  }, []);

  if (!formation) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <Navbar />
      <div className="header-container">
        <div className="course-description">
          <h1>{formation.titre}</h1>
          <p>
          Une formation complète et de qualité, alliant théorie et pratique, conçue pour développer des compétences solides et applicables immédiatement dans un contexte professionnel.   </p>
          <div className="course-info">
            <span className="rating">5.0 ★★★★★</span>
            {/* <p className="instructor">Enseigné par Ilyes Benamor</p> */}
            <p>1382 Apprenants</p>
            <p>Créée le 10/03/2024</p>
            <p>Anglais • Français</p>
          </div>
        </div>

        <div className="course-details">
          <img src={detailFormation} alt="Course" className="course-image" />
          <h3>La formation implique :</h3>
          <ul>
            <li>Niveau Débutant - Intermédiaire</li>
            <li>Du 07/03/2024 au 07/05/2024</li>
            <li>20 heures d'apprentissage</li>
            <li>Certification à la fin de la formation</li>
            <li>Matériel téléchargeable</li>
            <li>Présentiel</li>
          </ul>

          <div className="brochure-buttons">
            <button>Brochure</button>
            <button>Convention</button>
          </div>

          <div className="price-simulator">
            <h4>A propos des prix</h4>
            <p>Essayez notre simulateur de devis</p>
            <button className="simulate-button">Simuler</button>
          </div>
        </div>
      </div>

      <div className="what-youll-learn">
        <h3>Titres des cours de formation</h3>
        <ul>
          {formation.cours.map((cours, index) => (
            <li key={index}>{cours.titre}</li>
          ))}
        </ul>
      </div>

      <div className="what-youll-learn">
        <h2>Programme de la formation</h2>
        {formation.cours.map((cours, index) => (
          <div key={index}>
            <h3>{cours.titre}</h3>
            {cours.chapitres.length > 0 ? (
              <ul>
                {cours.chapitres.map((chapitre, idx) => (
                  <li key={idx}>
                    <strong>{chapitre.titre} :</strong> {chapitre.contenu} (Durée: {chapitre.duree} min)
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun chapitre disponible</p>
            )}
          </div>
        ))}
      </div>

      <div className="what-youll-learn">
        <h2>Compétences couvertes par cette formation :</h2>
        {competences.length > 0 ? (
          <ul>
            {competences.map((competence, index) => (
              <li key={index}>{competence}</li>
            ))}
          </ul>
        ) : (
          <p>Aucune compétence disponible</p>
        )}
      </div>

      
      <Footer />
    </div>
  );
};

export default DetailFormation;
