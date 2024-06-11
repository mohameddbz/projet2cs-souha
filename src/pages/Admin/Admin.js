import React, { useState } from 'react';
import { FaHourglassHalf, FaSearch } from 'react-icons/fa';

import './Admin.css'; // Assurez-vous que le chemin est correct
import SidebarAdm from '../../components/Sidebar/SidebarAdmin/SidebarAdm';

function AdminPage() {
    // Array of publications
    const publications = [
        { id: 1, title: "Evenement Data Hack", author: "Club Scientifique de l'ESI", date: "2023/09/17" },
        { id: 2, title: "Conference sur AI", author: "Department d'Informatique", date: "2023/10/01" },
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
            publication.date.includes(searchTerm)
    );

    return (
        <div className='admin-page-container'>
        <div className='sidebar'>
        <SidebarAdm />
        </div>
       
        <div className="admin-container">
        <div className="admin-header">
    <h1>
        <FaHourglassHalf /> {/* Icone de sablier */}
        Publications en attente
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
                    </div>
</div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Auteur</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {filteredPublications.map(publication => (
                        <tr key={publication.id}>
                            <td>{publication.title}</td>
                            <td>{publication.author}</td>
                            <td>{publication.date}</td>
                            <td>
                                <div className="action-buttons">
                                <div className="action-buttons">
    <button className="approve" data-tooltip="Approuver" onClick={() => handleApprove(publication.id)}>&#10004;</button>
    <button className="reject" data-tooltip="Rejeter" onClick={() => handleReject(publication.id)}>&#10006;</button>
</div>

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

export default AdminPage;
