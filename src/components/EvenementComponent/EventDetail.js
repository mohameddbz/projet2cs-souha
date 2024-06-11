import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft, faCalendarDays, faClock, faLocationDot, faUsers} from '@fortawesome/free-solid-svg-icons';
import tree from '../../assets/images/TreePic.jpg'
import './Events.css'
import { Link } from 'react-router-dom';

function EventDetail () {
  return (
    <div className='eventDetail-full-container'>
        <div className='eventDetail-title'>
            Explorer Nos <span className='events-span'>Evénements</span>
        </div>
        <div className='eventDetail-container'>
            <div >
                <Link to={'/coucou'} className='goBack-eventDetail'>
                    <FontAwesomeIcon icon={faArrowLeft} className='eventIcon'/>Revenir aux évènements
                </Link>
            </div>
            <div className='eventDetail'>
                <div className='eventDetail-part1'>
                    <img src={tree} alt='' className='eventDetail-img'/>
                    <div className='eventDescription'>
                        <div className='descrBtn'>Description</div>
                        <div className='eventDescription-text'>
                            Dans le cadre des efforts menés par l'école pour la lutte contre le changement 
                            climatique et la restauration d'un écosystème naturel, l'ESI a organisé une campagne 
                            de reboisement hier mardi 05 mars 2024  à 14h00, et ce, en collaboration avec la Direction 
                            des forets et la ceinture verte de la wilaya d'Alger, circonscriptions  de Belfort.
                            Cette campagne a vu la participation de toute la communauté de l'école étudiants, 
                            enseignants et employés ayant contribué à la  plantation de plus de 200 arbustes dans les 
                            différents espaces de l'école.
                            Cette opération de plantation vise également à consacrer la culture environnementale 
                            dans la communauté de l'école  et à faire connaitre l'importance de la ceinture verte, 
                            tout en inculquant aux participants les bonnes pratiques de plantation et les 
                            modalités de préservation des arbustes plantés au regard des changements climatiques.
                            enseignants et employés ayant contribué à la  plantation de plus de 200 arbustes dans les 
                            différents espaces de l'école.
                        </div>
                    </div>
                </div>
                <div className='eventDetail-part2'>
                    <div className='eventDetailCaract'>
                        <div className='eventDate'>
                            <span className='dateSpan'>06</span>Mar
                        </div>
                        <div className='typeEvent'>COMPAGNE DE REBOISEMENT</div>
                        <div className='EventTitle'>Arbre pour chaque étudiant</div>
                        <div className='eventOrganizer'>Par : Ecole Nationale Supérieure d'informatique</div>
                    </div>
                    <div className='eventInformation'>
                        <div className='eventItem'>
                            <FontAwesomeIcon icon={faLocationDot} className='eventInfoIcon'/>
                            L'Ecole Nationale Superieure D'Informatique, Alger , Oued Semar
                        </div>
                        <div className='eventItem'>
                            <FontAwesomeIcon icon={faCalendarDays} className='eventInfoIcon'/>
                            Mardi  06 Mars 2024
                        </div>
                        <div className='eventItem'>
                            <FontAwesomeIcon icon={faClock} className='eventInfoIcon'/>
                            A partir de 12 : 30
                        </div>
                        <div className='eventItem'>
                            <FontAwesomeIcon icon={faUsers} className='eventInfoIcon'/>
                            Les etudiants de l'ESI 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EventDetail