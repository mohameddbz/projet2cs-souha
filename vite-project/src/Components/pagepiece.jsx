import React, { useState,useEffect } from 'react';
import PieceCard from './PieceCard'; // Assurez-vous d'avoir un composant PieceCard qui prend des données de pièce et les affiche correctement
import { FaSearch, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
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
        name: 'Raspberry Pi 5',
        available: false,
        category: 'Transistor',
        stock: 0,
        image: "src/assets/dfd.jpg",
      },
      {
        id: 4,
        name: 'Raspberry Pi 6',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: "src/assets/dfd.jpg",
      },
      {
        id: 5,
        name: 'Raspberry Pi 7',
        available: false,
        category: 'Microcontrôleurs',
        stock: 0,
        image: "src/assets/dfd.jpg",
      },
      {
        id: 6,
        name: 'Raspberry Pi 8',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: "src/assets/dfd.jpg",
      },
      {
        id: 7,
        name: 'Raspberry Pi 9',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: "src/assets/dfd.jpg",
      },
      {
        id: 8,
        name: 'Raspberry Pi 10',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: "src/assets/dfd.jpg",
      },
      {
        id: 9,
        name: 'Arduino ABX0009211',
        available: true,
        category: 'Microcontrôleurs',
        stock: 15,
        image: "src/assets/pok.jpg", // Mettez le chemin correct de l'image ici
      },
      {
        id: 10,
        name: 'Raspberry Pi 12',
        available: false,
        category: 'Encodeurs',
        stock: 0,
        image: "src/assets/dfd.jpg",
      },
      {
          id: 11,
          name: 'Raspberry Pi 13',
          available: false,
          category: 'Transistor',
          stock: 0,
          image: "src/assets/dfd.jpg",
        },
        {
          id: 12,
          name: 'Raspberry Pi 14',
          available: true,
          category: 'Microcontrôleurs',
          stock: 0,
          image: "src/assets/dfd.jpg",
        },
        {
          id: 13,
          name: 'Raspberry Pi 15',
          available: false,
          category: 'Microcontrôleurs',
          stock: 0,
          image: "src/assets/dfd.jpg",
        },
        {
          id: 14,
          name: 'Raspberry Pi 16',
          available: true,
          category: 'Microcontrôleurs',
          stock: 0,
          image: "src/assets/dfd.jpg",
        },
        {
          id: 15,
          name: 'Raspberry Pi 17',
          available: true,
          category: 'Microcontrôleurs',
          stock: 0,
          image: "src/assets/dfd.jpg",
        },
        {
          id: 16,
          name: 'Raspberry Pi 18',
          available: true,
          category: 'Microcontrôleurs',
          stock: 0,
          image: "src/assets/dfd.jpg",
        },
    // Ajoutez plus d'objets pièce ici
  ];


function PiecesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCategories, setFilteredCategories] = useState(new Set());
  const [itemsPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = new Set(fakeData.map((piece) => piece.category));

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Réinitialiser la page lors d'une recherche
  };

  // Mettre à jour le filtrage pour les catégories et réinitialiser la page
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
    setCurrentPage(1); // Réinitialiser la page lors d'un changement de filtre
  };

  const filteredItems = fakeData.filter(piece =>
    (filteredCategories.size === 0 || filteredCategories.has(piece.category)) &&
    piece.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Recalculer le nombre total de pages basé sur les éléments filtrés
  const maxPage = Math.ceil(filteredItems.length / itemsPerPage);

  // Gérer le changement de page et le défilement vers le haut
  const handlePaginationClick = (newPage) => {
    if (newPage < 1 || newPage > maxPage) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calcul des éléments à afficher sur la page courante
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    

    // Filtrer les pièces en fonction des catégories sélectionnées
    // const filteredPieces = fakeData.filter((piece) =>
    //     filteredCategories.size === 0 || filteredCategories.has(piece.category)
    // );
  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-4">
        {/* Sidebar pour le filtrage et la recherche */}
        <aside className="w-1/4 flex-shrink-0">
        <div className="sticky bg-blue-600 top-4 p-4 text-white shadow-md rounded-lg">
        <div className="flex mb-10 items-center max-w-xs mx-auto bg-white rounded-lg shadow-md">
        <input
    type="search"
    name="search"
    placeholder="Chercher par un mot clé"
    className="w-full px-4 text-gray-800 rounded-l-lg focus:outline-none"
    onChange={handleSearch}
  />
  <button className="px-4 py-4 text-white rounded-r-lg" style={{backgroundColor: '#FFA500'}}>
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
          {currentItems.map((piece) => (
            <PieceCard key={piece.id} piece={piece} />
          ))}
           <div>
    </div>
        </div>
      </section>
      </div>
       {/* Boutons de pagination */}
     <div className="flex justify-center mt-4">
        <button className="flex" onClick={() => handlePaginationClick(currentPage - 1)}>
          <FaAngleLeft className="w-8 h-8 text-blue-600"/>
          <FaAngleLeft className="w-8 h-8 text-blue-600"/>
        </button>
        <div>
        <span>{currentPage} / {maxPage}</span>
        </div>
        <button className="flex" onClick={() => handlePaginationClick(currentPage + 1)}>
        <FaAngleRight  className="w-8 h-8 text-blue-600"/>
        <FaAngleRight  className="w-8 h-8 text-blue-600"/>
        </button>
       
      </div>
      <div className="bg-blue-600 rounded-3xl mt-4 flex justify-between items-center mx-auto p-4 max-w-2xl shadow-md">
  <p className="text-white text-rsm font-semibold">
    Vous pouvez demander des pièces ? Allez !
  </p>
  <button className="hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200" style={{background:'#FFA500'}}>
    Demander
  </button>
</div>


    </div>
  );
}

export default PiecesPage;
