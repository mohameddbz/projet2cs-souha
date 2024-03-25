import React, { useState } from 'react';
import cardData from '../../db/Alumni.json';
import { IoMdSearch, IoIosArrowDown } from "react-icons/io";
import { GoMail } from "react-icons/go";
import { FaLinkedinIn } from "react-icons/fa";
import { FcNext, FcPrevious } from "react-icons/fc"; 
import Header from "../../Components/header";
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
    <div className='recommended-container'>
      <Header />

      <div className='sidebar'>
                <div className='search'>
                    <input type="text" className='search-bar' placeholder="Rechercher par un mot clé" />
                    <IoMdSearch color='white' size={25} style={{ position: 'relative', top: '12', right: '15' }} />
                </div>
                <div className="search">
                    <span className='search-bar'>Promo</span>
                    <IoIosArrowDown
                        color='white' size={25} style={{ position: 'relative', top: '12', right: '15', cursor: 'pointer' }}
                        onClick={toggleMenu}
                    />
                    {showMenu && (
                        <ul className="submenu">
                            <li>Option 1</li>
                            <li>Option 2</li>
                            <li>Option 3</li>
                        </ul>
                    )}
                </div>
            </div>

      <div className='card-container'>
        {getCurrentPageCards().map((product, index) => (
          <div key={index} className='card'>
            <img src={product.img} alt={product.title} />
            <div className='card-details'>
              <h3 className='title'>{product.title}</h3>
              <section className='card-review'>
                <span>{product.profession}</span>
              </section>
              <section className='card-reviews'>
                <div className='icon-circle'>
                  <GoMail style={{ marginRight: '6px' }} />
                </div>
                <span>{product.email}</span>
              </section>
              <section className='card-reviews'>
                <div className='icon-circle'>
                  <FaLinkedinIn style={{ marginRight: '6px' }} />
                </div>
                <span>{product.linkedin}</span>
              </section>
              
            </div>
          </div>
        ))}
      </div>

      <div className='pagination'>
        <button onClick={prevPage} disabled={currentPage === 0}><FcPrevious /></button>
        <span>{currentPage + 1} / {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages - 1}><FcNext /></button>
      </div>
    </div>
  );
}

export default Recommended;
