import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import styles from "./Clubs.module.scss"
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import ClubCard from './ClubCard';
function CarouselClub(props)
{
    const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  centerMode: true,
};


    return (
    
      <Slider className={styles.BigCarouselContainer} {...settings}>
        <ClubCard />
        <ClubCard/>
        <ClubCard/>
       </Slider>
    )
}


export default CarouselClub;