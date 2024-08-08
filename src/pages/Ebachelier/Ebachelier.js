import React , { useState } from 'react';
import Node from '../../components/Pres/Pres';
import './Ebachelier.css';
import { FaBrain, FaEye, FaHeartbeat, FaUser } from 'react-icons/fa';
import { FaComments } from 'react-icons/fa';
import { FaFileAlt } from 'react-icons/fa'; // Importing file icon from react-icons
import galeriEsiImage from '../../assets/im1.jpeg';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';


const testimonials = [
  {
    name: "Mohamed BENAMER",
    role: "Consultant ERP",
    imageUrl: galeriEsiImage,
    text: "Étudier à l'ESI est une source de fierté pour moi. Choisir la filière Systèmes d'Information correspond parfaitement à mon travail."
  },
  {
    name: "Mezaine DAHOU",
    imageUrl: galeriEsiImage,
    role: "Entrepreneur",
    text: "Étudier à l'ESI est une fierté pour moi. J'y ai acquis des connaissances exceptionnelles en obstétrique, et j'ai été formée et éduquée pour être fiable sur le marché du travail."
  },
  { imageUrl: galeriEsiImage,
    name: "Mohamed BENAMER",
    role: "Consultant ERP",
    text: "Étudier à l'ESI est une source de fierté pour moi. Choisir la filière Systèmes d'Information correspond parfaitement à mon travail."
  }
 
];

 

const Ebachelier = () => {
  const [index, setIndex] = useState(0);

const handlePrev = () => {
  // S'assure de revenir au dernier index possible qui montre toujours deux témoignages
  // Si l'index actuel est 0 ou 1, il se déplace vers les deux derniers éléments.
  setIndex((prevIndex) => prevIndex - 2 < 0 ? testimonials.length - (testimonials.length % 2 === 0 ? 2 : 1) : prevIndex - 2);
};

const handleNext = () => {
  // Avance de deux en deux, mais revient au début si dépasse le nombre de témoignages
  // S'assure de ne pas dépasser la fin de la liste en prenant en compte le nombre restant de témoignages.
  setIndex((prevIndex) => (prevIndex + 2 >= testimonials.length ? 0 : prevIndex + 2));
};

// Utilisation de slice pour obtenir toujours deux témoignages
const displayedTestimonials = testimonials.slice(index, index + 2);
if (displayedTestimonials.length < 2) {
  displayedTestimonials.push(...testimonials.slice(0, 2 - displayedTestimonials.length));
}
  const nodes = [
    { id: 1, x: 553.78, y: 83.88, icon: <FaUser color='#0061B1' />, size: 72, color: '#FFFFFF' }, // Icône de la tête d'un humain pour le nœud central
    { id: 2, x: 461.52, y: 74.89, icon: <FaHeartbeat color='#0061B1' />, size: 44 }, // Icône de cœur
    { id: 3, x: 674.86, y: 67.9, icon: <FaEye color='#0061B1' />, size: 44 }, // Icône d'œil
    { id: 4, x: 568.19, y: 17, icon: <FaBrain color='#0061B1' />, size: 44 }, // Icône de cerveau
    { id: 5, x: 416.35, y: 176.7, icon: '', size: 26 },
    { id: 6, x: 301.03, y: 153.74, icon: '', size: 49, color: '#FFFFFF' },
    { id: 7, x: 740.21, y: 151.75, icon: '', size: 48, color: '#FFFFFF' },
    { id: 8, x: 941.06, y: 139.77, icon: '', size: 29, color: '#FFFFFF' },
    { id: 9, x: 868.02, y: 233.6, icon: '', size: 19, color: '#FFFFFF' },
  ];
  

  const edges = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 1, to: 5 },
    { from: 1, to: 7 },
    { from: 5, to: 6 },
    { from: 7, to: 8 },
    { from: 7, to: 9 },
    { from: 8, to: 9 },
    { from: 5, toBottom: true },
    { from: 6, toBottom: true },
    { from: 6, toBottom: true },
    { from: 7, toBottom: true },
    { from: 8, toBottom: true },
    { from: 9, toBottom: true },
  ];
  const getNodePosition = (id) => nodes.find(n => n.id === id);
  const containerBottomEdgeY = 300;

  return (
    <div>
      <Navbar/>
 <div className="bachelier-container">
      <p className="network-message">
      Bienvenue sur notre espace E-bachelier, dédié à vous, futurs pionniers de l'ingénierie !
      </p>
      <div className="network">
        <svg className="connections">
          {edges.map((edge, index) => {
            const fromNode = getNodePosition(edge.from);
            let x2;
            if (edge.toBottom) {
              switch (fromNode.id) {
                case 5:
                  x2 = fromNode.x +100; // Décalage plus à droite
                  break;
                case 6:
                  x2 = fromNode.x - 150; // Décalage plus à gauche
          
                  break;
                case 7:
                  x2 = fromNode.x- 50; // Directement en dessous
                  break;
                case 8:
                  x2 = fromNode.x + 100; // Plus loin à droite
                  break;
                case 9:
                  x2 = fromNode.x; // Plus loin à gauche
                  break;
                default:
                  x2 = fromNode.x + (fromNode.size / 2); // Fallback pour tout autre cas
              }
              return (
                <line key={index}
                      x1={fromNode.x + fromNode.size / 2}
                      y1={fromNode.y + fromNode.size / 2}
                      x2={x2}
                      y2={containerBottomEdgeY}
                      stroke="white" strokeWidth="0.5" />
              );
            } else {
              const toNode = getNodePosition(edge.to);
              return (
                <line key={index}
                      x1={fromNode.x + fromNode.size / 2}
                      y1={fromNode.y + fromNode.size / 2}
                      x2={toNode.x + toNode.size / 2}
                      y2={toNode.y + toNode.size / 2}
                      stroke="white" strokeWidth="0.5" />
              );
            }
          })}
        </svg>
        {nodes.map(node => (
          <Node key={node.id} {...node} />
        ))}
      </div>
    </div>
    <div className="fablab-section">
        <h1 className="fablab-header">E-bachelier communité</h1>
        <p className="fablab-description">
        Nous sommes ravis de vous accueillir dans notre communauté universitaire.
         Ici, vous découvrirez tout ce dont vous avez besoin pour démarrer cette nouvelle aventure
          passionnante avec confiance et succès. Ensemble, façonnons l'avenir !
        </p>
      </div>
      <div className="ingenium-connect-container">
      <div className="ingenium-connect-text">
        <p>
          Pour toute préoccupation ou question, rejoignez 'Ingénium Connect', notre plateforme communautaire,
          et connectez-vous avec des étudiants, alumni, et bacheliers passionnés d'ingénierie.
        </p>
      </div>
      <div className="ingenium-connect-logo">
        <FaComments size={110} color="#0061B1" />
        <button>Ingenium-connect</button>
      </div>
    </div>
    <div className="guide-container">
      <h1 className="guide-title">Guide d'inscription pour les futures Bacheliers</h1>
      <div className="cards-container">
        <div className="card">
          <div className="icon-circle"><FaFileAlt /></div>
          <p>Inscription définitive en ligne</p>
        </div>
        <div className="card">
          <div className="icon-circle"><FaFileAlt /></div>
          <p>Paiement des droits d'inscription</p>
        </div>
        <div className="card">
          <div className="icon-circle"><FaFileAlt /></div>
          <p>Documents originaux</p>
        </div>
      </div>
      <button className="read-more-button">Lire plus</button>
    </div>
    <div className="gallery-grid">
      <div className="grid-item image" style={{ backgroundImage: `url(${galeriEsiImage})` }}></div>
      <div className="grid-item text">
        <h2>Alumni</h2>
        <p>Les anciens de l'ESI sont dispersés dans différentes régions, s'engageant au niveau national et mondial.</p>
        <button className='buttonn'>Voir plus →</button>
      </div>
      
      <div className="grid-item image" style={{ backgroundImage: `url(${galeriEsiImage})` }}></div>
      <div className="grid-item text">
        <h2>Galeri ESI</h2>
        <p>Galeries de photos et de vidéos des activités des étudiants et du personnel de l'ESI.</p>
        <button className='buttonn'>Voir plus →</button>
      </div>
      
      <div className="grid-item image" style={{ backgroundImage: `url(${galeriEsiImage})` }}></div>
      <div className="grid-item text">
        <h2>Clubs Etudiants</h2>
        <p>Unis dans la diversité, nous cultivons l'excellence et l'innovation. Ensemble, nous façonnons l'avenir au sein de nos clubs étudiants.</p>
        <button className='buttonn'>Voir plus →</button>
      </div>
    </div>
    <div className="testimonials-container">
    <div className="testimonials-header">
  <div>
    <h1>Avis des Alumnis</h1>
    <p className="testimonials-text">
      Qu'est-ce que les anciens disent après avoir acquis des connaissances à l'École nationale supérieure d'informatique ?
    </p>
  </div>
  <div className="navigation">
    <button onClick={handlePrev}><FaArrowLeft color="#0061B1" /></button>
    <button onClick={handleNext}><FaArrowRight color="#0061B1" /></button>
  </div>
</div>
<div className="testimonial-cards">
        {displayedTestimonials.map((testimonial) => (
          <div className="testimonial-card" key={testimonial.name}>
             <div className="testimonial-text-container">
             <div className="testimonial-image" style={{ backgroundImage: `url(${testimonial.imageUrl})` }}></div>
    <h3 className="testimonial-name">{testimonial.name}</h3>
    <p className="testimonial-role">{testimonial.role}</p>
    <p className="testimonial-text">{testimonial.text}</p>
  </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
   
  );
};

export default Ebachelier;
