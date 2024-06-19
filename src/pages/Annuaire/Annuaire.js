import React, { useEffect, useState } from 'react';
import cardData from '../../db/Administration.json';
import { IoMdSearch, IoIosArrowDown } from "react-icons/io";
import { GoMail } from "react-icons/go";
import { FaPhone } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { FcNext, FcPrevious } from "react-icons/fc"; 
import Header from "../../components/header";
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import './Annuaire.css';
import axios from 'axios';

const pagesize = 6; 

function AnnuaireRecommended() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(cardData.length / pagesize); 
  const [cards, setCards] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); 

  useEffect(() => {
    loadDataInfo();
    loadDataAnnuaireAdmin();
  }, []);
  
  const loadDataInfo = () => {
    axios.get('http://localhost:8000/annuaire/services/')
      .then(res => {
        console.log(res.data.services);
        setServices(res.data.services);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(true);
        setLoading(false);
      });
  };

  const handleServiceSelect = service => {
    setSelectedService(service);
    console.log(selectedService);
  };

  const loadDataAnnuaireAdmin = () => {
    axios.get('http://localhost:8000/annuaire/administration/filter/')
      .then(res => {
        setCards(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(true);
        setLoading(false);
      });
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
      const formattedService = selectedService.charAt(0).toLowerCase() + selectedService.slice(1);
      const matchesService = selectedService === '' || card.service.toLowerCase() === formattedService;
      return matchesSearchTerm && matchesService;
    }).slice(startIndex, endIndex);
  };

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
            <span className='annuaire-search-bar'>Services</span>
            <IoIosArrowDown
              color='white' size={25} style={{ position: 'relative', top: '12', right: '15', cursor: 'pointer' }}
              onClick={toggleMenu}
            />
            {showMenu && (
              <ul className="annuaire-submenu">
                {services && services.length > 0 && services.map((service, index) => {
                  return (
                    <li key={index} onClick={() => handleServiceSelect(service)}>{service}</li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
        <div className='annuaire-card-container'>
          {getCurrentPageCards().map((product, index) => (
            <div key={index} className='annuaire-card'>
              <img src={`http://localhost:8000/${product.photo}`} alt={product.title} />
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
          <button onClick={prevPage} disabled={currentPage === 0}><FcPrevious /></button>
          <span>{currentPage + 1} / {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages - 1}><FcNext /></button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AnnuaireRecommended;
