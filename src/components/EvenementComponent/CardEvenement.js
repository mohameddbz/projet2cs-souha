import React, { useEffect, useState } from 'react'
import treePic from '../../assets/images/TreePic.jpg'
import './CardEvenement'

function CardEvenement ({ isActive }) {
    const [animationClass, setAnimationClass] = useState('');

  // Déterminez si la carte doit être animée lorsqu'elle est active
  // Ajoutez la classe d'animation si isActive est true
  // Sinon, réinitialisez la classe d'animation
  useEffect(() => {
    if (isActive) {
      setAnimationClass('slideFromRight');
    } else {
      setAnimationClass('');
    }
  }, [isActive]);
  return (
        <div className={`cardEvenementContainer ${animationClass}`}>
            <div className='cardEvenementS1'>
                <div className='cardEvenementImgCont'>
                    <img src={treePic} alt='' className='cardEvenementImg'></img>
                    <div className='cardEvenementDate'><span className='cardEvnSpan'>06</span>Mar 2024</div>
                </div>
            </div>
            <div className='cardEvenementS2'>
                <div className='cardEvenementTitle'>Arbre pour chaque étudiant</div>
                <div className='cardEvenementType'>(compagne de reboisement)</div>
                <div className='cardEvenementDescription'>
                    Rejoignez-nous dans cette compagne de plantation de plus de 200 
                    arbres afin que nous nous engagions ensemble pour la protection 
                    de notre planète et de creer du lien convivial avec les d’autres 
                    étudiants partageant les memes valeurs.
                </div>
            </div>
        </div>
  )
}

export default CardEvenement