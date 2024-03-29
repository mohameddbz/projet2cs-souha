import React, { useState } from 'react';
import PieceCard from './PieceCard'; // Assurez-vous d'avoir un composant PieceCard qui prend des données de pièce et les affiche correctement
import { FaSearch } from 'react-icons/fa';
// Exemple de données factices pour la démonstration
const fakeData = [
    {
      id: 1,
      name: 'Arduino ABX00092',
      available: true,
      category: 'Microcontrôleurs',
      stock: 15,
      image: "src/assets/pok.jpg", // Mettez le chemin correct de l'image ici
    },
    {
      id: 2,
      name: 'Raspberry Pi 4',
      available: false,
      category: 'Encodeurs',
      stock: 0,
      image: "src/assets/dfd.jpg",
    },
    {
        id: 3,
        name: 'Raspberry Pi 4',
        available: false,
        category: 'Transistor',
        stock: 0,
        image: "src/assets/dfd.jpg",
      },
      {
        id: 4,
        name: 'Raspberry Pi 4',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: "src/assets/dfd.jpg",
      },
      {
        id: 5,
        name: 'Raspberry Pi 4',
        available: false,
        category: 'Microcontrôleurs',
        stock: 0,
        image: "src/assets/dfd.jpg",
      },
      {
        id: 6,
        name: 'Raspberry Pi 4',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: "src/assets/dfd.jpg",
      },
      {
        id: 7,
        name: 'Raspberry Pi 4',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: "src/assets/dfd.jpg",
      },
      {
        id: 8,
        name: 'Raspberry Pi 4',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: "src/assets/dfd.jpg",
      },
    // Ajoutez plus d'objets pièce ici
  ];

function PiecesPage() {
    const [filteredCategories, setFilteredCategories] = useState(new Set());

    // Obtenir la liste unique des catégories
    const categories = new Set(fakeData.map((piece) => piece.category));
    const handleSearch = (event) => {
        // ...logique pour gérer la recherche...
      };

    // Fonction pour ajouter ou supprimer des catégories du filtre
    const toggleCategory = (category) => {
        setFilteredCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    };

    // Filtrer les pièces en fonction des catégories sélectionnées
    const filteredPieces = fakeData.filter((piece) =>
        filteredCategories.size === 0 || filteredCategories.has(piece.category)
    );
  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-4">
        {/* Sidebar pour le filtrage et la recherche */}
        <aside className="w-1/4 flex-shrink-0">
        <div className="sticky top-4 p-4 bg-white shadow-md rounded-lg">
        <div className="flex mb-10 items-center max-w-xs mx-auto bg-white rounded-lg shadow-md">
        <input
    type="search"
    name="search"
    placeholder="Chercher par un mot clé"
    className="w-full px-4 text-gray-800 rounded-l-lg focus:outline-none"
    onChange={handleSearch}
  />
  <button className="px-4 py-4 text-white bg-blue-500 rounded-r-lg">
    <FaSearch className="w-5 h-5" />
  </button>
              </div>
            <div>
          <h3 className="font-bold mb-2">Catégories</h3>
          {[...categories].map((category, index) => (
            <div key={index} className="mb-1">
              <input
                type="checkbox"
                id={`category-${category}`}
                name="category"
                onChange={() => toggleCategory(category)}
              />
              <label htmlFor={`category-${category}`} className="ml-2">{category}</label>
            </div>
          ))}
        </div>
        </div>
        </aside>

        {/* Grille des pièces */}
        <section className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPieces.map((piece) => (
            <PieceCard key={piece.id} piece={piece} />
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}

export default PiecesPage;
