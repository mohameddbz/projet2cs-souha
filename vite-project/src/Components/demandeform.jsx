import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa'; 

function DemandeForm() {
  // États du formulaire
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [phone, setPhone] = useState('');
  const [immatriculation, setImmatriculation] = useState('');
  const [cycleEtudes, setCycleEtudes] = useState('');
  const [nomPiece, setNomPiece] = useState('');
  const [quantite, setQuantite] = useState(1);
  const [description, setDescription] = useState('');

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Traitement des données du formulaire
    // À remplacer par une intégration avec l'API du backend
    console.log({ nom, prenom, phone, immatriculation, cycleEtudes, nomPiece, quantite, description });
  };

  // Gérer la quantité
  const handleQuantityChange = (delta) => {
    setQuantite((prevQuantite) => Math.max(1, prevQuantite + delta));
  };

  return (
    <div className="bg-white shadow rounded-lg p-8 max-w-3xl mx-auto my-10">
      <h1 className="text-3xl font-bold text-left mb-6">Demander Pièce électronique</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nom et Prénom */}
        <div className="flex gap-4">
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom"
            className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2"
            required
          />
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Prenom"
            className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2"
            required
          />
        </div>
      <div>
      <div>
          <label htmlFor="immatriculation" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Numéro d'immatriculation
          </label>
          <input type="text" id="immatriculation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Numéro d'immatriculation" required />
        </div>

        <div>
          <label htmlFor="phone" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Téléphone
          </label>
          <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Téléphone" required />
        </div>
        <div>
          <label htmlFor="cycleDetude" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Cycle d'étude
          </label>
          <input list="cycle-options" id="cycleDetude" name="cycleDetude" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Sélectionnez ou saisissez une option..." />
          <datalist id="cycle-options">
            <option value="Cycle 1" />
            <option value="Cycle 2" />
          </datalist>
        </div>
      </div>
        
        {/* Nom de la pièce et Quantité */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={nomPiece}
            onChange={(e) => setNomPiece(e.target.value)}
            placeholder="Nom de la pièce"
            className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2"
            required
          />
          <div className="flex items-center">
  <button
    type="button"
    onClick={() => handleQuantityChange(-1)} // Modifiez ici pour utiliser -1 pour diminuer
    className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2 mr-2"
  >
    <FaMinus />
  </button>
  <input
    type="number" // Modifiez le type en "number"
    id="quantite"
    name="quantite"
    value={quantite}
    onChange={(e) => setQuantite(Math.max(1, Number(e.target.value)))} // Assurez-vous que la quantité ne peut pas être inférieure à 1
    className="text-center bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
    style={{ maxWidth: '3rem' }}
  />
  <button
    type="button"
    onClick={() => handleQuantityChange(1)} // Modifiez ici pour utiliser 1 pour augmenter
    className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2 ml-2"
  >
    <FaPlus />
  </button>
</div>
        </div>

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Bref description pourquoi vous demandez cette piece"
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg p-3"
        >
          Demander
        </button>
      </form>
    </div>
  );
}

export default DemandeForm;
