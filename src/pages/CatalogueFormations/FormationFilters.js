import React, { useState } from 'react';
import './CatalogueFormation.css'; // Assurez-vous d'ajouter les styles nécessaires dans votre fichier CSS
import './FormationFilters.css';

function FormationFilters({ onFilterChange }) {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      onFilterChange(name, value); // Appelle la fonction passée en props
    };
  
    return (
      <div className="filtersContainer"> {/* Respecter la structure de la classe */}
        <input
          type="text"
          className="searchInput"  // Mêmes classes
          placeholder="Rechercher"
          name="searchTerm"
          onChange={handleInputChange}
        />
        <select name="type" className="filterDropdown" onChange={handleInputChange}>
          <option value="">Type</option>
          <option value="certification">Certification</option>
          <option value="diplome">Diplôme</option>
        </select>
        <select name="duree" className="filterDropdown" onChange={handleInputChange}>
          <option value="">Durée</option>
          <option value="courte">Courte</option>
          <option value="longue">Longue</option>
        </select>
        <select name="mode" className="filterDropdown" onChange={handleInputChange}>
          <option value="">Mode</option>
          <option value="online">En ligne</option>
          <option value="offline">En présentiel</option>
        </select>
        <select name="langue" className="filterDropdown" onChange={handleInputChange}>
          <option value="">Langue</option>
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
        </select>
        <select name="dateDebut" className="filterDropdown" onChange={handleInputChange}>
          <option value="">Date Début</option>
          <option value="2023-09-01">Septembre 2023</option>
          <option value="2023-10-01">Octobre 2023</option>
        </select>
        <select name="certifiante" className="filterDropdown" onChange={handleInputChange}>
          <option value="">Certifiante</option>
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
      </div>
    );
  }
  
  export default FormationFilters;