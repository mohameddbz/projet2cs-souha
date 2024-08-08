// BoxComponent.jsx

import React from 'react';
import './def.css'; // Assurez-vous d'importer correctement votre fichier CSS
import image from '../../assets/im3.jpeg'; // Chemin d'accès à votre image

const BoxComponent = ({ data, isImageOnLeft }) => {
  return (
    <div className={`box-container ${isImageOnLeft ? 'image-left' : 'image-right'}`}>
      <img src={image} alt="Image" />
      <div className="box-text">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <ul>
          {data.list.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button className="more-info-button">En savoir plus</button> {/* Bouton ajouté ici */}
      </div>
    </div>
  );
};

export default BoxComponent;
