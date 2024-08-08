import React, { useEffect, useState } from 'react';
import { IoMdSearch, IoIosArrowDown } from "react-icons/io";
import { GoMail } from "react-icons/go";
import { FaPhone } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { FcNext, FcPrevious } from "react-icons/fc"; 
import Header from "../../components/header";
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import '../Annuaire/Annuaire.css';
import axios from 'axios';

const pagesize = 6; 

function Recommended() {
  const [currentPage, setCurrentPage] = useState(0);
  const [cards, setCards] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [grade, setGrade] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadDataInfo();
        await loadDataAnnuaireProfs();
      } catch (err) {
        console.error('Error during data fetching:', err);
        setError('Error fetching data.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const loadDataInfo = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/annuaire/grades/`);
      setGrade(res.data.grades);
    } catch (err) {
      console.error('Error fetching grades:', err);
      setError('Error fetching grades.');
    } finally {
      setLoading(false);
    }
  };

  const loadDataAnnuaireProfs = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/annuaire/enseignant/filter/`);
      setCards(res.data);
    } catch (err) {
      console.error('Error fetching teachers:', err);
      setError('Error fetching teachers.');
    } finally {
      setLoading(false);
    }
  };

  const handlePromoSelect = promo => {
    setSelectedGrade(promo);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu); 
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const getCurrentPageCards = () => {
    const startIndex = currentPage * pagesize;
    const endIndex = startIndex + pagesize;
    return cards.filter(card => {
      const fullName = `${card.nom} ${card.prenom}`.toLowerCase();
      const matchesSearchTerm = fullName.includes(searchTerm.toLowerCase());
      const formattedGrade = selectedGrade.charAt(0).toLowerCase() + selectedGrade.slice(1);
      const matchesGrade = selectedGrade === '' || card.grade.toLowerCase() === formattedGrade;
      return matchesSearchTerm && matchesGrade;
    }).slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(cards.length / pagesize); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Navbar />
      <div className='annuaire-recommended-container'>
        <Header />
        <div className='annuaire-sidebar'>
          <div className='annuaire-search'>
            <input 
              type="text" 
              className='annuaire-search-bar' 
              placeholder="Rechercher par un mot clé" 
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <IoMdSearch color='white' size={25} style={{ position: 'relative', top: '12', right: '15' }} />
          </div>
          <div className="annuaire-search">
            <span className='annuaire-search-bar'>Grades</span>
            <IoIosArrowDown
              color='white' size={25} style={{ position: 'relative', top: '12', right: '15', cursor: 'pointer' }}
              onClick={toggleMenu}
            />
            {showMenu && (
              <ul className="annuaire-submenu">
                {grade && grade.length > 0 && grade.map((gr, index) => (
                  <li key={index} onClick={() => handlePromoSelect(gr)}>{gr}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className='annuaire-card-container'>
          {getCurrentPageCards().map((product, index) => (
            <div key={index} className='annuaire-card'>
              <img src={`${process.env.REACT_APP_API_URL}${product.photo}`} alt={`${product.nom} ${product.prenom}`} />
              <div className='annuaire-card-details'>
                <h3 className='annuaire-title'>{product.nom} {product.prenom}</h3>
                <section className='annuaire-card-review'>
                  <span>{product.grade}</span>
                </section>
                <section className='annuaire-card-reviews'>
                  <div className='annuaire-icon-circle'>
                    <GoMail style={{ marginRight: '6px' }} />
                  </div>
                  <span>{product.email}</span>
                </section>
                <section className='annuaire-card-reviews'>
                  <div className='annuaire-icon-circle'>
                    <FaPhone style={{ marginRight: '6px' }} />
                  </div>
                  <span>{product.contact}</span>
                </section>
                <section className='annuaire-card-reviews'>
                  <div className='annuaire-icon-circle'>
                    <MdPlace size={34} style={{ marginRight: '6px' }} />
                  </div>
                  <span>{product.linkedin}</span>
                </section>
              </div>
            </div>
          ))}
        </div>
        <div className='annuaire-pagination'>
          <button onClick={prevPage} disabled={currentPage === 0}><FcPrevious /></button>
          <span>{currentPage + 1} / {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages - 1}><FcNext /></button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Recommended;
