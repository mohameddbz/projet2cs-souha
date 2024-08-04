import React from 'react';
import { FaUserAlt, FaMicrochip, FaLaptop } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './PagePres.css'; // CSS du FabLabPage
import ExplorationSection from '../../components/ExplorerFab/ExplorerFab';
import Accordion from '../../components/Charte/Charte';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';

const accordionData = [
  { id: 1, name: "Objet", details: "Détails sur l'objet de la charte du FABLAB." },
  { id: 2, name: "Personnes autorisées", details: "Détails sur qui est autorisé à utiliser le FABLAB." },
  { id: 3, name: "Sécurité et Propreté", details: "Détails sur la sécurité de la charte du FABLAB." },
  { id: 4, name: "Engagement et Fonctionnement", details: "Détails sur l'engagement et le fonctionnement de la charte du FABLAB." },
  { id: 5, name: "Propriété Intellectuelle", details: "Détails sur la propriété intellectuelle de la charte du FABLAB." },
  // Ajoutez d'autres sections ici
];

function FabLabPage() {
  const navigate = useNavigate();

  const handleScrollToCharte = () => {
    const charteElement = document.getElementById('charte-section');
    if (charteElement) {
      charteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="fablab-container">
        <div className="title-container">
          <h1 className="fablab-title">ESI Fablab</h1>
        </div>
        <div className="hexagon-container">
          <div className="hexagon">
            <FaUserAlt className='icon' />
            <p className='text-fab'>Pensée innovante</p>
          </div>
          <div className="hexagon">
            <FaMicrochip className='icon'/>
            <p className='text-fab'>Matériel</p>
          </div>
          <div className="hexagon">
            <FaLaptop className='icon'/>
            <p className='text-fab'>Qualité méthodologique</p>
          </div>
        </div>
      </div>
      <div className="fablab-section">
        <h1 className="fablab-header">FABLAB</h1>
        <p className="fablab-description">
          L'ESI-FabLab est un espace ouvert dédié à la fabrication numérique, favorisant 
          l'interdisciplinarité et l'apprentissage par la pratique, principalement pour 
          les étudiants de l'ESI. Son objectif est de fournir un environnement équipé 
          d'outils technologiques pour concrétiser des projets innovants et utiles. Il 
          encourage la collaboration, le partage de connaissances et la génération 
          d'idées nouvelles.
        </p>
      </div>
      <div className="next-section">
        <div className="column text-and-buttons">
          <h1 className='video-text'>
            Équipement Électronique du Laboratoire : 
            <p className='video-text2'>Explorez notre Arsenal Technologique!</p>
          </h1>
          <div className="buttons-container">
            <button className="button1" onClick={() => navigate('/FabLab/Demande_piece')}>Demander</button>
            <button className="button2" onClick={handleScrollToCharte}>Lire la Charte</button>
          </div>
        </div>
        <div className="column video-container">
          <div className="video-wrapper">
            <video width="320" height="240" controls>
              <source src="movie.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      <ExplorationSection />
      <div id="charte-section">
        <Accordion data={accordionData} />
      </div>
      <Footer />
    </div>
  );
}

export default FabLabPage;
