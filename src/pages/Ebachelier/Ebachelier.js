import React, { useState, useEffect } from 'react';
import Node from '../../components/Pres/Pres';
import './Ebachelier.css';
import { FaBrain, FaEye, FaHeartbeat, FaUser, FaComments, FaFileAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import galeriEsiImage from '../../assets/im1.jpeg';
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
  { 
    name: "Mohamed BENAMER",
    role: "Consultant ERP",
    imageUrl: galeriEsiImage,
    text: "Étudier à l'ESI est une source de fierté pour moi. Choisir la filière Systèmes d'Information correspond parfaitement à mon travail."
  }
];

function Ebachelier (){
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prevIndex) => prevIndex - 2 < 0 ? testimonials.length - (testimonials.length % 2 === 0 ? 2 : 1) : prevIndex - 2);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 2 >= testimonials.length ? 0 : prevIndex + 2));
  };

  const displayedTestimonials = testimonials.slice(index, index + 2);
  if (displayedTestimonials.length < 2) {
    displayedTestimonials.push(...testimonials.slice(0, 2 - displayedTestimonials.length));
  }

  const initialNodes = [
    { id: 1, x: 553.78, y: 83.88, icon: <FaUser color='#0061B1' />, size: 72, color: '#FFFFFF' },
    { id: 2, x: 461.52, y: 74.89, icon: <FaHeartbeat color='#0061B1' />, size: 44 },
    { id: 3, x: 674.86, y: 67.9, icon: <FaEye color='#0061B1' />, size: 44 },
    { id: 4, x: 568.19, y: 17, icon: <FaBrain color='#0061B1' />, size: 44 },
    { id: 5, x: 416.35, y: 176.7, icon: null, size: 26 },
    { id: 6, x: 301.03, y: 153.74, icon: null, size: 49, color: '#FFFFFF' },
    { id: 7, x: 740.21, y: 151.75, icon: null, size: 48, color: '#FFFFFF' },
    { id: 8, x: 941.06, y: 139.77, icon: null, size: 29, color: '#FFFFFF' },
    { id: 9, x: 868.02, y: 233.6, icon: null, size: 19, color: '#FFFFFF' },
  ];

  const [nodes, setNodes] = useState(
    initialNodes.map(node => ({
      ...node,
      relativeX: node.x / window.innerWidth,
      relativeY: node.y / window.innerHeight,
      initialSize: node.size
    }))
  );

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
    { from: 7, toBottom: true },
    { from: 8, toBottom: true },
    { from: 9, toBottom: true },
  ];

  const getNodePosition = (id) => nodes.find(n => n.id === id);

  return (
    <>
    <Navbar/>
    <div className='ebachelier'>
      <div className="bachelier-container">
        <p className="network-message">
          Bienvenue sur notre espace E-bachelier, dédié à vous, futurs pionniers de l'ingénierie !
        </p>
        <div className="network">
          <svg className="connections">
            {edges.map((edge, index) => {
              const fromNode = getNodePosition(edge.from);
              const fromNodeCenterX = fromNode.relativeX * window.innerWidth + (Math.min(window.innerWidth, window.innerHeight) * fromNode.initialSize / 2000);
              const fromNodeCenterY = fromNode.relativeY * window.innerHeight + (Math.min(window.innerWidth, window.innerHeight) * fromNode.initialSize / 2000);
              let x2, y2;

              if (edge.toBottom) {
                switch (fromNode.id) {
                  case 5:
                    x2 = fromNode.relativeX * window.innerWidth + 100;
                    break;
                  case 6:
                    x2 = fromNode.relativeX * window.innerWidth - 150;
                    break;
                  case 7:
                    x2 = fromNode.relativeX * window.innerWidth - 50;
                    break;
                  case 8:
                    x2 = fromNode.relativeX * window.innerWidth + 100;
                    break;
                  case 9:
                    x2 = fromNode.relativeX * window.innerWidth;
                    break;
                  default:
                    x2 = fromNode.relativeX * window.innerWidth + (Math.min(window.innerWidth, window.innerHeight) * fromNode.initialSize / 2000);
                }
                y2 = window.innerHeight;
                return (
                  <line key={index}
                        x1={`${fromNodeCenterX / window.innerWidth * 100}vw`}
                        y1={`${fromNodeCenterY / window.innerHeight * 100}vh`}
                        x2={`${x2 / window.innerWidth * 100}vw`}
                        y2={`100vh`}
                        stroke="white" strokeWidth="0.5" />
                );
              } else {
                const toNode = getNodePosition(edge.to);
                const toNodeCenterX = toNode.relativeX * window.innerWidth + (Math.min(window.innerWidth, window.innerHeight) * toNode.initialSize / 2000);
                const toNodeCenterY = toNode.relativeY * window.innerHeight + (Math.min(window.innerWidth, window.innerHeight) * toNode.initialSize / 2000);
                return (
                  <line key={index}
                        x1={`${fromNodeCenterX / window.innerWidth * 100}vw`}
                        y1={`${fromNodeCenterY / window.innerHeight * 100}vh`}
                        x2={`${toNodeCenterX / window.innerWidth * 100}vw`}
                        y2={`${toNodeCenterY / window.innerHeight * 100}vh`}
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
          Nous sommes ravis de vous accueillir dans notre communauté universitaire. Ici, vous découvrirez tout ce dont vous avez besoin pour démarrer cette nouvelle aventure passionnante avec confiance et succès. Ensemble, façonnons l'avenir !
        </p>
      </div>
      <div className="ingenium-connect-container">
        <div className="ingenium-connect-text">
          <p>
            Pour toute préoccupation ou question, rejoignez 'Ingénium Connect', notre plateforme communautaire, et connectez-vous avec des étudiants, alumni, et bacheliers passionnés d'ingénierie.
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
      </div>
      <Footer />
    </>
  );
};

export default Ebachelier;
