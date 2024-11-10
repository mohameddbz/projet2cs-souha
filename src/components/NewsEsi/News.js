import React, { useEffect, useRef, useState } from 'react';
import './news.css'; // Assurez-vous que le chemin est correct pour votre fichier CSS
import content from './contenu';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAnglesLeft, faAnglesRight} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function News (){
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  useEffect(() => {
    loadDataPublications();
  }, []);

  const loadDataPublications = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/publication/searchall/?type_publication=actualit%C3%A9&etat=valide`);
      setCards(res.data);
      console.log(res.data); // Logging the fetched data
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const slideRef = useRef(null);

  const nextSlide = () => {
    const lists = slideRef.current.querySelectorAll('.itemCard');
    slideRef.current.appendChild(lists[0]);
  };

  const prevSlide = () => {
    const lists = slideRef.current.querySelectorAll('.itemCard');
    slideRef.current.prepend(lists[lists.length - 1]);
  };

  return (
    <div className="actualite-section">
      <div className="ActualiteTitre">Explorer Nos <span className="actual-span">Actualités</span></div>
        <hr className="hr-line"/>
        <div className="Card-container">
          <div className="slideContainer" ref={slideRef}>
            {cards.map((item)=>{
              return(
                <div className="itemCard" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}${item.image})` }}>
                  <Card titre={item.titre} description={item.description}/>
                </div>
              )
            })}
          </div>
          <div className="Cardbuttons">
            <button id="prev" onClick={prevSlide}><FontAwesomeIcon icon={faAnglesLeft}/></button>
            <button id="next" onClick={nextSlide}><FontAwesomeIcon icon={faAnglesRight}/></button>
          </div>
      </div>
    </div>
  );
};

export default News;
