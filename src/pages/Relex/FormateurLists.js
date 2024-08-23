import React, { useState, useEffect } from 'react';
import { FaList, FaSearch, FaPen, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './partenaire.css';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';
import FormateurModal from './formateurModal';
 import './Modifier.css';
import { useNavigate } from 'react-router-dom';

function FormateurList() {
    const navigate = useNavigate();
   // const [userInfo, setUserInfo] = useState('');
    const [formateur, setFormateur] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [selectedFormateur, setSelectedFormateur] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchFormateur();
    }, [showPopup]);

    const fetchFormateur = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/formateur/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'

            });
            console.log(response.data)
            setFormateur(response.data);
        } catch (error) {
            console.error('Error fetching formateur:', error);
            setError('Failed to fetch formateur. Please try again later.');
        }
    };

    const handleApprove = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/formateur/${id}/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'
            });
            setSelectedFormateur({
                ...response.data,
                nom: response.data.nom ,
                prenom: response.data.prenom ,
                email: response.data.email  ,
                specialites : response.data.specialites 
            });
            setShowPopup(true);
        } catch (error) {
            console.error('Failed to fetch formateur details:', error);
            alert('Failed to load formateur details. Please try again.');
        }
    };

    const handleReject = async (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`${process.env.REACT_APP_API_URL}/formateur/delete/${id}/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => {
            console.log('formateur deleted successfully:', response);
            fetchFormateur(); // Refresh partenaire list
        })
        .catch(error => {
            console.error('Failed to delete formateur:', error);
            alert('Failed to delete the formateur. Please try again.');
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredFormateur = formateur.filter(
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
                    <h1><FaList /> Lists des formateur </h1>
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
                            <th>Prenom</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFormateur.map(formateur => (
                            <tr key={formateur.id}>
                                <td>{formateur.nom }</td>
                                <td>{formateur.prenom }</td>
                                <td>{formateur.email }</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="approve" data-tooltip="Modifier" onClick={() => handleApprove(formateur.id)}>
                                            <FaPen />
                                        </button>
                                        <button className="reject" data-tooltip="Supprimer" onClick={() => handleReject(formateur.id)}>
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
                <FormateurModal
                    formateur={selectedFormateur}
                    onClose={() => setShowPopup(false)}
                    onSave={(updatedFormateur) => {
                        console.log('Updated formateur:', updatedFormateur);
                        setShowPopup(false);
                        fetchFormateur();  // Refresh the list after saving
                    }}
                />
            )}
        </div>
    );
}

export default FormateurList;