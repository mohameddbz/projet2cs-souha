import React, { useState } from 'react';
import './Inscription.css'; // Assurez-vous que le chemin vers le fichier CSS est correct
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';

function InscriptionForm() {
  // États pour chaque champ du formulaire
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [immatriculation, setImmatriculation] = useState('');
  const [phone, setPhone] = useState('');
  const [cycleEtudes, setCycleEtudes] = useState('');
  const [typeProjet, setTypeProjet] = useState('');
  const [outilsMaitrise, setOutilsMaitrise] = useState('');
  const [projetEnRelation, setProjetEnRelation] = useState('');
  const [description, setDescription] = useState('');

  // Gérer la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { nom, prenom, immatriculation, phone, cycleEtudes, typeProjet, outilsMaitrise, projetEnRelation, description };
    console.log(formData);
    // Ici, vous pourriez envoyer les données à un serveur ou autre traitement
  };

  return (
    <>
    <Navbar/>
    <div className="inscription-form">
      <h1>Formulaire d'inscription</h1>
      <h3>Formulaire d'Inscription pour Nouveau Projet à ESI-FabLab</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label htmlFor="nom" className="form-label">Nom</label>
            <input
              type="text"
              id="nom"
              className="form-input"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="prenom" className="form-label">Prénom</label>
            <input
              type="text"
              id="prenom"
              className="form-input"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="immatriculation" className="form-label">Numéro d'immatriculation</label>
            <input
              type="text"
              id="immatriculation"
              className="form-input"
              value={immatriculation}
              onChange={(e) => setImmatriculation(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="form-label">Téléphone</label>
            <input
              type="tel"
              id="phone"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="cycleDetude" className="form-label">Cycle d'étude</label>
            <select
              id="cycleDetude"
              className="form-input"
              value={cycleEtudes}
              onChange={(e) => setCycleEtudes(e.target.value)}
              required
            >
              <option value="">Sélectionnez une option</option>
              <option value="Cycle 1">Cycle 1</option>
              <option value="Cycle 2">Cycle 2</option>
            </select>
          </div>
          <div>
            <label htmlFor="typeProjet" className="form-label">Type de Projet</label>
            <select
              id="typeProjet"
              className="form-input"
              value={typeProjet}
              onChange={(e) => setTypeProjet(e.target.value)}
              required
            >
              <option value="">Sélectionnez une option</option>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
            </select>
          </div>
          <div>
            <label htmlFor="outilsMaitrise" className="form-label">Outils Maîtrisés</label>
            <select
              id="outilsMaitrise"
              className="form-input"
              value={outilsMaitrise}
              onChange={(e) => setOutilsMaitrise(e.target.value)}
              required
            >
              <option value="">Sélectionnez une option</option>
              <option value="Outil 1">Outil 1</option>
              <option value="Outil 2">Outil 2</option>
            </select>
          </div>
          <div>
            <label htmlFor="projetEnrelationAvec" className="form-label">Projet en Relation avec</label>
            <input
              type="text"
              id="projetEnrelationAvec"
              className="form-input"
              value={projetEnRelation}
              onChange={(e) => setProjetEnRelation(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            className="form-textarea"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="form-button">Envoyer</button>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default InscriptionForm;
