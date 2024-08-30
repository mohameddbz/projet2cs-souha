import React, { useState, useEffect } from 'react';
import { FaList, FaSearch, FaPen, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './partenaire.css';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';
import PartenaireModala from './partenaireModal';
 import './Modifier.css';
import { useNavigate } from 'react-router-dom';

function PartenairePage() {
    const navigate = useNavigate();
   // const [userInfo, setUserInfo] = useState('');
    const [partenaires, setPartenaires] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [selectedPartenaires, setSelectedPartenaires] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchPartenaires();
    }, [showPopup]);

    const fetchPartenaires = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/partenaires`, {
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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/partenaire/${id}/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'
            });
            setSelectedPartenaires({
                ...response.data,
                nom: response.data.nom ,
                email: response.data.email ,
                contact: response.data.contact 
            });
            setShowPopup(true);
        } catch (error) {
            console.error('Failed to fetch publication details:', error);
            alert('Failed to load publication details. Please try again.');
        }
    };

    const handleReject = async (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`${process.env.REACT_APP_API_URL}/partenaire/${id}/delete/`, {
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
                    <h1><FaList /> Partenaires </h1>
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
                                <td>{partenaire.contact || 'No Contact'}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="approve" data-tooltip="Modifier" onClick={() => handleApprove(partenaire.id)}>
                                            <FaPen />
                                        </button>
                                        <button className="reject" data-tooltip="Supprimer" onClick={() => handleReject(partenaire.id)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showPopup && (
                <PartenaireModala
                    partenaire={selectedPartenaires}
                    onClose={() => setShowPopup(false)}
                    onSave={(updatedPartenaires) => {
                        console.log('Updated Partenaire:', updatedPartenaires);
                        setShowPopup(false);
                        fetchPartenaires();  // Refresh the list after saving
                    }}
                />
            )}
        </div>
    );
}

export default PartenairePage;