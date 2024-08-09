import React, { useState, useEffect } from 'react';
import { FaList, FaSearch, FaTrash } from 'react-icons/fa';
import SidebarAdm from '../../components/Sidebar/SidebarAdmin/SidebarAdm';
import axios from 'axios';
import styles from './ListeUser.module.css';

function ListeUser() {
    const [publications, setPublications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    // Définir fetchPublications en dehors mais à l'intérieur de PublicationAdmin
    const fetchPublications = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://127.0.0.1:8000/publication/search/?etat=valide', {
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

    function handleReject(id) {
        const token = localStorage.getItem('token');
        axios.put(`http://127.0.0.1:8000/publication/annuler/${id}/`, {}, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => {
            console.log('Publication rejected successfully:', response);
            fetchPublications(); // Refresh publications list
        })
        .catch(error => {
            console.error('Failed to reject publication:', error);
            alert('Failed to reject the publication. Please try again.');
        });
    }

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
        <div className={styles.adminPageContainer}>
            <div className={styles.sidebar}>
                <SidebarAdm />
            </div>
            <div className={styles.adminContainer}>
                <div className={styles.adminHeader}>
                    <h1><FaList /> Liste des Utilisateurs</h1>
                    <div className={styles.searchBox}>
                        <button className={styles.searchButton} onClick={() => console.log('Search clicked')}>
                            <FaSearch />
                        </button>
                        <input
                            type="search"
                            placeholder="Rechercher"
                            className={styles.searchInput}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <table className={styles.adminTable}>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Rôle</th>
                            <th>@mail</th>
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
                                    <div className={styles.actionButtons}>
                                        <button className={styles.reject} data-tooltip="Supprimer" onClick={() => handleReject(publication.id_publication)}><FaTrash/></button>
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

export default ListeUser;
