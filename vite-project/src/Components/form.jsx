import React from 'react';

function InscriptionForm() {
  return (
    <div className="bg-white shadow rounded-lg p-8 max-w-4xl mx-auto my-10">
      <h1 className="text-3xl font-bold text-left mb-6">Formulaire d'inscription</h1>
      <h3 className="text-sm font-normal text-left mb-6">
      Formulaire d'Inscription pour Nouveau Projet à  ESI-FabLab 
      </h3>
      <form>
        {/* Nom et Prénom dans une grille à 2 colonnes */}
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label htmlFor="nom" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nom
            </label>
            <input type="text" id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nom" required />
          </div>
          <div>
            <label htmlFor="prenom" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Prénom
            </label>
            <input type="text" id="prenom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Prénom" required />
          </div>
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
        <div>
          <label htmlFor="typeProjet" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Type de Projet
          </label>
          <input list="types-options" id="typeProjet" name="typeProjet" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Sélectionnez ou saisissez une option..." />
          <datalist id="types-options">
            <option value="Type 1" />
            <option value="Type 2" />
          </datalist>
        </div>
        <div>
          <label htmlFor="outilsMaitrise" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Outils Maitrisés
          </label>
          <input list="outils-options" id="outilsMaitrise" name="outilsMaitrise" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Sélectionnez ou saisissez une option..." />
          <datalist id="outils-options">
            <option value="Outil 1" />
            <option value="Outil 2" />
          </datalist>
        </div>
        <div>
          <label htmlFor="projetEnrelationAvec" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Projet en Relation avec
          </label>
          <input list="prjt-options" id="projetEnrelationAvec" name="projetEnrelationAvec" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Sélectionnez ou saisissez une option..." />
          <datalist id="prjt-options">
            <option value="Outil 1" />
            <option value="Outil 2" />
          </datalist>
        </div>
        </div>
       
         {/* Description */}
         <div className="mb-6">
          <textarea
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            rows="4"
            placeholder="Bref description sur le projet"
            required
          ></textarea>
        </div>
         
       {/* Champ Captcha */}
       <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="captcha">Captcha:</label>
          <div className="flex">
            <input
              type="text"
              id="captcha"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Entrez Captcha"
              required
            />
            <button
              type="button"
              className="bg-gray-200 text-gray-700 text-sm rounded-r-lg px-4 border border-l-0 border-gray-300"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg p-3"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}
export default InscriptionForm;