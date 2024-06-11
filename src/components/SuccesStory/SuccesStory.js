import React from 'react'
import Slider from "react-slick";
import SuccesCard from './SuccesCard';
import './slick-theme.css'
import './slick.css'

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" , borderRadius:"50%"  }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block",  borderRadius:"50%" }}
      onClick={onClick}
    />
  );
}
function SuccesStory (){
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  const tab = [1,2,3,4,5]
  return (
    <div className='succesStory-totale'>
      <div className="SuccesTitre">Découvrer Nos <span className="succes-span">Histoire de Succès</span></div>
      <hr className="hr-line1"/>
      <div className='succes-full-container'>
        <div className='succes-container'>
          <Slider {...settings}>
            {tab.map((item)=>{
              return(
                <SuccesCard/>
              )
            })}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default SuccesStory