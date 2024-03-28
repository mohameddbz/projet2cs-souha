import React, { useState } from 'react';
import './Alumni.css';
import cardData from '../../db/Alumni.json';
import { IoMdSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import arriere from '../../Images/arriere.png';
import { GoMail } from "react-icons/go";
import { FaLinkedinIn } from "react-icons/fa";
import Header from "../header"

function Alumni() {
    const [cards, setCards] = useState(cardData);
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu); // Inverser l'état pour afficher ou masquer le menu
    };

    return (
        <div className='alumni-container'>
            <Header/>

            <div className='sidebar'>
                <div className='search'>
                    <input type="text" className='search-bar' placeholder="Rechercher par un mot clé" />
                    <IoMdSearch color='white' size={25} style={{ position: 'relative', top: '12', right: '30' }} />
                </div>
                <div className="search">
                    <span className='search-bar'>Services</span>
                    <IoIosArrowDown
                        color='white' size={25} style={{ position: 'relative', top: '12', right: '30', cursor: 'pointer' }}
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
                {cards.map(product => (
                    <section key={product.id} className='card'>
                        <img src={product.img} alt={product.title} />
                        <div className='card-details'>
                            <h3 className='title'>{product.title}</h3>
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
                    </section>
                ))}
            </div>

            <div className='image-container'>
                <img src={arriere} alt="" />
            </div>
        </div>
    );
}

export default Alumni;
