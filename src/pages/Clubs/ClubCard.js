import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import styles from "./Clubs.module.scss"
import { Link } from 'react-router-dom';
import Slider from "react-slick";
function ClubCard(props)
{
    const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};


    return (
    <div className={styles.importedCarouselItem}>
   <div className={styles.carouselRect}>
    <img className={styles.carouselInfo} src={'/assets/carouselInfo.svg'} alt="alt text" />
    <div className={styles.iconsRow}>
            <Link to="LinkedInPage">
            <img className={styles.icon} src={'/assets/xIcon.svg'} alt="alt text" /></Link>
           <img className={styles.icon} src={'/assets/fbIcon.svg'} alt="alt text" />
           <img className={styles.icon} src={'/assets/instaIcon.svg'} alt="alt text" />
           <img className={styles.icon} src={'/assets/linkedinIcon.svg'} alt="alt text" />
           <img className={styles.icon} src={'/assets/ytbIcon.svg'} alt="alt text" />
           </div>
           <Link to="/DetailsClubsFinale">
           <img className={styles.lirePlusClub} src={'/assets/lirePlusClub.svg'} alt="alt text" />
           </Link>
        
    </div>

    </div>
    )
}


export default ClubCard;