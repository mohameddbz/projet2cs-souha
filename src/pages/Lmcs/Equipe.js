
/* mohamed amine integration  */

import React, { useState, useEffect } from 'react';
import './Equipe.css';
import { GoMail } from "react-icons/go";
import { FaPhone } from "react-icons/fa";
import { MdPlace, MdExpandMore } from "react-icons/md";
import equipe1 from '../../images/equipe1.png';
import equipe2 from '../../images/equipe2.png';
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";

const pageSize = 3;

function Equipe() {
    const [equipes, setEquipes] = useState([]);
    const [members, setMembers] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    // Fetch team data from the API
    useEffect(() => {
        const fetchEquipes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/laboratoire/lmcs/equipes/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEquipes(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchEquipes();
    }, []);

    // Fetch members of a specific team
    useEffect(() => {
        const fetchMembers = async (equipeId) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/equipe/${equipeId}/members/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMembers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (expandedIndex !== null) {
            const equipeId = equipes[expandedIndex]?.id_equipe_recherche; // Use the correct field
            fetchMembers(equipeId);
        }
    }, [expandedIndex, equipes]);

    const toggleDetails = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    const getCurrentPageCards = () => {
        const startIndex = currentPage * pageSize;
        const endIndex = startIndex + pageSize;
        return equipes.slice(startIndex, endIndex);
    };

    return (
        <div>
            <Navbar />
            <div className='equipe-container'>
                <div className='first-section'>
                    <img className='back-image' src={equipe1} alt="backdrop" />
                    <img className='cover-img' src={equipe2} alt="cover" />
                    <h1 className='equipe-title'>Equipes de Recherche</h1>
                    <h5 className='equiipe-desc'>
                        Le LMCSI se compose d'équipes de recherche dynamiques et talentueuses dont les travaux contribuent à l'avancement des connaissances en informatique. Chaque équipe se spécialise dans un domaine précis, offrant au LMCSI une expertise et une couverture scientifique larges et diversifiées.
                    </h5>
                </div>

                <div className='equipe-con'>
                    {getCurrentPageCards().map((equipe, index) => (
                        <div key={equipe.id_equipe_recherche} className='equipe'>
                            <div className='equipe-detail'>
                                <h2 className='equipe-titre'>{equipe.nom}</h2>
                                <h3 className='equipe-titre2'>Theme</h3>
                                <span>{equipe.theme}</span>
                                {expandedIndex === index && (
                                    <>
                                        <h3 className='equipe-titre2'>Axe de recherche</h3>
                                        <span>{equipe.axe_recherche}</span>
                                        <h3 className='equipe-titre2'>Problèmatique</h3>
                                        <span>{equipe.problematique}</span>
                                        <h3 className='equipe-titre2'>Objectifs</h3>
                                        <span>{equipe.objectif}</span>
                                        <h3 className='equipe-titre2'>Equipe de recherche</h3>
                                        <div className='equipe-card-container'>
                                            {members.map((memberData) => {
                                                const member = memberData.contact; // Extract contact info from the nested structure
                                                return (
                                                    <div key={member.id} className='lmcs-card'>
                                                        <img
                                                            src={member.photo ? `${process.env.REACT_APP_API_URL}${member.photo}` : 'default-image.png'}
                                                            alt={`${member.nom} ${member.prenom}`}
                                                        />
                                                        <div className='annuaire-card-details'>
                                                            <h3 className='annuaire-title'>{member.nom} {member.prenom}</h3>
                                                            <section className='annuaire-card-review'>
                                                                <span>{member.description}</span>
                                                            </section>
                                                            <section className='annuaire-card-reviews'>
                                                                <div className='annuaire-icon-circle'>
                                                                    <GoMail style={{ marginRight: '6px' }} />
                                                                </div>
                                                                <span>{member.email}</span>
                                                            </section>
                                                            <section className='annuaire-card-reviews'>
                                                                <div className='annuaire-icon-circle'>
                                                                    <FaPhone style={{ marginRight: '6px' }} />
                                                                </div>
                                                                <span>{member.contact}</span>
                                                            </section>
                                                            <section className='annuaire-card-reviews'>
                                                                <div className='annuaire-icon-circle'>
                                                                    <MdPlace size={34} style={{ marginRight: '6px' }} />
                                                                </div>
                                                                <span>{member.linkedin}</span>
                                                            </section>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                                <div className='plus' onClick={() => toggleDetails(index)}>
                                    <span>Voir plus</span>
                                    <MdExpandMore style={{ transform: expandedIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Equipe;