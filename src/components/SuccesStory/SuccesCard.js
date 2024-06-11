import React from 'react'
import succes from '../../assets/images/succes.png'
import './SuccesStory.css'

function SuccesCard () {
  return (
    <div className='succesCard-full-conatiner'>
        <div className='succesCard-container'>
            <img className='succesImg' src={succes} alt=''></img>
            <div className='SuccesDescription'>
                <div className='SuccesTitle'>
                    Amine REMACHE gagne le prix du sponsor "J.P. Morgan" à Oxford : 
                </div>
                <div className='SuccesParag'>
                    Un de nos étudiants Amine REMACHE était parmi l'équipe gagnante du prix 
                    du sponsor « J.P. Morgan » durant le hackathon « OxfordHack 2018 » qui s'est 
                    déroulé le 24 et 25 novembre dernier, à l'institut des mathématiques de l'université 
                    d'Oxford en Angleterre.<br/>
                    Le projet appelé « Oxaster », consistait à développer une application 
                    qui sert à gérer les volontaires proposant leur aide durant une catastrophe naturelle en 
                    exploitant les données des réseaux sociaux pour définir les zones nécessitant le plus de secours.
                </div>
            </div>
        </div>
    </div>
  )
}

export default SuccesCard;