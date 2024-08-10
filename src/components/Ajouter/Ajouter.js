import React, { useState } from 'react';
import './Ajouter.css';
import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import header from '../header';

const Ajouter = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    // nom: '',
    // prenom: '',
    category: '',
    titre: '',
    contenu: '',
    // valide : true ,
  });

  const [submitted, setSubmitted] = useState(false);

  if (!show) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/poser-question/`,
        formData, // The data to be sent (no need to stringify, Axios handles it)
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Question envoyée!", formData);
      setSubmitted(true);
  
    } catch (error) {
      
    }
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
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              // value={formData.nom}
              onChange={handleChange}
              
              className="nom"
            />
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              // value={formData.prenom}
              onChange={handleChange}
              
              className="prenom"
            />
            <input
              type="text"
              name="category"
              placeholder="Email"
              value={formData.category}
              onChange={handleChange}
              required
              className="email"
            />
            <input
              type="text"
              name="titre"
              placeholder="Question sur ?"
              value={formData.titre}
              onChange={handleChange}
              required
              className="question-about"
            />
            <textarea
              name="contenu"
              placeholder="Votre question ici"
              value={formData.contenu}
              onChange={handleChange}
              required
              className="full-question"
            ></textarea>
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
