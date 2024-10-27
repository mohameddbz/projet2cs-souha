import { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/navbar/navbar'
import axios from 'axios';
import './FormationAvantPromo.css'
import image from '../../assets/Symbol.svg'
import moduleImage from '../../assets/module.svg'
import ButtonComponent from '../../components/Relex/ButtonComponent'

import { color } from 'framer-motion'

function FormationAvantPromo() {
  // State to store formation data
    const [formation, setFormation] = useState(null);
    const [isContenuOpen, setIsContenuOpen] = useState(false);
     const [isConventionOpen, setIsConventionOpen] = useState(false);
  
    const handleToggleContenu = () => {
      setIsContenuOpen(!isContenuOpen);
    };
  
    const handleToggleConvention = () => {
      setIsConventionOpen(!isConventionOpen);
    };
  // Fetch formation with ID 1
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/formations/1/`) // Replace with the correct endpoint
      .then(response => {
        setFormation(response.data);
      })
      .catch(error => {
        console.error('Error fetching formation:', error);
      });
  }, []);


  
    return (
      <div style={{maxWidth:'100%'}}>
        <Navbar/>
        
        {/* <div style={{maxWidth:'100%'}}> */}
        <div style={{maxWidth:'100%'}}>
         <div className='container-formation-avant-promo'>
            <hr className='line'/>
            <div className='titrediv'>
                <div className='titlediv'>
                <h1 className='title-formation'>Formation Avant Promo</h1>
                <hr className="line" />
                </div>
                <div className='buttondiv'>
                <ButtonComponent text="Aller inscrire" link="esi.dz" />
                {/* <hr className="line" /> */}
                </div>
            </div>
              <div className='description'>
                 {/* Introduction (first column, first row) */}

      <section className="intro-section">
        
        <p>
          L'école nationale supérieure d'informatique organise la 4ème session de formation avant promotion 
          « Mars 2024 » pour l'accès au grade d'assistant ingénieur en informatique Niveau 1 au profit 
          des techniciens supérieurs en informatique des établissements publics.
        </p>
        <p>
          La formation permettra l'accès au grade d'assistant en informatique et contient un enseignement 
          de 210 heures réparti sur 7 mois à raison d'une semaine par mois.
        </p>
      </section>

      {/* Contact Us (second column, first row) */}
      <section className="contact-section">
        <h3>Contactez-Nous !</h3>
        <p>
          Vous avez des questions sur les études à ESI ? Nous vous invitons à entrer en contact avec notre équipe 
          des formations pour en savoir plus.
        </p>
        <ButtonComponent text="Contactez nous" link="esi.dz" /> {/* Use the pre-made ContactButton component here */}
      </section>

      {/* What you will learn section (first column, second row) */}
      <section className="learn-section">
        <h2>Ce que vous apprendrez :</h2>
        <ul>
          <li>
            Acquérir des compétences de base en informatique, y compris la programmation et la manipulation des données.
          </li>
          <li>
            Comprendre les principes et les technologies des réseaux informatiques pour la communication et le partage de ressources.
          </li>
          <li>
            Maîtriser les systèmes d'information, y compris la gestion de bases de données et l'analyse des données.
          </li>
          <li>
            Développer des compétences dans le développement logiciel, en utilisant divers langages et frameworks pour créer des applications et des systèmes.
          </li>
          <li>
            Cultiver des compétences transversales telles que la résolution de problèmes, la collaboration et la communication pour réussir dans un environnement professionnel.
          </li>
        </ul>
      </section>

      {/* Agenda (second column, second row) */}
      <section className="agenda-section">
        <h3>Agenda</h3>
        <div className="agenda-item">
              
              <div className="agenda-rect">
                <h3 className="agenda-date">{formation 
                      ? new Date(formation.date_debut).toLocaleDateString('fr-FR', {  day: 'numeric' })
                      : '20'}</h3>
                <div className="agenda-date">{formation 
                      ? new Date(formation.date_debut).toLocaleDateString('fr-FR', { month: 'long' })
                      : 'Janvier'}</div>
              </div> 
              <div className="rect">
              <p className='agenda-info'>
  {'Formation avant promotion ' + 
    (formation 
      ? new Date(formation.date_debut).toLocaleDateString('fr-FR', { year: 'numeric' })
      : '2020')
  }
</p>

          <p>{formation 
                      ? new Date(formation.date_debut).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                      : 'Lundi 20 Janvier 2024'}</p>
          <p>@ ESI, Oued Smar Alger, 16309</p>
              </div>
         
        </div>
      </section>
     
            </div>  




<div className='coeur-formation'>
<h2>Programme de la formation</h2>
<div className="programme-formation">
              
            {formation?.Module && Array.isArray(formation.Module) && formation.Module.map((course, index) => (
    <div key={index} className="modules-formation">
      <img src={moduleImage} alt={course.titre} className="course-image" />
      <div className="course-title">
        <h4>{course.titre}</h4>
      </div>
    </div>
  ))}




    </div>
</div>
          
         </div>
         <div className="dossier-container">
      <h2>Votre dossier d'inscription</h2>
      <div className="dossier-item">
        <div className="dossier-header" onClick={handleToggleContenu}>
          <span className="dossier-title">Contenu du dossier</span>
          <span className="dossier-toggle">{isContenuOpen ? '▲' : '▼'}</span>
        </div>
        {isContenuOpen && <div className="dossier-content">Contenu du dossier </div>}
      </div>
      <hr className='line'/>
      <div className="dossier-item">
        <div className="dossier-header" onClick={handleToggleConvention}>
          <span className="dossier-title">Convention</span>
          <span className="dossier-toggle">{isConventionOpen ? '▲' : '▼'}</span>
        </div>
        {isConventionOpen && <div className="dossier-content">Convention details </div>}
      </div>

      <h2>Documents à télécharger</h2>
      <div className="documents-container">
        {[1, 2, 3].map((doc, index) => (
          <div key={index} className="document-card">
            <div className="document-header">
              <h4>
                Règlement intérieur
                </h4>
              </div>
            <div className="document-body">
              <div className='telechargement'>
                <img src={image} alt="PDF Icon" className="pdf-icon" /></div>
             <div> <button className="download-button">Télécharger</button></div>
            </div>
          </div>
        ))}
      </div>
    </div>

          <Footer/>
        </div> 
      </div>
    )
  }
  
  export default FormationAvantPromo