import React, { useEffect, useState } from 'react'
import treePic from '../../assets/images/TreePic.jpg'
import './CardEvenement'

function CardEvenement (props) {
    const [animationClass, setAnimationClass] = useState('');

  // Déterminez si la carte doit être animée lorsqu'elle est active
  // Ajoutez la classe d'animation si isActive est true
  // Sinon, réinitialisez la classe d'animation
  useEffect(() => {
    if (props.isActive) {
      setAnimationClass('slideFromRight');
    } else {
      setAnimationClass('');
    }
  }, [props.isActive]);
  
  const getDayMonthYearFormatted = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }).slice(0, 3);
    const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
    const year = date.getFullYear();

    return { day, month: formattedMonth, year };
  };
  const { day, month, year } = getDayMonthYearFormatted(props.date);
  return (
        <div className={`cardEvenementContainer ${animationClass}`}>
            <div className='cardEvenementS1'>
                <div className='cardEvenementImgCont'>
                    <img src={props.Picture} alt='' className='cardEvenementImg'></img>
                    <div className='cardEvenementDate'><span className='cardEvnSpan'>{day}</span>{month} {year}</div>
                </div>
            </div>
            <div className='cardEvenementS2'>
                <div className='cardEvenementTitle'>{props.titre}</div>
                <div className='cardEvenementType'>(votre slogan ici)</div>
                <div className='cardEvenementDescription'>
                    {props.description}
                </div>
            </div>
        </div>
  )
}

export default CardEvenement