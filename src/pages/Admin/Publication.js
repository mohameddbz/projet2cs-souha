import React, { useState, useEffect } from 'react';
import { FaList, FaSearch, FaPen, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './Publication.css';
import SidebarPub from '../../components/Sidebar/SidebarAdmin/SidebarPub';
import PublicationModal from './Modifier';
import './Modifier.css';

function PublicationPage() {
    const [publications, setPublications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [selectedPublication, setSelectedPublication] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchPublications();  // Initial fetch
    }, []);

    const fetchPublications = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://127.0.0.1:8000/publication/search/', {
                headers: { 'Authorization': `token ${token}` }
            });
            setPublications(response.data.map(pub => ({
                ...pub,
                date_debut: pub.date_debut ? new Date(pub.date_debut).toISOString().slice(0, 16) : '',
                date_fin: pub.date_fin ? new Date(pub.date_fin).toISOString().slice(0, 16) : '',
                date_publication: pub.date_publication ? new Date(pub.date_publication).toISOString().slice(0, 16) : ''
            })));
        } catch (error) {
            console.error('Erreur lors de la récupération des publications:', error);
            setError('Failed to fetch publications. Please try again later.');
        }
    };

    function handleApprove(id) {
        const token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/publication1/${id}/`, {
            headers: { 'Authorization': `token ${token}` }
        })
        .then(response => {
            setSelectedPublication({
                ...response.data,
                date_debut: response.data.date_debut ? new Date(response.data.date_debut).toISOString().slice(0, 16) : '',
                date_fin: response.data.date_fin ? new Date(response.data.date_fin).toISOString().slice(0, 16) : '',
                date_publication: response.data.date_publication ? new Date(response.data.date_publication).toISOString().slice(0, 16) : ''
            });
            setShowPopup(true);
        })
        .catch(error => {
            console.error('Failed to fetch publication details:', error);
            alert('Failed to load publication details. Please try again.');
        });
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredPublications = publications.filter(
        publication =>
            publication.titre.toLowerCase().includes(searchTerm) ||
            publication.etat.toLowerCase().includes(searchTerm) ||
            publication.date_publication.includes(searchTerm)
    );

    if (error) {
        return <div>Error loading publications. Please try again later.</div>;
    }
    function handleReject(id) {
        const token = localStorage.getItem('token');
        axios.delete(`http://127.0.0.1:8000/publication/delete/${id}/`, {
            headers: { 'Authorization': `token ${token}` }
        })
        .then(response => {
            console.log('Publication rejected successfully:', response);
            fetchPublications();  // Refresh the list after deletion
        })
        .catch(error => {
            console.error('Failed to reject the publication:', error);
            alert('Failed to reject the publication. Please try again.');
        });
    }

    return (
        <div className='admin-page-container'>
            <div className='sidebar'>
                <SidebarPub />
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
                            <th>État</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredPublications.map(publication => (
                        <tr key={publication.id_publication}>
                            <td>{publication.titre || 'No Title'}</td>
                            <td>{publication.etat || 'No Status'}</td>
                            <td>{publication.date_publication || 'No Date'}</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="approve" data-tooltip="Modifier" onClick={() => handleApprove(publication.id_publication)}>
                                        <FaPen/>
                                    </button>
                                    <button className="reject" data-tooltip="Supprimer" onClick={() => handleReject(publication.id_publication)}>
                                        <FaTrash/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {showPopup && (
    <PublicationModal
    
        publication={selectedPublication}

        onClose={() => setShowPopup(false)}
        onSave={(updatedPublication) => {
            console.log('Updated Publication:', updatedPublication);
           
            // Appeler API pour sauvegarder les modifications ou mettre à jour l'état localement
            setShowPopup(false);
            fetchPublications();  // Refresh the list
        }}
    />
)}
        </div>
    );
}

export default PublicationPage;
