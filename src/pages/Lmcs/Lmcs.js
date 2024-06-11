import {React, useState} from 'react';
import  './Lmcs.css';
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
import cardData1 from '../../db/blog.json';
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/navbar/navbar'




const pageSize = 4; 
// const pageSize1=2;

function Lcsi () {
  const [currentPage, setCurrentPage] = useState(0); 
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

  const [activeBox, setActiveBox] = useState(null);

  const handleBoxClick = (index) => {
    setActiveBox(index);
  };
  
  return (
<div>
   <div  className="lcsi-container">
     <Navbar/>
     <div className="main-content">
    <img className='lcsi-cover' src={Lcsiback} alt="alt text" />
    <img className='lcsi-cover' src={lcsib} alt="alt text" />
    <h1 className='lcsi-hero_title'>Laboratoire de la Communication dans les Systèmes Informatiques</h1>
      <div className='lcsi_emoj'>
    <div className='lcsi-ep1'>
        <img className='lcsi-image' src={a} alt="alt text" />
        <svg className='lcsi-image1' xmlns="http://www.w3.org/2000/svg" width="3rem" height="2em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7 2h10v7.85q0 .575-.25 1.025t-.7.725l-3.55 2.1l.7 2.3H17l-3.1 2.2l1.2 3.8l-3.1-2.35L8.9 22l1.2-3.8L7 16h3.8l.7-2.3l-3.55-2.1q-.45-.275-.7-.725T7 9.85zm4 2v7.05l1 .6l1-.6V4z"></path>
        </svg>
        <div className='lcsi-info'>Excellence</div>
    </div>

    <div className='lcsi-ep2'>
        <img className='lcsi-image' src={a} alt="alt text" />
        <svg className='lcsi-image1' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" color="#0061B1"><g fill="none" stroke="#0061B1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} color="red"><path d="M21 6H9C7.34315 6 6 7.34315 6 9V31C6 32.6569 7.34315 34 9 34H39C40.6569 34 42 32.6569 42 31V21"></path><path d="M24 34V42"></path><path d="M32 6L28 10L32 14"></path><path d="M38 6L42 10L38 14"></path><path d="M14 42L34 42"></path></g></svg>
        <p className='lcsi-info2'>
            Qualité <br />
            méthodologique
        </p>
    </div>
    <div className='lcsi-ep3'>
        <img className='lcsi-image' src={a} alt="alt text" />
        <svg className='lcsi-image1' xmlns="http://www.w3.org/2000/svg" color="#0061B1" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M13 3c3.9 0 7 3.1 7 7c0 2.8-1.6 5.2-4 6.3V21H9v-3H8c-1.1 0-2-.9-2-2v-3H4.5c-.4 0-.7-.5-.4-.8L6 9.7C6.2 5.9 9.2 3 13 3m0-2C8.4 1 4.6 4.4 4.1 8.9L2.5 11c-.6.8-.6 1.8-.2 2.6c.4.7 1 1.2 1.7 1.3V16c0 1.9 1.3 3.4 3 3.9V23h11v-5.5c2.5-1.7 4-4.4 4-7.5c0-5-4-9-9-9m-3 9c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1m3 0c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1m3 0c-.5 0-1-.4-1-1s.5-1 1-1s1 .4 1 1s-.5 1-1 1"></path></svg>
        <p className='lcsi-info2'>
            Pensée <br />
            innovante
        </p>
    </div>
    </div>

    <div className='lcsi-rect'>
        <h2 className='lcsi-medium_title'>Présentation de LCSI </h2>
        <h4 className='lcsi-highlight'>
            {`Bienvenue au Laboratoire de la Communication dans les Systèmes Informatiques, votre fenêtre sur l'avenir de la technologie de communication. Ici, nous fusionnons recherche avancée et innovation pratique pour révolutionner la manière dont le monde interagit. Notre mission ? Explorer les confins des systèmes informatiques et développer des solutions qui transcendent les frontières de la communication. Engagés dans l'excellence académique, nous cultivons l'esprit d'innovation à travers l'encadrement d'étudiants et la collaboration sur des projets de recherche. `}
        </h4>
    </div>

    <div className='lcsi-rect2'>
        <div className='lcsi-rect3'>
            <h2 className='lcsi-medium_title1'>Faits Rapides</h2>
        </div>
        <div className='lcsi-ep4'>
            <h1 className='lcsi-hero_title2' id='count1'>2,000+</h1>
            <p className='lcsi-paragraph'>Article de recherche</p>
	<svg   className='lcsi-image5'xmlns="http://www.w3.org/2000/svg" width="0.75em" height="1em" viewBox="0 0 512 512" ><path fill="currentColor" d="M149.688 85.625c-1.234.005-2.465.033-3.72.063c-33.913.806-75.48 10.704-127.25 33.718V362.78c60.77-28.82 106.718-37.067 144.22-33.092c33.502 3.55 59.685 16.66 83.562 31.187v-242.97c-23.217-17.744-50.195-30.04-85.97-32a185 185 0 0 0-10.843-.28zm211.968 0c-3.7-.016-7.322.088-10.844.28c-35.773 1.96-62.75 14.256-85.968 32v242.97c23.876-14.527 50.06-27.637 83.562-31.188c37.502-3.974 83.45 4.272 144.22 33.094V119.407c-51.77-23.014-93.337-32.912-127.25-33.72c-1.255-.028-2.486-.056-3.72-.06zm5.72 261.78c-1.038-.002-2.074.017-3.095.033c-4.808.075-9.43.37-13.905.843c-33.932 3.597-59.603 17.976-85.53 34.44v.28c-6.554-1.99-13.02-2.37-19.408-.97c-25.566-16.177-51.003-30.202-84.468-33.75c-5.595-.592-11.44-.883-17.564-.842c-32.04.213-71.833 9.778-124.687 35.937v42.53c60.77-28.823 106.714-37.067 144.218-33.092c18.545 1.965 34.837 6.845 49.75 13.28c-4.682 6.064-9.308 13.268-13.875 21.688h117.156c-5.93-8.22-11.798-15.414-17.626-21.56c14.996-6.503 31.39-11.43 50.062-13.408c37.503-3.974 83.448 4.27 144.22 33.094v-42.53c-53.16-26.31-93.115-35.863-125.25-35.97z"></path></svg>

        </div>
        <div className='lcsi-ep5'>
            <h1 className='lcsi-hero_title21'>4,000+</h1>
            <p className='lcsi-paragraph1'>Article de recherche</p>
            <svg className='lcsi-image7' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16 8c0 2.21-1.79 4-4 4s-4-1.79-4-4l.11-.94L5 5.5L12 2l7 3.5v5h-1V6l-2.11 1.06zm-4 6c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"></path></svg>

        </div>
        <div className='lcsi-ep6'>
            <h1 className='lcsi-hero_title3'>32+</h1>
            <p className='lcsi-paragraph2'>
                Experts dans les méthodes <br />
                de conception des systèmes
            </p>
            <svg className='lcsi-image6' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth={2} d="M8 11A5 5 0 1 0 8 1a5 5 0 0 0 0 10Zm6.643 4.696a6.745 6.745 0 0 0-1.62-2.673C11.772 11.76 10.013 11 8 11c-4 0-7 3-7 7v5h10m1-4.176L16.19 22L23 13"></path></svg>

        </div>
    </div>

    <div className='lcsi-RECT3'>
        <h1 className="lcsi-hero_title_box">
            <span className="lcsi-box_title2">
                <span className="lcsi-hero_title_span0">Que peut accomplir</span>
                <span className="lcsi-hero_title_span1"> notre LCSI?</span>
            </span>
        </h1>
        <h4 className="lcsi-highlight4">
            {`Explorer les confins des systèmes informatiques et développer des solutions qui transcendent les frontières de la communication. Engagés dans l'excellence académique, nous cultivons l'esprit d'innovation à travers l'encadrement d'étudiants et la collaboration sur des projets de recherche. `}
        </h4>

        <div className='lcsi-box-container'>

            {getCurrentPageCards().map((product, index) => (
                <div  key={index}
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

    <div className='lcsi-blog_container'>
        <h1 className='lcsi-hero_title_blog'>
            <span className='lcsi-hero_title_b'>
                <span className='lcsi-hero_title_blog0'>Derniers conseils</span>
                <span className='lcsi-hero_title_blog1'> sur notre blog</span>
            </span>
        </h1>
        <div className='lcsi-blog-cont'>
            {getCurrentPageCard().map((product, index) => (
                <div key={index} className='lcsi-blog'> {/* Ajout d'un div parent */}
                    <h3 className='lcsi-blog_subtitle'>{product.title}</h3>
                    <h5 className='lcsi-blog_highlight'>{product.desc}</h5>
                    <h5 className='lcsi-blog-like'>{product.like}</h5>
                    <h5 className='lcsi-blog_vues'>{product.vues}</h5>
                    <h5 className='lcsi-blog_temps'>{product.temps}</h5>
                    <a href="lien-vers-votre-page" className='lcsi-blog_more'>Read More...</a>

                    <img className='lcsi-blog_image' src={blog_image} alt="alt text" />
                </div>
            ))}
        </div>
      
    </div>
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
</div>

</div>
<div className='lcsi-f'>
<Footer/>
</div>
</div>
  )
}

export default Lcsi;
