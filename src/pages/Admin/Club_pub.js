import React, { useState, useEffect } from 'react';
import { FaList, FaSearch, } from 'react-icons/fa';
import axios from 'axios';
import './Publication.css';
import './Modifier.css';
import SidebarPub from '../../components/Sidebar/SidebarAdmin/SidebarPub';

function EventPage() {
    const [publications, setPublications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    const fetchPublications = async (userInfo) => {
        const token = localStorage.getItem('token');
        console.log(userInfo.club.id_club)
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/events/club/${userInfo.club.id_club}/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'
            });
            setPublications(response.data)
        } catch (error) {
            console.error('Error fetching publications:', error);
            setError('Failed to fetch publications. Please try again later.');
        }
    };

    const getUser = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'
            });
            fetchPublications(res.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            setError('Failed to fetch user info. Please try again later.');
        }
    };

    useEffect(() => {
        getUser();
    }, []);


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredPublications = publications.filter(
        publication =>
            publication.titre.toLowerCase().includes(searchTerm) ||
            publication.description.toLowerCase().includes(searchTerm) 
    );

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='admin-page-container'>
            <div className='sidebar'>
                <SidebarPub />
            </div>
            <div className="admin-container">
                <div className="admin-header">
                    <h1><FaList /> Publications </h1>
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
                            <th>Description</th>
                            <th>Club</th>
                            <th>Date Archivage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPublications.map(publication => (
                            <tr key={publication.id_publication}>
                                <td>{publication.titre }</td>
                                <td>{publication.description }</td>
                                <td>{publication.club.nom || ' / '}</td>
                                <td>
                                    {publication.date_archivage 
                                        ? new Date(publication.date_archivage).toLocaleDateString('fr-FR') 
                                        : ' / '}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EventPage;