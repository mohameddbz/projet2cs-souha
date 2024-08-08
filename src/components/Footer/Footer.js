import React from 'react'
import './Footer.css'
import pit from '../../assets/images/logoEsi.svg'
import facebook from '../../assets/images/facebook.svg'
import twitter from '../../assets/images/twitter.svg'
import instagram from '../../assets/images/insta.svg'
import linkedIn from '../../assets/images/linkedin.svg'
import { Link } from 'react-router-dom';
import ftrImg from '../../assets/images/ftrImg.png'

function Footer () {
  return (
    <div className='globalFtr'>
        <img src={ftrImg} alt='' className='ftrImg'></img>
        <div className='footer-full-container'>
            <div className='footer-container'>
                <div className='section-ftr'>
                    <img src={pit} alt='' className='footer-logo'></img>
                    <div className='social-mediaContainer'>
                        <Link to='https://www.facebook.com/ESI.Page/'><img src={facebook} alt=''></img></Link>
                        <Link to='https://www.instagram.com/explore/locations/155794364456373/esi-ecole-nationale-superieure-dinformatique/'><img src={instagram} alt=''></img></Link>
                        <Link to='https://twitter.com/esialger?lang=fr'><img src={twitter} alt=''></img></Link>
                        <Link to='https://dz.linkedin.com/school/ecole-superieure-informatique-alger/'><img src={linkedIn} alt=''></img></Link>
                    </div>
                </div>
                <div className='section-ftr'>
                    <ul>
                        <li className='footer-title'>Notre école</li>
                        <li>Ecole Nationale Supérieure d'Informatique (ESI ex.INI)Alger, Oued Smar 16309</li>
                        <li><Link to='https://www.esi.dz/' className='ftr-link'>www.esi.dz</Link></li>
                        <li><Link className='ftr-link'>023 93 91 32</Link></li>
                        <li><Link className='ftr-link'>Carte de l'école</Link></li>
                        <li><Link className='ftr-link'>Contactez-nous</Link></li>
                    </ul>
                </div>
                <div className='section-ftr'>
                    <ul>
                        <li className='footer-title'>Notre famille</li>
                        <li><Link className='ftr-link'>Ecole & staff</Link> </li>
                        <li><Link className='ftr-link'>Nos Alumnis</Link></li>
                        <li><Link className='ftr-link'>Nos clubs</Link></li>
                        <li><Link className='ftr-link'>Annuaire des enseignants</Link></li>
                        <li><Link className='ftr-link'>Futurs Bacheliers</Link></li>
                    </ul>
                </div>
                <div className='section-ftr'>
                    <ul>
                        <li className='footer-title'>partenariats & formation</li>
                        <li><Link className='ftr-link'>Partenariats nationale</Link></li>
                        <li><Link className='ftr-link'>Partenariats internationale</Link></li>
                        <li><Link className='ftr-link'>Maisons d'entreprenariat</Link></li>
                        <li><Link className='ftr-link'>Theses et rapports algeriens</Link></li>
                        <li><Link className='ftr-link'>Formation continue</Link></li>
                        <li><Link className='ftr-link'>Formation Avant promotion</Link></li>
                    </ul>
                </div>
            </div>
            <div className='bottom-footer'>
                &copy; L'Ecole Nationale Superieure d'Informatique , Tous Droits Réservés 
            </div>
        </div>
    </div>
    
  )
}

export default Footer