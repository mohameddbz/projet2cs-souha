import React from 'react'
import navImg from '../../assets/images/navImg.jpg'
import './navbar.css'
import { Link } from 'react-router-dom'

function DropdownNav (props) {
  return (
            <div className={props.hoveredIndex !== null && props.hoveredIndex === props.index ? 'hoverNavMenuItem block' : 'none'}>
                <div className='sectionHoverMenu'>
                    <img src={navImg} alt='' className='navImg'></img>
                    <div className='navItem-contact'>Contactez-Nous</div>
                    <div className='navItem-Text'>Pour toute question ou demande d'information, n'hésitez pas à nous contacter.</div>
                </div>
                {
                    props.subMenu.map((list, i) =>{
                    return(
                        <ul className='sectionHoverMenu'>
                        <li className='navItem-title'>{list.title}</li>
                        {
                            list.items.map((item, i) =>{
                                // if(item.lien==="/ProgrammeFinal"){
                                //     window.location.href = "https://talents.esi.dz/scolar/programme_list/";
                                //     return null; // ou une autre valeur si nécessaire
                                // } else {
                                    return( 
                                        <li className='hoverNavItem'><Link className='hoverNavItemLink' to={item.lien}>{item.item}</Link></li>
                                    )
                                // }
                          
                            })
                        }
                        </ul>
                        )
                    })
                }
            </div>
  )
}

export default DropdownNav