import {React,useState} from 'react'
import './Equipe.css';
import data from '../../db/Enseignants.json';
import { GoMail } from "react-icons/go";
import { FaPhone } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import equipe1 from'../../Images/equipe1.png'
import equipe2 from '../../Images/equipe2.png'
import cardData from '../../db/Equipe.json';
import { MdExpandMore } from "react-icons/md";
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

const pageSize = 3;


function Equipe() {
  
    const [showDetails, setShowDetails] = useState(false);
   
    const [currentPage, setCurrentPage] = useState(0);

    



  
   

  








    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

   

    const getCurrentPageCard = () => {
        const startIndex = currentPage * pageSize;
        const endIndex = startIndex + pageSize;
        return data.slice(startIndex, endIndex);
    };

    const getCurrentPageCards = () => {
        const startIndex = currentPage * pageSize;
        const endIndex = startIndex + pageSize;
        return cardData.slice(startIndex, endIndex);
    };

    return (
        <div className='equipe-container'>
            <div className='first-section'>
                <img className='back-image' src={equipe1} alt="alt text" />
                <img className='cover-img' src={equipe2} alt="alt text" />
                <h1 className='equipe-title'>Equipes de Recherche </h1>
                <h5 className='equiipe-desc'>
                    Le LMCSI se compose d'équipes de recherche dynamiques et talentueuses dont les travaux contribuent à l'avancement des connaissances en informatique. Chaque équipe se spécialise dans un domaine précis, offrant au LMCSI une expertise et une couverture scientifique larges et diversifiées.
                </h5>
            </div>

            <div className='equipe-con'>
                {getCurrentPageCards().map((product, index) => (
                    <div key={index} className='equipe'>
                        <div className='equipe-detail'>
                            <h2 className='equipe-titre'>{product.theme}</h2>
                            <h3 className='equipe-titre2'>Axes de recherche</h3>
                            <span>{product.Axes}</span>
                            {showDetails && (
                                <>
                                    <h3 className='equipe-titre2'>Problèmatique</h3>
                                    <span>{product.Problematique}</span>
                                    <h3 className='equipe-titre2'>Objectifs</h3>
                                    <span>{product.objectif}</span>
                                    <h3 className='equipe-titre2'>Equipe de recherche</h3>
                                    <div className='equipe-card-container'>
                                        {getCurrentPageCard().map((product, index) => (
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
                                                            <FaPhone style={{ marginRight: '6px' }} />
                                                        </div>
                                                        <span>{product.tel}</span>
                                                    </section>
                                                    <section className='card-reviews'>
                                                        <div className='icon-circle'>
                                                            <MdPlace size={34} style={{ marginRight: '6px' }} />
                                                        </div>
                                                        <span>{product.adr}</span>
                                                    </section>
                                                </div>
                                            </div>
                                        ))}
                                      
                                    </div>
                                </>
                            )}
                            <div className='plus'>
                                <span >Voir plus</span>
                                <MdExpandMore onClick={toggleDetails} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            
        </div>
    );
}

export default Equipe;
