import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import styles from "./DetailsClubsFinale.module.scss"
import Slider from "react-slick";
function CarouselFeedback(props)
{
    const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};


    return (
        <Slider {...settings}>
   <img className={styles.carouselcard4} src={'/assets/testimonial.svg'} alt="alt text" />
   <img className={styles.carouselcard4} src={'/assets/testimonial.svg'} alt="alt text" />
   <img className={styles.carouselcard4} src={'/assets/testimonial.svg'} alt="alt text" />
   <img className={styles.carouselcard4} src={'/assets/testimonial.svg'} alt="alt text" />
   <img className={styles.carouselcard4} src={'/assets/testimonial.svg'} alt="alt text" />
   <img className={styles.carouselcard4} src={'/assets/testimonial.svg'} alt="alt text" />
    </Slider>
    )
}


export default CarouselFeedback;