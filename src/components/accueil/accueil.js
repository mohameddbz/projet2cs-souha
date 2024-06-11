import React from 'react'
import './accueil.css'
import pic1 from '../../assets/images/Rectangle\ 463.svg'
import Chatbot from '../chatbot/Chatbot'

function Accueil () {
  const tabImg=[pic1,pic1,pic1];
  return (
    <div className='accueil-full-container'>
      <Chatbot/>
        <div className='accueil-container'>
          <div className='accueil-slogan-container'>
            À l'ESI , NOUS DONNONS LE POUVOIR À CEUX QUI OSENT REVER
            <div>
              <span className='accueil-span'>Préparez-vous à prendre votre envol.</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Accueil