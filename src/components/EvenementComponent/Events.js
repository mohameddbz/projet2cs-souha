import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import EventCard from "./EventCard";
import './Events.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import CardEvenement from './CardEvenement';
import axios from "axios";

function Events() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const loadDataPublications = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/publication/event_publications`);
      console.log(response);
      setCards(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadDataPublications();
  }, []);

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const settings = {
    dots: false,
    infinite: cards.length > 1,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 992, // Width less than 992px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640, // Width less than 992px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 440, // Width less than 768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="EventsTotale">
      <div className='eventTitre'><span className='events-span'>Evènements</span> à venir</div>
      <hr className="hr-line2"/>
      <div className="events-full-container">
        <div style={{display:"grid", gridTemplateColumns:"5% 90% 5%", alignItems:"center"}}>
          <button className="button event" onClick={previous}>
            <FontAwesomeIcon icon={faAngleLeft} className=""/>
          </button>
          <div >
          <Slider className="events-container"
          ref={slider => {
            sliderRef = slider;
          }}
          {...settings}
        >

          {cards.map((pub, index)=>{
            return(
              <div style={{textAlign:"center", alignSelf:"center", margin:"auto"}}>
                <CardEvenement
                key={index}
                isActive={true}
                Picture={`${process.env.REACT_APP_API_URL}${pub.image}`}
                titre={pub.titre}
                description={pub.description}
                date={pub.date_debut}
              />
              </div>
            )
          })}
        </Slider></div>
          <button className="button event" onClick={next}>
            <FontAwesomeIcon icon={faAngleRight}/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Events;