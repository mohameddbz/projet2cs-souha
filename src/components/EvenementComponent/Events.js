import React, { useRef } from "react";
import Slider from "react-slick";
import EventCard from "./EventCard";
import './Events.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

function Events() {
  const nb=[1,2,3,4,5];
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
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

          {nb.map((item)=>{
            return(
              <EventCard/>
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