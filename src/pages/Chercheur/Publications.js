import React from 'react';
import './Publications.css';
import Cherch from '../../images/Cherch.png';
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa"; 
import { MdMailOutline } from "react-icons/md"; 
import PropTypes from 'prop-types';
import cn from 'classnames';
import Navbar from '../../components/navbar/navbar';
import LLM from '../../assets/images/LLM.png';
import Footer from '../../components/Footer/Footer';

const chercheurData = [
  {
    Nom: 'Linda SAID-ELHAJ',
    prof: 'Chercheuse depuis 2014',
    grade: 'Maitre de conférence classe B',
    Linkedin: 'Maitre de conférence classe B',
    Email:'Maitre de conférence classe B',
    Twitter: 'Maitre de conférence classe B'
  },
];

const soutData1 = [
  {
    
    title: 'Data Quality Error Detection powered by LLMs',
    description: 'This arThis article is the second in a series about cleaning data using Large Language Models (LLMs), with a focus on identifying errors in tabular data sets.ticle is the second in a series about cleaning data using Large Language Models (LLMs), with a focus on identifying errors in tabular data sets.',
    image:LLM,
  },
  {
    
    title: 'Data Quality Error Detection powered by LLMs',
    description: 'This arThis article is the second in a series about cleaning data using Large Language Models (LLMs), with a focus on identifying errors in tabular data sets.ticle is the second in a series about cleaning data using Large Language Models (LLMs), with a focus on identifying errors in tabular data sets.',
    image:LLM,
  },
  {
    
    title: 'Data Quality Error Detection powered by LLMs',
    description: 'This arThis article is the second in a series about cleaning data using Large Language Models (LLMs), with a focus on identifying errors in tabular data sets.ticle is the second in a series about cleaning data using Large Language Models (LLMs), with a focus on identifying errors in tabular data sets.',
    image:LLM,
  },
  {
    
    title: 'Data Quality Error Detection powered by LLMs',
    description: 'This arThis article is the second in a series about cleaning data using Large Language Models (LLMs), with a focus on identifying errors in tabular data sets.ticle is the second in a series about cleaning data using Large Language Models (LLMs), with a focus on identifying errors in tabular data sets.',
    image:LLM,
  },
 
];

function Chercheur(props) {
  return (
    <div>
      <Navbar/>
      <div className={cn('pub_container', props.className)}>

        <section className='pub-section2'>
          <div>
            {chercheurData.map((event, index) => (
              <div key={index} className='pub-rect3'>
                <img className='pub-image4' src={Cherch} alt="alt text" />
                <h2 className='pub-medium_title'>{event.Nom}</h2>
                <div className='pub-text2'>{event.prof}</div>
                <h5 className='pub-highlight'>{event.grade}</h5>
                <div className='pub-coordonnes'>
                  <h5 className='pub-highlight5'>{event.Twitter} </h5>
                  <BsTwitterX className='pub-image5' />
                  <h5 className='pub-highlight5'>{event.Linkedin} </h5>
                  <FaLinkedinIn className='pub-image9' />
                  <h5 className='pub-highlight5'>{event.Email} </h5>
                  <MdMailOutline className='pub-image7' />
                </div>
              </div>
            ))}
          </div>
          <div className="chercheur-menu">
    <a href="/Chercheur" className="chercheur-highlight1">Profile</a>
    <a href="/publication" className="chercheur-highlight1">Publication</a>
   
  </div>
          <div>
          <hr className='pub-line' size={1} />
          <div className='pub-container'>
  <div className='pub-buttons'>
    {soutData1.map((event, index) => (
      <div key={index} className='pub-evenement'>
        <div className='pub-evenement-s2'>
          <div className='pub-evenement-content'>
            <div className='pub-title'>{event.title}</div>
            <div className='pub-description'>{event.description}</div>
          </div>
          <img src={event.image} alt='' className='pub-img' />
        </div>
      </div>
    ))}
  </div>
</div>
          
          </div>
         
        </section>
       
      </div>
      <div className='f'>
          <Footer/>
          </div>
    </div>
  
     
    
  );
}

Chercheur.propTypes = {
  className: PropTypes.string,
};

export default Chercheur;
