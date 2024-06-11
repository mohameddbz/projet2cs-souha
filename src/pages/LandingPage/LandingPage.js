import React from 'react'
import Accueil from '../../components/accueil/accueil'
import AboutUs from '../../components/accueil/AboutUs'
import SuccesStory from '../../components/SuccesStory/SuccesStory'
import Events from '../../components/EvenementComponent/Events'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/navbar/navbar'
import News from '../../components/NewsEsi/News'
import QuickFact from '../../components/QuickFact/QuickFact'

function LandingPage () {
  return (
    <div>
      <Navbar/>
      <div>
        <Accueil/>
        <AboutUs/>
        <News/>
        <SuccesStory/>
        <Events/>
        <QuickFact/>
        <Footer/>
      </div>
      
    </div>
  )
}

export default LandingPage