// Historique.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {FaList, FaSearch, FaTrash, FaPen,FaPlus} from 'react-icons/fa';

import './Historique_p.css'; // Assurez-vous que le chemin est correct
import SidebarAdm from '../../components/Sidebar/SidebarAdmin/SidebarAdm';

function Historique_p() {
    // Array of publications
    const navigate = useNavigate(); // instance of useHistory
    const publications = [
        { id: 1, title: "Evenement Data Hack", author: "Club Scientifique de l'ESI", date: "2023/09/17" },
        { id: 2, title: "Conference sur AI", author: "Department d'Informatique",date: "2023/10/01" },
        { id: 3, title: "Workshop sur les réseaux", author: "Club Network", date: "2023/09/20" },
        { id: 4, title: "Séminaire sur la sécurité", author: "Club Securité", date: "2023/09/25" },
        { id: 5, title: "Hackathon 2023", author: "Club Developpement", date: "2023/11/15" }
    ];

    function handleApprove(id) {
        console.log("Approved publication with ID:", id);
        // Logic to approve the publication goes here
    }
    
    function handleReject(id) {
        console.log("Rejected publication with ID:", id);
        // Logic to reject the publication goes here
    }
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredPublications = publications.filter(
        publication =>
            publication.title.toLowerCase().includes(searchTerm) ||
            publication.author.toLowerCase().includes(searchTerm) ||
            publication.status.toLowerCase().includes(searchTerm) ||
            publication.date.includes(searchTerm)
    );
    const handlePublishClick = () => {
        navigate('/Admin/publier'); // Navigate to the publish page
    };

    return (
        <div className="admin-page-container">
            <div className="sidebar">
            <SidebarAdm/>
            </div>
            <div className="admin-container">
                <div className="adminn-header">
                    <h1>
                        <FaList /> {/* Icone de sablier */}
                        Historique de publication
                    </h1>

                    <div className="search-box">
                        <button className="search-button" onClick={() => console.log('Search clicked')}>
                            <FaSearch />
                        </button>
                        <input
                            type="search"
                            placeholder="Rechercher"
                            className="search-input"
                            onChange={handleSearchChange}
                        />
                      {/* Ajout du bouton "Publier" avec l'icône FaPlus */}
                     <button className="publish-button" onClick={handlePublishClick}>
                     <FaPlus /> Publier
                    </button>

                    </div>
                </div>

                <table className="adminn-table">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Etat</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPublications.map(publication => (
                            <tr key={publication.id}>
                                <td>{publication.title}</td>
                                <td>{publication.author}</td>
                                {/* <td>{publication.status}</td> */}
                                <td>{publication.date}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="approve" data-tooltip="Modifier" onClick={() => handleApprove(publication.id)}>
                                            <FaPen/>
                                        </button>
                                        <button className="reject" data-tooltip="Rejeter" onClick={() => handleReject(publication.id)}>
                                            <FaTrash/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Historique_p;
