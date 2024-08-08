import React, { useEffect, useState, useCallback } from 'react';
import { IoMdSearch, IoIosArrowDown } from 'react-icons/io';
import { GoMail } from 'react-icons/go';
import { FaPhone } from 'react-icons/fa';
import { MdPlace } from 'react-icons/md';
import { FcNext, FcPrevious } from 'react-icons/fc';
import Header from '../../components/header';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import './Annuaire.css';
import axios from 'axios';

const PAGE_SIZE = 6;

function AnnuaireRecommended() {
  const [currentPage, setCurrentPage] = useState(0);
  const [cards, setCards] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesResponse, cardsResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/annuaire/services/`),
          axios.get(`${process.env.REACT_APP_API_URL}/annuaire/administration/filter/`)
        ]);
        setServices(servicesResponse.data.services);
        setCards(cardsResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalPages = Math.ceil(cards.length / PAGE_SIZE);

  const getCurrentPageCards = () => {
    const startIndex = currentPage * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return cards.filter(card => {
      const fullName = `${card.nom} ${card.prenom}`.toLowerCase();
      const matchesSearchTerm = fullName.includes(searchTerm.toLowerCase());
      const formattedService = selectedService.toLowerCase();
      const matchesService = selectedService === '' || card.service.toLowerCase() === formattedService;
      return matchesSearchTerm && matchesService;
    }).slice(startIndex, endIndex);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const toggleMenu = () => {
    setShowMenu(prev => !prev);
  };

  const handlePageChange = (direction) => {
    setCurrentPage(prev => {
      const newPage = direction === 'next' ? prev + 1 : prev - 1;
      return Math.max(0, Math.min(newPage, totalPages - 1));
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

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
            <IoMdSearch color='white' size={25} style={{ position: 'relative', top: '12px', right: '15px' }} />
          </div>
          <div className="annuaire-search">
            <span className='annuaire-search-bar'>Services</span>
            <IoIosArrowDown
              color='white' size={25} style={{ position: 'relative', top: '12px', right: '15px', cursor: 'pointer' }}
              onClick={toggleMenu}
            />
            {showMenu && (
              <ul className="annuaire-submenu">
                {services.map((service, index) => (
                  <li key={index} onClick={() => handleServiceSelect(service)}>
                    {service}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          
        </div>
        <div className='annuaire-card-container'>
          {getCurrentPageCards().map((product, index) => (
            <div key={index} className='annuaire-card'>
              <img src={`${process.env.REACT_APP_API_URL}${product.photo}`} alt={product.title} />
              <div className='annuaire-card-details'>
                <h3 className='annuaire-title'>{product.nom} {product.prenom}</h3>
                <section className='annuaire-card-review'>
                  <span>{product.service}</span>
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
          <button onClick={() => handlePageChange('prev')} disabled={currentPage === 0}><FcPrevious /></button>
          <span>{currentPage + 1} / {totalPages}</span>
          <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages - 1}><FcNext /></button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AnnuaireRecommended;
