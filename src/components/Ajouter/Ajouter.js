import React, { useState } from 'react';
import './Ajouter.css';
import {FaCheckCircle } from 'react-icons/fa';

const Ajouter = ({ show, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!show) {
    return null;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Question envoyée!");
    setSubmitted(true);

    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 3000); // Delay for message display
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Ajouter Question</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        {submitted ? (
          <div className="submission-message">
            <FaCheckCircle />
            <p>Question en attente de validation!</p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="add-question-form">
            <input type="text" placeholder="Nom" required className="nom" />
            <input type="text" placeholder="Prénom" required className="prenom" />
            <input type="email" placeholder="Email" required className="email" />
            <input type="text" placeholder="Question sur ?" required className="question-about" />
            <textarea placeholder="Votre question ici" required className="full-question"></textarea>
            <div className="form-actions">
              <button type="button" onClick={onClose}>Annuler</button>
              <button type="submit">Envoyer</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Ajouter;
