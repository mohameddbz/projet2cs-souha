import React from 'react';
import './ButtonComponent.css'

const ButtonComponent = ({ text, link }) => {
    return (
        <button 
          className="bouton-inscrire" 
          onClick={() => window.location.href = link}
        >
          {text}
        </button>
      );
    };

export default ButtonComponent;
