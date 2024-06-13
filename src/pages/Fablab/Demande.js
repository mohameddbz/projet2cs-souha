import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './Demande.css'
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';

function DemandeForm() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    phone: '',
    immatriculation: '',
    cycleEtudes: '',
    nomPiece: '',
    quantite: 1,
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (delta) => {
    setFormData(prev => ({ ...prev, quantite: Math.max(1, prev.quantite + delta) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here, integrate with API or state management
  };

  return (
    <>
      <Navbar/>
      <div className="demande-form">
      <h1>Demander Pièce électronique</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleInputChange} />
          <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <input type="tel" name="phone" placeholder="Téléphone" value={formData.phone} onChange={handleInputChange} />
          <input type="text" name="immatriculation" placeholder="Numéro d'immatriculation" value={formData.immatriculation} onChange={handleInputChange} />
        </div>
        <div className="input-block">
          <select name="cycleEtudes" value={formData.cycleEtudes} onChange={handleInputChange}>
            <option value="">Sélectionnez ou saisissez une option...</option>
            <option value="Cycle 1">Cycle 1</option>
            <option value="Cycle 2">Cycle 2</option>
          </select>
        </div>
        <div className="input-group">
          <input type="text" name="nomPiece" placeholder="Nom de la pièce" value={formData.nomPiece} onChange={handleInputChange} />
          <div className="quantity-controls">
            <button type="button" onClick={() => handleQuantityChange(-1)}><FaMinus /></button>
            <input type="number" name="quantite" value={formData.quantite} onChange={handleInputChange} />
            <button type="button" onClick={() => handleQuantityChange(1)}><FaPlus /></button>
          </div>
        </div>
        <textarea name="description" placeholder="Bref description pourquoi vous demandez cette piece" value={formData.description} onChange={handleInputChange}></textarea>
        <button type="submit" className="action-button">Demander</button>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default DemandeForm;
