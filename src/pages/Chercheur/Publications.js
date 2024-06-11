import React from 'react';
import './Publications.css';
import Cherch from '../../Images/Cherch.png';
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa"; 
import { MdMailOutline } from "react-icons/md"; 
import LLM  from '../../Images/LLM.png';




function Publications() {
  return (
    <div className="Rechercheur_container">
         <section className='section2'>
     
      <div className='rect3' />
      <img className='image4'src={Cherch} alt="alt text" />
     
      <h2 className='medium_title'>Linda SAID-ELHAJ</h2>
  
      <div className='text2'>Chercheuse depuis  2014</div>
      <h5 className='highlight'>Maitre de conférence classe B </h5>
   
      {/* <div className='rect4' /> */}
      <div className="menu">
      <a href="#" className="highlight1">Profile</a>
      <a href="#"  className="highlight1">Publication</a>
      <a href="#"  className="highlight1">Projet Recherche</a>
</div>
<hr className='line' size={1} />
      <h5 className='highlight5'>Maitre de conférence classe 1 </h5>
      <BsTwitterX className='image5' />
      <h5 className='highlight5'>Maitre de conférence classe 1 </h5>
      < FaLinkedinIn className='image9' />
      <h5 className='highlight5'>Maitre de conférence classe B </h5>
      <MdMailOutline className='image7' />
      <div className='publications'>
      <img className='pub_image' src={LLM} alt="alt text" />
      <h5 className='pub_highlight1'>
        This article is the second in a series about cleaning data using Large Language Models (LLMs), with a focus on
        identifying errors in tabular data sets.
      </h5>
      <h4 className='pub_highlight'>Data Quality Error Detection powered by LLMs</h4>
      <div className='pub_info'>17 hours ago | 5 min read</div>
      </div>
    
     
     
    </section>
    
    </div>
  );
}

export default Publications;

