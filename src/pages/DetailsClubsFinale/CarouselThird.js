import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import styles from "./DetailsClubsFinale.module.scss"
import Slider from "react-slick";
function CarouselThird(props)
{
    const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};


    return (
        <Slider {...settings}>
   <img className={styles.carouselcard3} src={'/assets/card21.svg'} alt="alt text" />
   <img className={styles.carouselcard3} src={'/assets/card22.svg'} alt="alt text" />
   <img className={styles.carouselcard3} src={'/assets/card23.svg'} alt="alt text" />
   <img className={styles.carouselcard3} src={'/assets/card23.svg'} alt="alt text" />
   <img className={styles.carouselcard3} src={'/assets/card23.svg'} alt="alt text" />
    </Slider>
    )
}
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
      className={`${className} ${styles.nextArrow}`}
      >
        <img className={styles.nextArrow} src={'/assets/next.svg'} alt="alt text" />
      </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={`${className} ${styles.prevArrow}`}
        >
          <img className={styles.prevArrow} src={'/assets/prev.svg'} alt="alt text" />
        </div>
    );
  }

export default CarouselThird;