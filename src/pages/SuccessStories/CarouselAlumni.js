import React , {useState,useRef} from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import styles from "./SuccessStories.module.scss"
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import ArticleCard from './articleCard';
function CarouselAlumni(props)
{
   
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      centerMode: true,
      afterChange: (index) => setCurrentSlide(index)
  };

  const handleNextSlide = () => {
      sliderRef.current.slickNext();
  };

  const handlePrevSlide = () => {
      sliderRef.current.slickPrev();
      setCurrentSlide(currentSlide - 1);
  };

  const getSubtitle = () => {
      // Add logic here to determine subtitle based on currentSlide index
      switch (currentSlide) {
          case 0:
              return "2014";
          case 1:
              return "2018";
          case 2:
              return "2021";
          case 3:
              return "2023";
          default:
              return "Unknown";
      }
  };

    return (
      <div>
      <div className={styles.centeredSubtitleArticle}>
          <div className={styles.subtitle2}>Promo
              <div className={styles.sliderContainer}>
                  <img className={styles.rightArrow} src={'/assets/rightArrow.svg'} alt="alt text" onClick={handlePrevSlide}/>
                  <div className={styles.subtitle3}>{getSubtitle()}</div>
                  <img className={styles.nextArrow} src={'/assets/nextArrow.svg'} alt="alt text" onClick={handleNextSlide}/>
              </div>
          </div>
      </div>
      <Slider className={styles.BigCarouselContainer} {...settings} ref={sliderRef}>
          <ArticleCard articlePath='/assets/alumniArticle.svg' />
          <ArticleCard articlePath='/assets/alumniArticle2.svg' />
          <ArticleCard articlePath='/assets/alumniArticle3.svg' />
      </Slider>
  </div>
    )
}


export default CarouselAlumni;