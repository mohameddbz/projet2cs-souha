import {React, useState} from 'react';
import './Lmcs.css'
import Lcsiback from '../../images/Lcsiback.png';
import lcsib from '../../images/lcsib.png';
import a from '../../images/a.png';
import icon from '../../images/icon.png'
import cardData from '../../db/services.json'
import blog_image from '../../images/blog_image.png';
import partenaire1 from '../../images/partenaire1.png';
import partenaire2 from '../../images/partenaire2.png';
import partenaire3 from '../../images/partenaire3.png';
import partenaire4 from '../../images/partenaire4.png';
import partenaire5 from '../../images/partenaire5.png';
import clock from '../../images/Vector.png';
import aplaude from '../../images/Group.png';
import vue from '../../images/Group 59.png';
import groupe1 from '../../images/Group 578.png';
import groupe2 from '../../images/Group 579.png';
import groupe3 from '../../images/Group580.png';
import cardData1 from '../../db/blog.json';

import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/Footer/Footer'
const Lmcs= () => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const [activeBox, setActiveBox] = useState(null);

  const getCurrentPageCards = () => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return cardData.slice(startIndex, endIndex);
  };

  const getCurrentPageCard = () => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return cardData1.slice(startIndex, endIndex);
  };

  const handleBoxClick = (index) => {
    setActiveBox(index);
  };
  return (
    <div className="lcsi-container">
      <Navbar/>
    <Header />
    <Introduction/>
    <QuickFacts/>
    <Presentation
       getCurrentPageCards={getCurrentPageCards} 
       handleBoxClick={handleBoxClick} 
       activeBox={activeBox} 
    />
    <ServiceCard
      getCurrentPageCard={getCurrentPageCard}
    />
    <Partenaire/>
    <Footer/>
   </div>
  )
}
const Header = () => (
  <div className="lcsi-main-content">
    <img className="lcsi-cover" src={Lcsiback} alt="alt text" />
    <img className="top-image" src={lcsib} alt="alt text" />
    <div className='lcsi-header'>
      <h1 className='lcsi-hero_title'>Laboratoire de Méthode De Conception des systèmes </h1>
      <div className='imagecontainer'>
  <div className='top-images'>
    <img src={groupe1} alt="groupe 1" />
    <img src={groupe2} alt="groupe 2" />
  </div>
  <div className='bottom-image'>
    <img src={groupe3} alt="groupe 3" />
  </div>
</div>
    </div> 
   
  </div>
);
const Introduction = () => (
  <div className="lcsi-rect">
    <h2 className="lcsi-medium_title">Présentation de LMCS</h2>
    <h4 className="lcsi-highlight">
      {`C'est un laboratoire de recherche affilié à l'École nationale supérieure d'informatique d'Alger (ESI). Il a été créé en 1999. Le Laboratoire s'intéresse notamment aux méthodes d'optimisation, de représentation des connaissances, de classification et de robustesse pour la conception de ces systèmes.`}
    </h4>
  </div>
);
const QuickFacts = () => (
  <div className="lcsi-rect2">
    <div className="lcsi-rect3">
      <h2 className="lcsi-medium_title1">Faits Rapides</h2>
    </div>
    <div className='containerfacts'>
    <div className="lcsi-ep4">
      <h1 className="lcsi-hero_title2" id="count1">2,000+</h1>
      <div className='lcsi-ep55'>
        <p className="lcsi-paragraph">Article de recherche</p>
        <svg className="lcsi-image5" xmlns="http://www.w3.org/2000/svg" width="0.75em" height="1em" viewBox="0 0 512 512">
          <path fill="currentColor" d="M149.688 85.625c-1.234.005-2.465.033-3.72.063c-33.913.806-75.48 10.704-127.25 33.718V362.78c60.77-28.82 106.718-37.067 144.22-33.092c33.502 3.55 59.685 16.66 83.562 31.187c12.938 7.28 25.062 14.635 37.624 20.905V170.06c-1.837-.983-3.733-1.935-5.656-2.844c-25.312-12.227-53.002-23.162-85.03-26.875c-11.563-1.335-22.937-1.73-33.75-1.72zm211.03 0c-10.813-.01-22.187.384-33.75 1.72c-32.028 3.713-59.72 14.648-85.03 26.876c-1.924.908-3.82 1.86-5.656 2.844v211.72c12.56-6.27 24.686-13.626 37.624-20.905c23.878-14.526 50.06-27.636 83.562-31.186c37.502-3.976 83.45 4.27 144.22 33.092V119.406c-51.77-23.014-93.336-32.912-127.25-33.72c-1.257-.03-2.487-.06-3.72-.062zM256 119.03c-18.54 0-33.53 14.99-33.53 33.53c0 18.54 14.99 33.53 33.53 33.53c18.54 0 33.53-14.99 33.53-33.53c0-18.54-14.99-33.53-33.53-33.53zM28.844 384.814c-11.032 1.057-22.302 4.373-28.844 9.19V426.72c60.77-28.82 106.718-37.067 144.22-33.093c33.502 3.55 59.685 16.66 83.562 31.187c12.938 7.28 25.062 14.636 37.624 20.906v-32.53c-1.837-.983-3.733-1.936-5.656-2.845c-25.312-12.227-53.002-23.162-85.03-26.875c-34.883-4.025-76.19.72-145.875 22.344zM483.156 384.814c-69.686-21.625-110.993-26.37-145.875-22.344c-32.028 3.713-59.72 14.648-85.03 26.875c-1.924.908-3.82 1.862-5.656 2.845v32.53c12.56-6.27 24.686-13.626 37.624-20.906c23.878-14.527 50.06-27.636 83.562-31.187c37.502-3.976 83.45 4.27 144.22 33.093v-32.718c-6.543-4.817-17.812-8.133-28.844-9.19z"></path>
        </svg>
      </div>
    </div>
    <div className='lcsi-ep6'>
        <div className='lcsi-ep55'>
            <h1 className='lcsi-hero_title3'>32+</h1>
            <svg className='lcsi-image6' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth={2} d="M8 11A5 5 0 1 0 8 1a5 5 0 0 0 0 10Zm6.643 4.696a6.745 6.745 0 0 0-1.62-2.673C11.772 11.76 10.013 11 8 11c-4 0-7 3-7 7v5h10m1-4.176L16.19 22L23 13"></path></svg>
        </div>
            <p className='lcsi-paragraph2'>
                Experts dans les méthodes <br />
                de conception des systèmes
            </p>


      </div>
    <div className='lcsi-ep5'>

            <h1 className='lcsi-hero_title21'>4,000+</h1>
        <div className='lcsi-ep55'>
            <svg className='lcsi-image7' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16 8c0 2.21-1.79 4-4 4s-4-1.79-4-4l.11-.94L5 5.5L12 2l7 3.5v5h-1V6l-2.11 1.06zm-4 6c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"></path></svg>
            <p className='lcsi-paragraph1'>Article de recherche</p>
        </div>

    </div>
    </div>
  </div>
);
const Presentation = ({ getCurrentPageCards, handleBoxClick, activeBox }) => (
  <div className='lcsi-RECT3'>
    <div className="lcsi-content-wrapper">
     
     <div className='containercard'>
      <div className='containertitle'>

     <h1 className="lcsi-hero_title_box">
        <span className="lcsi-box_title2">
          <span className="lcsi-hero_title_span0">Que peut accomplir</span>
          <span className="lcsi-hero_title_span1"> notre LCSI?</span>
        </span>
      </h1>
      <h4 className="lcsi-highlight4">
        {`Explorer les confins des systèmes informatiques et développer des solutions qui transcendent les frontières de la communication. Engagés dans l'excellence académique, nous cultivons l'esprit d'innovation à travers l'encadrement d'étudiants et la collaboration sur des projets de recherche. `}
      </h4>
      </div>
      <div className='lcsi-box-container'>
        {getCurrentPageCards().map((product, index) => (
          <div
            key={index}
            className={`lcsi-box ${activeBox === index ? 'active' : ''}`}
            onClick={() => handleBoxClick(index)}
          >
            <img className="lcsi-image00" src={icon} alt="alt text" />
            <h4 className="lcsi-highlight00">{product.service}</h4>
            <h5 className="lcsi-highlight01">
              {product.desc}
            </h5>
          </div>
        ))}
        </div> 
      </div>
    </div>
  </div>
);
const ServiceCard = ({ getCurrentPageCard }) => (
  <div className='lcsi-blog_container'>
    <h1 className='lcsi-hero_title_blog'>
      <span className='lcsi-hero_title_b'>
        <span className='lcsi-hero_title_blog0'>Derniers conseils</span>
        <span className='lcsi-hero_title_blog1'> sur notre blog</span>
      </span>
    </h1>
    <div className='containerblog'>
      {getCurrentPageCard().map((product, index) => (
        <div key={index} className='lcsi-blog'>
          <div className='lcsi-blog-content'>
            <h3 className='lcsi-blog_subtitle'>{product.title}</h3>
            <h5 className='lcsi-blog_highlight'>{product.desc}</h5>
            <div className='lcsi-blog-meta'>
            <img className='lcsi-blog_images' src={aplaude} alt="alt text" />
              <span className='lcsi-blog-like'>{product.like}</span>
              <img className='lcsi-blog_images' src={vue} alt="alt text" />
              <span className='lcsi-blog_vues'>{product.vues}</span>
              <img className='lcsi-blog_images' src={clock} alt="alt text" />
              <span className='lcsi-blog_temps'>{product.temps}</span>
            </div>
            <a href="lien-vers-votre-page" className='lcsi-blog_more'>Read More...</a>
          </div>
          <img className='lcsi-blog_image' src={blog_image} alt="alt text" />
        </div>
      ))}
    </div>
  </div>
);

const Partenaire=()=>(
  <div className='lcsiparten'>
  <h2 className='lcsi-partenaire_title'>Nos partenaires</h2>
  <div className='lcsi-partenaire'>
 
  <div className='lcsi-flex_row'>
      <img className='lcsi-part' src={partenaire1} alt="alt text" />
      <img className='lcsi-part' src={partenaire2} alt="alt text" />
      <img className='lcsi-part' src={partenaire3} alt="alt text" />
      <img className='lcsi-parte1' src={partenaire4} alt="alt text" />
      <img className='lcsi-parte2' src={partenaire5} alt="alt text" />
  </div>
</div>
</div>
)


export default Lmcs