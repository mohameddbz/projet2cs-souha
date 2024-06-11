import React from 'react';
import './Postgraduation.css'
import post from '../../Images/post.png'

function renderSection1(props) {
  return (
    <section className="postgra-section1">
     
      <div className="postgra-rect" />
      <h1 className="postgra-big_title_box">
        <span className="postgra-big_title">
          <span className="postgra-big_title_span0">Votre chemin vers </span>
          <span className="postgra-big_title_span1">la réussite!</span>
        </span>
      </h1>
      <h4 className="postgra-highlight">
        Vivez une communauté campus dynamique tout en recherchant la réussite académique
      </h4>
      <div className="postgra-rect1" />
      <h3 className="postgra-subtitle">Totale des doctorants</h3>
      <img className="postgra-image" src={post} alt="alt text" />
      <img className="postgra-image1" src={post} alt="alt text" />
      <img className="postgra-image2" src={post} alt="alt text" />
      <img className="postgra-image3" src={post} alt="alt text" />
      <div className="postgra-rect2" />
      <h5 className="postgra-highlight1">900+</h5>
      <div className="postgra-rect3" />
      <h2 className="postgra-medium_title">Postuler</h2>
      <div className="postgra-box">
        <h2 className="postgra-medium_title1">Lire plus </h2>
      </div>
      <div classname="derniere_soutenance">
      <h4 className="postgra-highlight2">Derniere soutenance </h4>
      <img className="postgra-image21" src={post} alt="alt text" />
      <div className="postgra-text">GHLIB Roumaissa</div>
      <div className="postgra-text1">Systeme dinformation</div>
      {/* <img className="postgra-image31" src={post} alt="alt text" /> */}
      <img className="postgra-image6" src={post} alt="alt text" />
      </div>


     
    
    </section>
  );
}

export default renderSection1;
