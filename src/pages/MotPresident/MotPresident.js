import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/navbar/navbar";
import React from 'react';

import './MotPresident.css'

import koudil from "../../images/koudil.png"
 const  quotes = ` Words that Koudil always says, like quotes." Bienvenue au Laboratoire de la Communication dans les Systèmes Informatiques, votre fenêtre sur l'avenir de la technologie de communication. Ici, nous fusionnons recherche avancée et innovation `
 





function MotPresident () {

    // cette methode est utliser pour coloer les phrases dans des grands paragraphes
    const HighlightedText = ({ text, highlight }) => {
        const regex = new RegExp(`(${highlight.join('|')})`, 'gi');
      
        const parts = text.split(regex);
      
        return (
          <span className="all-text">
            {parts.map((part, index) =>
              highlight.some(word => new RegExp(word, 'i').test(part)) ? (
                <span key={index} className="text-colorer">
                  {part}
                </span>
              ) : (
                <React.Fragment key={index}>{part}</React.Fragment>
              )
            )}
          </span>
        );
      };
  

    const FramedPhoto = ({ photoSrc, altText = 'Framed photo' }) => {
        return (
          <div className="custom-frame">
            <img src={photoSrc} alt={altText} className="framed-photo" />
          </div>
        );
      };

    return (
        <div>
            <Navbar/>
             <div className="titlee">
             <p> Mot de Mr. Koudil, Directeur de l’ESI</p> 
             </div>
            <div className="headers">
                <div className="pict">
                <FramedPhoto photoSrc={koudil} />
                </div> 
                <div className="mot-pres">
                    <div className="quote-div">
                   <span className="text-span" > <span className="quotes-start-span">“</span>   {quotes}    <span className="quotes-end-span">”</span>  </span>  
                    </div>
                    <div className="name-pres">
                        <p className="name-pres">-Mouloud KOUDIL</p>
                    </div>
                </div>
            </div>
            <div className="all-text">
                {/* vu que la pages est statiques donc il faut just remplire le component apres avec le mot de koudil // on pas besoin de mapper ou qlq chose comme ca  */}
          <div> <HighlightedText text={allText}  highlight={highlight} /> </div>
          <div> <HighlightedText text={allText}  highlight={highlight} /> </div>

          <div> <HighlightedText text={allText}  highlight={highlight} /> </div>

            
            </div>
            <Footer/>
        </div>
    );
};


export default MotPresident;




const allText = `
Bienvenue au Laboratoire de la Communication dans les Systèmes Informatiques, votre fenêtre sur l'avenir de la technologie de communication. Ici, nous fusionnons recherche avancée et innovation pratique pour révolutionner la manière dont le monde interagit. Notre mission ? Explorer les confins des systèmes informatiques et développer des solutions qui transcendent les frontières de la communication. Engagés dans l'excellence académique, nous cultivons l'esprit d'innovation à travers l'encadrement d'étudiants et la collaboration sur des projets de recherche. Rejoignez-nous dans cette aventure au cœur de la technologie et de l'innovation.
`

const highlight = ["de la Communication dans les Systèmes", "avancée"];