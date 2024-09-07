import React, { useState, useEffect } from 'react'
import TopNav from './top-nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCircleUser, faXmark , faGlobe , faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/images/logo_esi1.svg'
import { Link } from 'react-router-dom'
import listItem from './NavbarItems'
import DropdownNav from './DropdownNav'
import { MdOutlineExpandMore } from 'react-icons/md';

function Navbar() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [navSmallSize, setNavSmallSize] = useState(false);
    const [openMenuSmallNav, setOpenMenuSmallNav] = useState(false);
    const [openAProposSubMenu, setOpenAProposSubMenu] = useState(false);

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

    const toggleSubMenu = (index) => {
        setHoveredIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className='navbar-full-container'>
            {!navSmallSize ? (
                // Version desktop
                <div className='navbar-totale'>
                    <div className='navbar-container'>
                        <img className='navbarLogo' src={logo} alt=''></img>
                        <div className='navbar-links'>
                            <div className='navPart1'>
                                <TopNav />
                            </div>
                            <div className='navPart2'>
                                <ul className='navPart2UL'>
                                    {listItem.map((item, index) => (
                                        <li
                                            className='navItem'
                                            key={index}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            {item.label}
                                            {hoveredIndex === index && (
                                                <div className='toggleNavbarItem'>
                                                    <DropdownNav subMenu={item.subMenu} />
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                    <li><Link to='/Auth'><FontAwesomeIcon icon={faCircleUser} className='NavUserIcon' /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
           
            ) : (
               
              // Version mobile
<div className='collapseNavbar-container'>
    <div className='topSectionNav'>
        <img className='navCollapLogo' src={logo} alt='Logo'></img>
        <div className='toggleIocnDiv' onClick={() => setOpenMenuSmallNav(!openMenuSmallNav)}>
            <FontAwesomeIcon icon={openMenuSmallNav ? faXmark : faBars} className="toggleIcon"/>
            {openMenuSmallNav ? 'CLOSE' : 'MENU'}
        </div>
    </div>
    <div className='navCollapseListContain'>
        {openMenuSmallNav && (
            <div className='navCollapseList'>
                <div className='NavUserDiv'>
                    <Link to='/Auth'>
                        <FontAwesomeIcon icon={faCircleUser} className='NavUserCollapIcon'/>
                    </Link>
                    <div className='navlangues'>
                    <FontAwesomeIcon 
                      icon={faGlobe} 
                    style={{ color: "#FFFFFF", marginRight: "5px", fontSize: "24px" ,marginTop: "-10px"}} 
                    />

                        <select name="language" defaultValue="french">
                            <option value="french">Français</option>
                            <option value="english">Anglais</option>
                            <option value="arab">Arabe</option>
                        </select>
                    </div>
                </div>
                <ul>
                    <li className='SearchNav-coll'>
                        <input className='SearchNav-input' type='text' placeholder='Chercher via un mot clé ...'/>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </li>
                    {listItem.map((item, index) => (
                        <li
                            key={index}
                            className='Nav-coll'
                            onClick={() => toggleSubMenu(index)}
                        >
                            {item.label}
                            <MdOutlineExpandMore className={`expand-icon ${hoveredIndex === index ? 'open' : ''}`} />
                            {hoveredIndex === index && (
                                <ul className='sub-menu'>
                                    <div className='sub-menu-container'>
                                        {item.subMenu.map((sub, subIndex) => (
                                            <div className='sub-menu-column' key={subIndex}>
                                                <h4>{sub.title}</h4>
                                                <ul>
                                                    {sub.items.map((subItem, itemIndex) => (
                                                        <li key={itemIndex}>
                                                            <Link to={subItem.lien}>{subItem.item}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </ul>
                                
                            )}
                        </li>
                       
                    ))}
                              
                    <li className='Nav-coll'>
                    <Link to='https://www.mesrs.dz/index.php/fr/plateformes-mesrs/' className='topNavLink'>
                        <span className='sdnSpan'>SDN</span>
                        E-Plateforme
                    </Link>
                </li>
                    <li className='Nav-coll'><Link to='' className='topNavLink'>Actualités</Link></li>
                    <li className='Nav-coll'><Link to='' className='topNavLink'>Ecole & staff</Link></li>
                    <li className='Nav-coll'><Link to='/EventList' className='topNavLink'>Evenements</Link></li>
                    <li className='Nav-coll'><Link to='' className='topNavLink'>Alumnis</Link></li>
                    <li className='Nav-coll'><Link to='' className='topNavLink'>MyESI</Link></li>
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
