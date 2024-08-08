import React from 'react'
import logo from '../../assets/images/logo_esi1.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faUserShield } from '@fortawesome/free-solid-svg-icons'

function NavbarAdmin () {
  return (
    <div className='nabvarAdminContainer'>
        <div className='navbarAdminTotale'>
            <img src={logo} alt='' className='navbarAdminLogo'></img>
            <div className='navbarAdminContent'>
                <FontAwesomeIcon icon={faBell} className='navbarAdminIcon'/>
                <FontAwesomeIcon icon={faUserShield} className='navbarAdminIcon'/>
            </div>
        </div>
    </div>
  )
}

export default NavbarAdmin;