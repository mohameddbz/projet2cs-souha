import React, { useState, useEffect } from 'react';
import { FaHourglassHalf, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import './Admin.css';
import SidebarAdm from '../../components/Sidebar/SidebarAdmin/SidebarValidateur';

function Valid() {
    const [publications, setPublications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [reload,setReload]=useState(0);
    const [userMap, setUserMap] = useState({});

const incrementReload = () => {

    setReload(preReload => preReload + 1)
}

const getUser = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
            headers: { 'Authorization': `Token ${token}` }
        });
        return res.data;  // Return the response data
    } catch (error) {
        console.error('Error fetching user:', error);
        return null; // Optionally return null or an error object
    }
};
const fetchUserDetails = async (publications) => {
    const newUserMap = {};
    await Promise.all(
        publications.map(async (publication) => {
            const userData = await getUser(publication.publisher);
            newUserMap[publication.id_publication] = userData;
        })
    );
    setUserMap(newUserMap);
};

    // Déplacez fetchPublications ici pour la rendre accessible dans tout le composant
    const fetchPublications = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/publication/searchall/?etat=en attente`, {
                headers: { 'Authorization': `token ${token}` }
            });
            const filteredPublications = response.data.filter(
                pub => pub.type_publication !== 'article' && pub.type_publication !== 'success story' 
            );
            setPublications(filteredPublications);
            fetchUserDetails(filteredPublications);
        } catch (error) {
            console.error('Erreur lors de la récupération des publications:', error);
            setError('Failed to fetch publications. Please try again later.');
        }
    };

    useEffect(() => {
        fetchPublications();
    }, [reload]);

    const handleApprove = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/publication/validate/${id}/`, {}, {
                headers: { 'Authorization': `token ${token}` }
            });
            console.log('Publication approved successfully:', response);
           // fetchPublications(); // Refresh publications list
            incrementReload()
        } catch (error) {
            console.error('Failed to approve publication:', error);
            alert('Failed to approve the publication. Please try again.');
        }
    };
    
    const handleReject = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/publication/refuse/${id}/`, {}, {
                headers: { 'Authorization': `token ${token}` }
            });
            console.log('Publication rejected successfully:', response);
            incrementReload()
            //  fetchPublications(); // Refresh publications list
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
            publication.titre.toLowerCase().includes(searchTerm) ||
            publication.etat.toLowerCase().includes(searchTerm) ||
            publication.date_publication.includes(searchTerm)
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
                    <h1><FaHourglassHalf /> Publications en attente</h1>
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
                            <th>type_publication</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredPublications.map(publication => (
                        <tr key={publication.id_publication}>
                            <td>{publication.titre || 'No Title'}</td>
                            <td>{userMap[publication.id_publication]?.family_name || 'null'}</td>
                            <td>{publication.type_publication }</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="approve" data-tooltip="Approuver" onClick={() => handleApprove(publication.id_publication)}>&#10004;</button>
                                    <button className="reject" data-tooltip="Rejeter" onClick={() => handleReject(publication.id_publication)}>&#10006;</button>
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

export default Valid;