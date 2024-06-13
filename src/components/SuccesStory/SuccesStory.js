import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import SuccesCard from './SuccesCard';
import './slick-theme.css';
import './slick.css';
import axios from 'axios';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

function SuccesStory() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

// tableau de dépendances vide pour appel unique

  const loadDataPublications = () => {
    axios.get('http://localhost:8000/publication/searchall/?type_publication=success%20story&etat=valide')
      .then(res => {
        console.log(res.data.length);
        setCards(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadDataPublications();
  }, []); 

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className='succesStory-totale'>
      <div className="SuccesTitre">Découvrez Nos <span className="succes-span">Histoires de Succès</span></div>
      <hr className="hr-line1" />
      <div className='succes-full-container'>
        <div className='succes-container'>
          <Slider {...settings}>
            {cards.map((item, index) => (
              <div style={{textAlign:"center", alignSelf:"center", margin:"auto"}}>
                <SuccesCard key={index} picture={`http://localhost:8000${item.image}`} titre={item.titre} description={item.description} />
              </div>
              
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default SuccesStory;
