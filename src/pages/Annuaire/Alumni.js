import React, { useState } from 'react';
import cardData from '../../db/Alumni.json';
import { IoMdSearch, IoIosArrowDown } from "react-icons/io";
import { GoMail } from "react-icons/go";
import { FaLinkedinIn } from "react-icons/fa";
import { FcNext, FcPrevious } from "react-icons/fc"; 
import Header from "../../components/header";
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/Footer/Footer"
import '../Annuaire/Annuaire.css';
;

const pageSize = 6; 
function Recommended() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(cardData.length / pageSize); 
  const [cards, setCards] = useState(cardData);
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu); 
    };

 
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

 
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

 
  const getCurrentPageCards = () => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return cardData.slice(startIndex, endIndex);
  };

  return (
    <div>
      <Navbar/>
    <div className='annuaire-recommended-container'>

      <Header />

      <div className='annuaire-sidebar'>
                <div className='annuaire-search'>
                    <input type="text" className='annuaire-search-bar' placeholder="Rechercher par un mot clé" />
                    <IoMdSearch color='white' size={25} style={{ position: 'relative', top: '12', right: '15' }} />
                </div>
                <div className="annuaire-search">
                    <span className='annuaire-search-bar'>Promo</span>
                    <IoIosArrowDown
                        color='white' size={25} style={{ position: 'relative', top: '12', right: '15', cursor: 'pointer' }}
                        onClick={toggleMenu}
                    />
                    {showMenu && (
                        <ul className="annuaire-submenu">
                            <li>Option 1</li>
                            <li>Option 2</li>
                            <li>Option 3</li>
                        </ul>
                    )}
                </div>
            </div>

      <div className='annuaire-card-container'>
        {getCurrentPageCards().map((product, index) => (
          <div key={index} className='annuaire-card'>
            <img src={product.img} alt={product.title} />
            <div className='annuaire-card-details'>
              <h3 className='annuaire-title'>{product.title}</h3>
              <section className='annuaire-card-review'>
                <span>{product.profession}</span>
              </section>
              <section className='annuaire-card-reviews'>
                <div className='annuaire-icon-circle'>
                  <GoMail style={{ marginRight: '6px' }} />
                </div>
                <span>{product.email}</span>
              </section>
              <section className='annuaire-card-reviews'>
                <div className='annuaire-icon-circle'>
                  <FaLinkedinIn style={{ marginRight: '6px' }} />
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
    <Footer/>
    </div>
    


  );
}

export default Recommended;
