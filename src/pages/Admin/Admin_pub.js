import React, { useState, useEffect } from 'react';
import { FaList, FaSearch, FaTrash } from 'react-icons/fa';
import SidebarAdm from '../../components/Sidebar/SidebarAdmin/SidebarAdm';
import axios from 'axios';
import './Admin_pub.css';

function PublicationAdmin() {
    const [publications, setPublications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    const fetchPublications = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/publication/search/?etat=valide`, {
                headers: { 'Authorization': `token ${token}` }
            });
            setPublications(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des publications:', error);
            setError('Failed to fetch publications. Please try again later.');
        }
    };

    useEffect(() => {
        fetchPublications();
    }, []);

    const handleReject = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/publication/annuler/${id}/`, {}, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });
            console.log('Publication rejected successfully:', response);
            fetchPublications(); // Refresh publications list
        } catch (error) {
            console.error('Failed to reject publication:', error);
            alert('Failed to reject the publication. Please try again.');
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredPublications = publications.filter(
        publication =>
            publication.titre?.toLowerCase().includes(searchTerm) ||
            publication.etat?.toLowerCase().includes(searchTerm) ||
            publication.date_publication?.includes(searchTerm)
    );

    if (error) {
        return <div>Error loading publications. Please try again later.</div>;
    }

    return (
        <div className='admin-page-container'>
            <div className='sidebar'>
                <SidebarAdm />
            </div>
            <div className="admin-container">
                <div className="admin-header">
                    <h1><FaList /> Publications</h1>
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
                            <th>Acteur</th>
                            <th>État</th>
                            <th>Validation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPublications.map(publication => (
                            <tr key={publication.id_publication}>
                                <td>{publication.titre || 'No Title'}</td>
                                <td>{publication.publisher || 'No Publisher'}</td>
                                <td>{publication.etat || 'No Status'}</td>
                                <td>{publication.date_publication || 'No Date'}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="reject" data-tooltip="Supprimer" onClick={() => handleReject(publication.id_publication)}><FaTrash/></button>
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

export default PublicationAdmin;
