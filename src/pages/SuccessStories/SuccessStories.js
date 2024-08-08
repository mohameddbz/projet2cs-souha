import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./SuccessStories.module.scss";
import Chatbot from "../../components/chatbot/Chatbot";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import CarouselAlumni from "./CarouselAlumni";
import MapComponent from "./MapComponent";
import { GoMail } from 'react-icons/go';
import { FaPhone } from 'react-icons/fa';
import { MdPlace } from 'react-icons/md';
import axios from "axios";
import '../Annuaire/Annuaire.css';

const pageSize = 6;

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function SuccessStories(props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [cards, setCards] = useState([]);
  const [showMoreAlumniContacts, setShowMoreAlumniContacts] = useState(false);
  const [promos, setPromos] = useState([]);
  const [selectedPromo, setSelectedPromo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadDataInfo();
        await loadDataAnnuaireAlumni();
      } catch (err) {
        console.error('Error during data fetching:', err);
        setError('Error fetching data.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const loadDataInfo = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/annuaire/promotions/`);
      setPromos(res.data.promotions);
    } catch (err) {
      console.error('Error fetching promotions:', err);
      setError('Error fetching promotions.');
    } finally {
      setLoading(false);
    }
  };

  const loadDataAnnuaireAlumni = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/annuaire/alumnie/filter/`);
      setCards(res.data);
    } catch (err) {
      console.error('Error fetching alumni:', err);
      setError('Error fetching alumni.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPageCards = () => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return cards
      .filter(card => {
        const fullName = `${card.nom} ${card.prenom}`.toLowerCase();
        const matchesSearchTerm = fullName.includes(searchTerm.toLowerCase());
        const matchesPromo = selectedPromo === '' || card.promotion === selectedPromo;
        return matchesSearchTerm && matchesPromo;
      })
      .slice(startIndex, endIndex);
  };

  const handleVoirPlusClick = () => {
    setShowMoreAlumniContacts(!showMoreAlumniContacts);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <Chatbot />
      <div className={styles.SuccessStoriesContainer}>
        <img className={styles.alumniImg} src={'/assets/alumniImg.svg'} alt="Alumni" />
        <div className={styles.alumniDescContainer}>
          <img className={styles.alumniDesc} src={'/assets/alumniDesc.svg'} alt="Alumni Description" />
        </div>

        <div className={styles.centeredContainer}>
          <h2 className={styles.Title1}>Alumni episodes</h2>
          <iframe 
            className={styles.videoFrame} 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/wv_lnc3wBJM?si=i0H14c_zm7sQsR3j" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen>
          </iframe>
          <h3 className={styles.subtitle1}>
            Alumni Episode présente des interviews captivantes avec les anciens élèves de l'ESI, 
            mettant en lumière leurs parcours professionnels inspirants et leurs conseils précieux pour les étudiants actuels.
          </h3>
        </div>

        <CarouselAlumni />
        <div className={styles.centeredContainer}>
          <h2 className={styles.Title1}>OÙ SONT-ILS MAINTENANT?</h2>
          <div className={styles.carteContainer}>
            <img className={styles.blueRect} src={'/assets/blueRect.svg'} alt="Blue Rectangle" />
            <MapComponent />
            <div className="custom-line"></div>
            <h2>Alumni Contact</h2>
            <div className="container-img">
              <div className="annuaire-card-container">
                {getCurrentPageCards()
                  .filter((_, index) => showMoreAlumniContacts || index < 4)
                  .map((product, index) => (
                    <div key={index} className='annuaire-card'>
                      <img src={`${process.env.REACT_APP_API_URL}${product.photo}`} alt={product.title} />
                      <div className='annuaire-card-details'>
                        <h3 className='annuaire-title'>{product.nom} {product.prenom}</h3>
                        <section className='annuaire-card-review'>
                          <span>{product.service}</span>
                        </section>
                        <section className='annuaire-card-reviews'>
                          <div className='annuaire-icon-circle'>
                            <GoMail style={{ marginRight: '6px' }} />
                          </div>
                          <span>{product.email}</span>
                        </section>
                        <section className='annuaire-card-reviews'>
                          <div className='annuaire-icon-circle'>
                            <FaPhone style={{ marginRight: '6px' }} />
                          </div>
                          <span>{product.contact}</span>
                        </section>
                        <section className='annuaire-card-reviews'>
                          <div className='annuaire-icon-circle'>
                            <MdPlace size={34} style={{ marginRight: '6px' }} />
                          </div>
                          <span>{product.linkedin}</span>
                        </section>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <button className={styles.VoirPlusButton} onClick={handleVoirPlusClick}>
            {showMoreAlumniContacts ? "Voir Moins" : "Voir Plus"}
          </button>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

SuccessStories.propTypes = {
  className: PropTypes.string,
};

export default SuccessStories;
