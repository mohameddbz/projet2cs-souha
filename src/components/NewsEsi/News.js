import React, { useRef } from 'react';
import './news.css'; // Assurez-vous que le chemin est correct pour votre fichier CSS
import content from './contenu';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAnglesLeft, faAnglesRight} from '@fortawesome/free-solid-svg-icons';

function News (){
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
            {content.map((item)=>{
              return(
                <div className="itemCard" style={{ backgroundImage: `url(${item.photo})` }}>
                  <Card titre={item.title} description={item.description}/>
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
