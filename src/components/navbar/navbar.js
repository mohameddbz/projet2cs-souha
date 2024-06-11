import React, { useState, useEffect } from 'react'
import TopNav from './top-nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCircleUser, faXmark , faGlobe , faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/images/logo_esi1.svg'
import { Link } from 'react-router-dom'
import listItem from './NavbarItems'
import navImg from '../../assets/images/navImg.jpg'
import DropdownNav from './DropdownNav'

function Navbar () {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [navSmallSize, setNavSmallSize] = useState(false);
    const [openMenuSmallNav, setOpenMenuSmallNav] = useState(false);
    const leaveDelay = 300; // Délai en millisecondes

    useEffect(() => {
        const handleResize = () => {
          setNavSmallSize(window.innerWidth < 920);
        };
    
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleMouseEnter = (index) => {
        clearTimeout(leaveTimer);
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        // Réinitialiser l'état seulement si le curseur ne survole pas l'élément principal ou le sous-menu
        const isStillHovered = document.querySelector('.navItem:hover') || document.querySelector('.toggleNavbarItem:hover');
        if (!isStillHovered) {
            leaveTimer = setTimeout(() => {
                setHoveredIndex(null);
            }, leaveDelay);
        }
    }

    let leaveTimer;

    return (
        <div className='navbar-full-container'>
            {!navSmallSize ? (
                <div className='navbar-totale'>
                <div className='navbar-container'>
                    <img className='navbarLogo' src={logo} alt=''></img>
                    <div className='navbar-links'>
                        <div className='navPart1'>
                            <TopNav />
                        </div>
                        <div className='navPart2'>
                            <ul className='navPart2UL'>
                                {listItem.map((item, index) => {
                                    return (
                                        <li
                                            className='navItem'
                                            onMouseEnter={() => handleMouseEnter(index)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            {item.label}
                                            {hoveredIndex === index && (
                                                <div className='toggleNavbarItem'>
                                                    <DropdownNav
                                                        subMenu={item.subMenu}
                                                        hoveredIndex={hoveredIndex}
                                                        index={index}
                                                    />
                                                </div>
                                            )}
                                        </li>
                                    )
                                })}
                                <li><Link to='/Auth'><FontAwesomeIcon icon={faCircleUser} className='NavUserIcon' /></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            ) : (
                <div className='collapseNavbar-container'>
                    <div className='topSectionNav'>
                        <img className='navCollapLogo' src={logo} alt=''></img>
                            {!openMenuSmallNav ? (
                                <div className='toggleIocnDiv'
                                onClick={() => setOpenMenuSmallNav(!openMenuSmallNav)}
                                >
                                    <FontAwesomeIcon
                                        icon={faBars}
                                        className="toggleIcon"/>MENU
                                </div>
                                
                                ) : (
                                <div className='toggleIocnDiv'
                                onClick={() => setOpenMenuSmallNav(!openMenuSmallNav)}>
                                    <FontAwesomeIcon
                                    icon={faXmark}
                                    alt="icon"
                                    className="toggleIcon"
                                />CLOSE
                                </div>
                                )}
                    </div>
                    <div className='navCollapseListContain'>
                        {openMenuSmallNav && (
                        <div className='navCollapseList'>
                                <div className='NavUserDiv'>
                                    <Link to='/Auth'><FontAwesomeIcon icon={faCircleUser} className='NavUserCollapIcon'/></Link>
                                    <div>
                                        <FontAwesomeIcon icon={faGlobe} style={{color: "#FFFFFF",marginRight:"5px"}} />
                                        <select name="selectedFruit" defaultValue="french">
                                            <option value="french">Francais</option>
                                            <option value="english">Anglais</option>
                                            <option value="arab">Arabe</option>
                                        </select>
                                    </div>
                                    
                                </div>
                                <ul>
                                    <li className='SearchNav-coll'>
                                        <input
                                        className='SearchNav-input'
                                        type='text' placeholder='Chercher via un mot clé ...'
                                        />
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </li>
                                    <li className='Nav-coll'>L'école</li>
                                    <li className='Nav-coll'>E-Bachelier</li>
                                    <li className='Nav-coll'>Etudes & académie</li>
                                    <li className='Nav-coll'>Partenariat & Formation</li>
                                </ul>
                                <ul>
                                    <li className='topNav-coll'>
                                        <span className='sdnCollSpan'>SDN</span>
                                        E-Plateforme
                                    </li>
                                    <li className='topNav-coll'>Actualités</li>
                                    <li className='topNav-coll'>Ecole & staff</li>
                                    <li className='topNav-coll'>Evenements</li>
                                    <li className='topNav-coll'>Alumnis</li>
                                    <li className='topNav-coll'>MyESI</li>
                                </ul>
                                
                        </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar;


