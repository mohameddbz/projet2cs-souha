import React, { useState } from 'react';
import { FaSearch, FaClock } from 'react-icons/fa';
import './Admin.css'; // Assurez-vous que le chemin est correct
import SidebarAdm from '../../components/Sidebar/SidebarAdmin/SidebarAdm';

function HistoriquePage() {
    const publications = [
        { id: 1, title: "Evenement Data Hack", author: "Club Scientifique de l'ESI", status: "Validé", suppdate: "2023/09/17", date: "2023/09/17" },
        { id: 2, title: "Conference sur AI", author: "Department d'Informatique", status: "Supprimé", suppdate: "2023/09/17", date: "2023/10/01" },
        { id: 3, title: "Workshop sur les réseaux", author: "Club Network", status: "Validé", suppdate: "2023/09/17", date: "2023/09/20" },
        { id: 4, title: "Séminaire sur la sécurité", author: "Club Securité", status: "Validé", suppdate: "2023/09/17", date: "2023/09/25" },
        { id: 5, title: "Hackathon 2023", author: "Club Developpement", status: "Validé", suppdate: "2023/09/17", date: "2023/11/15" }
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredPublications = publications.filter(
        publication =>
            publication.title.toLowerCase().includes(searchTerm) ||
            publication.author.toLowerCase().includes(searchTerm) ||
            publication.status.toLowerCase().includes(searchTerm) ||
            publication.suppdate.includes(searchTerm)
    );

    return (
        <div className='admin-page-container'>
        <div className='sidebar'>
        <SidebarAdm />
        </div>
       
        <div className="admin-container">
                <div className="admin-header">
                    <h1>
                        <FaClock /> Historique de Publications
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
                            <th>Etat</th>
                            <th>Date de suppression</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPublications.map(publication => (
                            <tr key={publication.id}>
                                <td>{publication.title}</td>
                                <td>{publication.author}</td>
                                <td>{publication.status}</td>
                                <td>{publication.suppdate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
    );
}

export default HistoriquePage;
