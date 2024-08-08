import React, { useState } from 'react';
import './Inscription.css'; // Assurez-vous que le chemin vers le fichier CSS est correct
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';

function InscriptionForm() {
  // États pour chaque champ du formulaire
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [numeroImmatriculation, setImmatriculation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(''); // Ajout de l'état pour l'email
  const [cycleEtudes, setCycleEtudes] = useState('');
  const [typeProjet, setTypeProjet] = useState('');
  const [outilsMaitrise, setOutilsMaitrise] = useState('');
  const [projetEnRelation, setProjetEnRelation] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Données pour les options des sélecteurs
  const CYCLE_CHOICES = ['1CP', '2CP', '1CS', '2CS', '3CS', 'OTHERS'];
  const PROJET_RELATION_CHOICES = [
    'PFE', 'Formation Master', 'FIE', 'Doctorat', 'Competition ESI', 'Autre'
  ];
  const TYPE_PROJET_CHOICES = [
    'Individuel avec coach', 'Individuel sans coach', 'Équipe avec coach',
    'Équipe sans coach', 'Initié par ESI en collaboration avec fablab'
  ];

  // Gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      nom,
      prenom,
      numero_immatriculation: numeroImmatriculation,
      phone,
      email, // Ajout de l'email
      cycle_etude: cycleEtudes,
      projet_type: typeProjet,
      outils_maitrise: outilsMaitrise,
      projet_relationavec: projetEnRelation,
      description_projet: description,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/inscription-utilisateur/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Incluez le token d'authentification si nécessaire
          // 'Authorization': `Token ${yourToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Inscription réussie !');
        setError(null);
      } else {
        setError(data);
        setSuccess(null);
      }
    } catch (error) {
      setError({ error: 'Une erreur est survenue.' });
      setSuccess(null);
    }
  };

  return (
    <>
     <Navbar />
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
              <label htmlFor="numeroImmatriculation" className="form-label">Numéro d'immatriculation</label>
              <input
                type="text"
                id="numeroImmatriculation"
                className="form-input"
                value={numeroImmatriculation}
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
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="cycleEtudes" className="form-label">Cycle d'étude</label>
              <select
                id="cycleEtudes"
                className="form-input"
                value={cycleEtudes}
                onChange={(e) => setCycleEtudes(e.target.value)}
                required
              >
                <option value="">Sélectionnez une option</option>
                {CYCLE_CHOICES.map(choice => (
                  <option key={choice} value={choice}>{choice}</option>
                ))}
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
                {TYPE_PROJET_CHOICES.map(choice => (
                  <option key={choice} value={choice}>{choice}</option>
                ))}
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
                {/* Ajouter les options disponibles pour les outils maîtrisés ici */}
                <option value="Outil 1">Outil 1</option>
                <option value="Outil 2">Outil 2</option>
              </select>
            </div>
            <div>
              <label htmlFor="projetEnRelation" className="form-label">Projet en Relation avec</label>
              <select
                id="projetEnRelation"
                className="form-input"
                value={projetEnRelation}
                onChange={(e) => setProjetEnRelation(e.target.value)}
                required
              >
                <option value="">Sélectionnez une option</option>
                {PROJET_RELATION_CHOICES.map(choice => (
                  <option key={choice} value={choice}>{choice}</option>
                ))}
              </select>
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
          {error && <div className="form-error">{error.error || 'Une erreur est survenue.'}</div>}
          {success && <div className="form-success">{success}</div>}
        </form>
      </div>
      <Footer />
    </>
  );
}

export default InscriptionForm;
