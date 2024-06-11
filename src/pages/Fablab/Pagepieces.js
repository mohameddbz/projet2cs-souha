import React, { useState} from 'react';
import PieceCard from '../../components/PieceCard/PieceCard';
import { FaSearch, FaAngleLeft, FaAngleRight} from 'react-icons/fa';
import './Pagepieces.css';
import CustomCheckbox from '../../components/CustomCheckBox/CustomCheckBox';
import im1 from '../../assets/dfd.jpg';
import im2 from '../../assets/im1.jpeg';
import im3 from '../../assets/im2.jpeg';
import im4 from '../../assets/im3.jpeg';
import im5 from '../../assets/pok.jpg';
import im6 from '../../assets/quas.jpg';
import im7 from '../../assets/prog.png';

const fakeData = [
    {
        id: 1,
        name: 'Arduino ABX00092',
        available: true,
        category: 'Microcontrôleurs',
        stock: 15,
        image: im1,
    },
    {
        id: 2,
        name: 'Raspberry Pi 4',
        available: false,
        category: 'Encodeurs',
        stock: 0,
        image: im2,
    },
    {
        id: 3,
        name: 'Raspberry Pi 5',
        available: false,
        category: 'Transistor',
        stock: 0,
        image: im3,
    },
    {
        id: 4,
        name: 'Raspberry Pi 6',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im4,
    },
    {
        id: 5,
        name: 'Raspberry Pi 7',
        available: false,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im5,
    },
    {
        id: 6,
        name: 'Raspberry Pi 8',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im6,
    },
    {
        id: 7,
        name: 'Raspberry Pi 9',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im7,
    },
    {
        id: 8,
        name: 'Raspberry Pi 10',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im1,
    },
    {
        id: 9,
        name: 'Arduino ABX0009211',
        available: true,
        category: 'Microcontrôleurs',
        stock: 15,
        image: im2,
    },
    {
        id: 10,
        name: 'Raspberry Pi 12',
        available: false,
        category: 'Encodeurs',
        stock: 0,
        image: im3,
    },
    {
        id: 11,
        name: 'Raspberry Pi 13',
        available: false,
        category: 'Transistor',
        stock: 0,
        image: im4,
    },
    {
        id: 12,
        name: 'Raspberry Pi 14',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im5,
    },
    {
        id: 13,
        name: 'Raspberry Pi 15',
        available: false,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im6,
    },
    {
        id: 14,
        name: 'Raspberry Pi 16',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im7,
    },
    {
        id: 15,
        name: 'Raspberry Pi 17',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im1,
    },
    {
        id: 16,
        name: 'Raspberry Pi 18',
        available: true,
        category: 'Microcontrôleurs',
        stock: 0,
        image: im2,
    },
];

function PiecesPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredCategories, setFilteredCategories] = useState(new Set());
    const [itemsPerPage] = useState(9);
    const [searchTerm, setSearchTerm] = useState('');

    const categories = new Set(fakeData.map((piece) => piece.category));

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

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
    setCurrentPage(1);
  };

  const filteredItems = fakeData.filter(piece =>
    (filteredCategories.size === 0 || filteredCategories.has(piece.category)) &&
    piece.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const maxPage = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const handlePaginationClick = (newPage) => {
    if (newPage < 1 || newPage > maxPage) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="containner mx-auto p-6">
          <h1 className="titlee">
                Trouvez tous les composants électroniques dont vous avez besoins sur notre site!
            </h1>
        <div className="flex">
            <aside className="wiwi">
                <div className="sticky top-0 p-4">
                    <div className="search-bar">
                        <input type="search" placeholder="Chercher par un mot clé" onChange={handleSearch} />
                        <button><FaSearch /></button>
                    </div>
                    <div>
                        <h3 className='categories'>Catégories</h3>
                        {[...categories].map((category, index) => (
                            <CustomCheckbox
                                key={index}
                                id={`category-${category}`}
                                label={category}
                                checked={filteredCategories.has(category)}
                                onChange={() => toggleCategory(category)}
                            />
                        ))}
                    </div>
                </div>
            </aside>
            <section className="grid">
                {currentItems.map((piece) => <PieceCard key={piece.id} piece={piece} />)}
            </section>
        </div>
        <div className="pagination">
            <button onClick={() => handlePaginationClick(currentPage - 1)}><FaAngleLeft /></button>
            <span>{currentPage} / {maxPage}</span>
            <button onClick={() => handlePaginationClick(currentPage + 1)}><FaAngleRight /></button>
        </div>
        <div className="action-call">
            <p>Vous voulez demander des pièces ? Allez !</p>
            <button>Demander</button>
        </div>
    </div>
);
}
export default PiecesPage;
