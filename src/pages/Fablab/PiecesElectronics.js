import React, { useEffect, useState } from 'react';
import { IoMdSearch, IoIosArrowDown } from 'react-icons/io';
import { FcPrevious, FcNext } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import './PiecesElectronics.css';
import axios from 'axios';

const pagesize = 6; // Nombre de pièces par page

function PiecesElectronics() {
  const [pieces, setPieces] = useState([]);
  const [filteredPieces, setFilteredPieces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    loadCategories();
    loadPieces();
  }, []);

  useEffect(() => {
    filterPieces();
  }, [selectedCategory, searchTerm, pieces]);

  const loadCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories/`);
      const categoriesData = response.data || [];
      setCategories(categoriesData);

      const categoryMap = {};
      categoriesData.forEach(category => {
        categoryMap[category.id_category] = category.name;
      });
      setCategoryMap(categoryMap);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(true);
    }
  };

  const loadPieces = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/pieces/`);
      setPieces(response.data || []);
    } catch (error) {
      console.error('Error fetching pieces:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const filterPieces = () => {
    let filtered = pieces;

    if (selectedCategory) {
      filtered = filtered.filter(piece => piece.categorie === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(piece =>
        piece.nom.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPieces(filtered);
    setTotalPages(Math.ceil(filtered.length / pagesize));
  };

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    setCurrentPage(1); // Réinitialiser à la première page lors du changement de catégorie
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Réinitialiser à la première page lors du changement de terme de recherche
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const indexOfLastItem = currentPage * pagesize;
  const indexOfFirstItem = indexOfLastItem - pagesize;
  const currentItems = filteredPieces.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <Navbar />
      <div className='pieces-electronics-container'>
        <h1 className='pieces-title'>Pièces électroniques</h1>
        <div className='pieces-sidebar'>
          <div className='pieces-search'>
            <input
              type="text"
              className='pieces-search-bar'
              placeholder="Chercher par nom"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <IoMdSearch color='white' size={25} style={{ position: 'relative', top: '12', right: '15' }} />
          </div>
          <div className="pieces-search">
            <span className='pieces-search-bar'>Catégories</span>
            <IoIosArrowDown
              color='white' size={25} style={{ position: 'relative', top: '12', right: '15', cursor: 'pointer' }}
              onClick={toggleMenu}
            />
            {showMenu && (
              <ul className="pieces-submenu">
                {categories.map((category, index) => (
                  <li key={index} onClick={() => handleCategorySelect(category.id_category)}>
                    {category.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className='pieces-card-container'>
          {loading && <p>Loading...</p>}
          {error && <p>Error loading pieces. Please try again later.</p>}
          {!loading && !error && currentItems.length === 0 && <p>No pieces found.</p>}
          {!loading && !error && currentItems.map((piece, index) => (
            <Link to={`/Fablab/pieces/${piece.id_piece}`} key={index} className='pieces-card'>
              <img src={`${process.env.REACT_APP_API_URL}${piece.photo}`} alt={piece.nom} />
              <div className='pieces-card-details'>
                <h3 className='pieces-title'>{piece.nom}</h3>
                <section className='pieces-card-review'>
                  <span>{categoryMap[piece.categorie]}</span>
                </section>
                <div className={`piece-status ${piece.etat ? 'available' : 'unavailable'}`}>
                  {piece.etat ? 'Disponible' : 'Non disponible'}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className='pieces-pagination'>
          <button onClick={prevPage} disabled={currentPage === 1}><FcPrevious /></button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}><FcNext /></button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PiecesElectronics;
