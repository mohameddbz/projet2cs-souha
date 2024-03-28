import React, { useState } from 'react';
import './Recommended.css';
import cardData from '../../db/products.json';
import { IoMdSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import arriere from '../../Images/arriere.png';
import { GoMail } from "react-icons/go";
import { FaPhone } from "react-icons/fa6";
import { MdPlace } from "react-icons/md";
import Header from "../header"

function Recommended() {
    const [cards, setCards] = useState(cardData);
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu); // Inverser l'état pour afficher ou masquer le menu
    };

    return (
        <div className='recommended-container'>
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
                                    <FaPhone style={{ marginRight: '6px' }} />
                                </div>
                                <span>{product.tel}</span>
                            </section>
                            <section className='card-reviews'>
                                <div className='icon-circle'>
                                    <MdPlace size={26} style={{ marginRight: '6px' }} />
                                </div>
                                <span>{product.adr}</span>
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

export default Recommended;
