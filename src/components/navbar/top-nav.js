import React from 'react'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGlobe, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function TopNav () {
  return (
    <div className='topNav-full-container'>
        <div className='topNav-container'>
            <ul>
                <li className='topNav-item'>
                    <Link to='https://www.mesrs.dz/index.php/fr/plateformes-mesrs/' className='topNavLink'>
                        <span className='sdnSpan'>SDN</span>
                        E-Plateforme
                    </Link>
                </li>
                <li className='topNav-item'><Link to='' className='topNavLink'>Actualités</Link></li>
                <li className='topNav-item'><Link to='' className='topNavLink'>Ecole & staff</Link></li>
                <li className='topNav-item'><Link to='/EventList' className='topNavLink'>Evenements</Link></li>
                <li className='topNav-item'><Link to='' className='topNavLink'>Alumnis</Link></li>
                <li className='topNav-item'><Link to='' className='topNavLink'>MyESI</Link></li>
                <li className='topNav-item'>
                <Link to='' className='topNavLink'><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
                </li>
                <li className='topNav-item'>
                    <Link to='' className='topNavLink'><FontAwesomeIcon icon={faGlobe} style={{marginRight:"5px"}} />
                    English
                    </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default TopNav;