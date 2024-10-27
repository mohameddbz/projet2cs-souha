import React, { useState, useEffect } from 'react';
import { FaList, FaSearch, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './partenaire.css';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';
import './Modifier.css';

function PartenaireDemende() {
   // const [userInfo, setUserInfo] = useState('');
    const [partenaires, setPartenaires] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        fetchPartenaires();
    }, []);

    const fetchPartenaires = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/demande_partenariat/all`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'

            });
            console.log(response.data)
            setPartenaires(response.data);
        } catch (error) {
            console.error('Error fetching partenaires:', error);
            setError('Failed to fetch publications. Please try again later.');
        }
    };

    const handleApprove = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/demande_partenariat/accepter/${id}/`,
                {},  // Empty object for the body
                {
                    headers: { 'Authorization': `Token ${token}` }  // Authorization header with token
                }
            );
            alert('Action completed successfully.');
            fetchPartenaires();
        } catch (error) {
            console.error('Failed to perform the action:', error);
            alert('Failed to complete the action. Please try again.');
        }
        
    };

    const handleReject = async (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`${process.env.REACT_APP_API_URL}/partenaire/${id}/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => {
            console.log('partenaire deleted successfully:', response);
            fetchPartenaires(); // Refresh partenaire list
        })
        .catch(error => {
            console.error('Failed to delete partenaire:', error);
            alert('Failed to delete the user. Please try again.');
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredPartenaires = partenaires.filter(
        partenaire =>
            partenaire.nom.toLowerCase().includes(searchTerm) ||
            partenaire.email.toLowerCase().includes(searchTerm) ||
            partenaire.contact.includes(searchTerm)
    );

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='admin-page-container'>
            <div className='sidebar'>
                <SidebarRelex />
            </div>
            <div className="admin-container">
                <div className="admin-header">
                    <h1><FaList /> Historique Demende </h1>
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
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Etat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPartenaires.map(partenaire => (
                            <tr key={partenaire.id}>
                                <td>{partenaire.nom }</td>
                                <td>{partenaire.email || 'No Email'}</td>
                                <td>{partenaire.phoneNumber || 'No Contact'}</td>
                                <td>
                                    {/* <div className="action-buttons">
                                    <button className="reject" data-tooltip="Supprimer" onClick={() => handleReject(partenaire.id)}>
                                            <FaTrash />
                                        </button>
                                    </div> */}
                                    {partenaire.etat }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PartenaireDemende;