import React from 'react'
import pgm from '../../images/pgm.png'
import doctorat from '../../images/doctorat.png'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/Footer/Footer'
import './program.css'
function Program() {
  return (
    <div>
    <Navbar/>
   <section className='pgm-present'>
    <div className='pgm-titles'>
        <h1 className='pgm-ftitle'>Programme Professionnel</h1>
        <p className='pgm-desc'>Plongez dans un monde d’opportunités où l’excellence académique rencontre l’innovation. Découvrez notre solide formation en consultant attentivement notre programme.
             Explorez  les vastes horizons de connaissances et les possibilités infinies qu'offre notre programme,
           conçu pour vous guider vers l'épanouissement académique et professionnel</p>
         <h2 className='pgm-link'> En savoir plus sur ce que l’ESI  a à offrir  </h2>
    </div>

    <div className='pgm-description'>
     <img className='pgmimage' src={pgm}/> 
     <p className='pgmpara'>Commencez par découvrir le système de l'École Nationale Supérieure d’Informatique (ESI), où sont formés des ingénieurs d'État en informatique. La scolarité s'étend sur cinq ans et se divise en trois périodes distinctes. 
  <a href='#'>Pour en savoir plus, découvrez les spécificités de l’école</a></p>
    </div>
   </section >
    
   <section className='cprepa'>
    <div className='cpdesc'>
        <h1 className='cp-title'>Cycle préparatoire</h1>
        <p className='cp-desc'>Ce système éducatif en ingénierie propose une formation de deux ans axée sur les bases essentielles avant d'aborder des connaissances plus spécialisées.
             L'accès aux classes supérieures est conditionné par la réussite à un concours annuel, dont les critères sont définis par le Ministre de l'Enseignement Supérieur.
             Ce concours est ouvert, sous certaines conditions, aux étudiants issus d'autres filières universitaires.</p>
    
    </div>
    </section>
    <div className='pcards-container'>
        <div className='p-card'>
          <img src={pgm}/>
          <h4 className='card-des'>Cours</h4>
        <h4 className='card-des'>TDs/TPs</h4>
        <h4  className='card-des'>Stage ouvrier</h4>
          <div className='p-card-buttons'>
            <button className='p-card-button1'>1CP</button>
            <button className='p-card-button2'>Catalogue des matières</button>
        </div>
        </div>

        <div className='p-card'>
          <img src={pgm}/>
          <h4 className='card-des'>Cours</h4>
        <h4 className='card-des'>TDs/TPs</h4>
        <h4  className='card-des'>Concours</h4>
          <div className='p-card-buttons'>
            <button className='p-card-button1'>2CP</button>
            <button className='p-card-button2'>Catalogue des matières</button>
        </div>
        </div>
      
    
    </div>
   
   <section className='cprepa'>
    <div className='cpdesc'>
        <h1 className='cp-title'>Second cycle</h1>
        <p className='cp-desc'>Les étudiants qui réussissent le concours accèdent à la première année du second 
            cycle après avoir suivi une année de socle commun au second cycle</p>
    </div>
    <div className='pcards-container'>
        <div className='p-card'>
          <img src={pgm}/>
          <h4 className='card-des'>Cours</h4>
        <h4 className='card-des'>TDs/TPs</h4>
        <h4  className='card-des'>Stage pratique en entreprise</h4>
          <div className='p-card-buttons'>
            <button className='p-card-button1'>1CS</button>
            <button className='p-card-button2'>Catalogue des matières</button>
        </div>
        </div>
        
        <div className='p-card'>
          <img src={pgm}/>
          <h4 className='card-des'>Cours</h4>
        <h4 className='card-des'>TDs/TPs</h4>
        <h4  className='card-des'>Spétialité</h4>
          <div className='p-card-buttons'>
            <button className='p-card-button1'>2CS</button>
            <button className='p-card-button2'>Catalogue des matières</button>
        </div>
        </div>
    
    
    </div>
    <a href='#' className='pgr-sepc'>Voir plus sur les spatialités de l’école</a>
   </section>
   <section className='pgm-pfe'>
   <div className='pcards-container'>
        <div className='p-card'>
          <img src={pgm}/>
          <h4 className='card-des'>Cours</h4>
        <h4 className='card-des'>TDs/TPs</h4>
        <h4  className='card-des'>Stage pratique en entreprise</h4>
          <div className='p-card-buttons'>
            <button className='p-card-button1'>1CS</button>
            <button className='p-card-button2'>Catalogue des matières</button>
        </div>
        </div>
        
       <p className='pfe-desc'> Les étudiants se lancent dans une aventure unique où l'apprentissage académique rencontre 
        le monde professionnel. Ils participent à un stage pratique de neuf mois en entreprise,
         mettant en pratique leurs connaissances dans des projets concrets. Parallèlement, 
         une formation en entrepreneuriat les prépare à relever les défis du monde des affaires. 
         Cette immersion complète leur permet d'acquérir des compétences précieuses pour leur avenir
          professionnel dans le domaine de la technologie.</p>
    
    
    </div>
   </section>
   <section className='c-doctorat'>
   <h1 className='cp-title'>Troisième cycle</h1>
  
   <div className='doc-card-container'>
    <img className='doc-img' src={doctorat} />
 
   <div className='doc-text'>
    <p>
   Explorez notre programme de doctorat, où vous découvrirez un parcours riche en séminaires de recherche
     et en encadrement personnalisé. Plongez dans un environnement dynamique où l'innovation est au cœur de 
     chaque étape de votre parcours académique.
   </p>
     <button className='doc-button'>Voir plus</button>
    </div>
     
    </div>
   </section>
   <Footer/>
   </div>
  )
}

export default Program
