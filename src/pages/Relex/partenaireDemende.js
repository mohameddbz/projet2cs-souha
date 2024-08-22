import React, { useState, useEffect } from 'react';
import { FaList, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import './partenaire.css';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';
import PartenaireModala from './partenaireModal';
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
            const filteredPublications = response.data.filter(
                partenaire => partenaire.etat !== 'Acceptée' && partenaire.etat !== 'Refusée'
            );
            console.log(filteredPublications)
            setPartenaires(filteredPublications);
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
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/demande_partenariat/refuser/${id}/`,
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
                    <h1><FaList /> Partenaires Demendes </h1>
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
                            <th>Action</th>
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
                                        <button className="approve" data-tooltip="Accepter" onClick={() => handleApprove(partenaire.id)}>
                                            <FaCheckCircle color="green" size="24px" />
                                        </button>
                                        <button className="reject" data-tooltip="Refuser" onClick={() => handleReject(partenaire.id)}>
                                            <FaTimesCircle color="red" size="24px" />
                                        </button>
                                    </div> */}
                                    <div className="action-buttons">
                                        <button className="approve" data-tooltip="Accepter" onClick={() => handleApprove(partenaire.id)}>&#10004;</button>
                                        <button className="reject" data-tooltip="Refuser" onClick={() => handleReject(partenaire.id)}>&#10006;</button>
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

export default PartenaireDemende;