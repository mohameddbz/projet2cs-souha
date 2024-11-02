import React, { useState, useEffect } from 'react';
import { FaList, FaSearch, FaPen, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './partenaire.css';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';
import ThemeModal from './ThemeModal';
 import './Modifier.css';
import { useNavigate } from 'react-router-dom';

function ThemeList() {
    const navigate = useNavigate();
    const [formation, setFormation] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [selectedFormation, setSelectedFormation] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchFormation();
    }, [showPopup]);

    const fetchFormation = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/themes-formation/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'

            });
            console.log(response.data)
            setFormation(response.data);
        } catch (error) {
            console.error('Error fetching formations:', error);
            setError('Failed to fetch formations. Please try again later.');
        }
    };

    const handleApprove = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/theme-formation/${id}/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'
            });
            setSelectedFormation({
                ...response.data,
                titre: response.data.titre ,
                cours: response.data.cours,
            });
            setShowPopup(true);
        } catch (error) {
            console.error('Failed to fetch formation details:', error);
            alert('Failed to load formation details. Please try again.');
        }
    };

    const handleReject = async (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`${process.env.REACT_APP_API_URL}/theme-formation/delete/${id}/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => {
            fetchFormation(); // Refresh formation list
        })
        .catch(error => {
            console.error('Failed to delete formation:', error);
            alert('Failed to delete the formation. Please try again.');
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredFormations = formation.filter(
        form =>
            form.titre.toLowerCase().includes(searchTerm) || 
            form.cours.toLowerCase().includes(searchTerm) 
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
                    <h1><FaList /> Lists des formations </h1>
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
                            <th>Cours</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFormations.map(form => (
                            <tr key={form.id}>
                                <td>{form.titre }</td>
                                <td className="competences">
                                    {form.cours.map((com, index) => (
                                        <li key={index}>{com.titre}</li>
                                    ))}
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="approve" data-tooltip="Modifier" onClick={() => handleApprove(form.id)}>
                                            <FaPen />
                                        </button>
                                        <button className="reject" data-tooltip="Supprimer" onClick={() => handleReject(form.id)}>
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
                <ThemeModal
                    form={selectedFormation}
                    onClose={() => setShowPopup(false)}
                    onSave={(updatedFormation) => {
                        console.log('Updated formation:', updatedFormation);
                        setShowPopup(false);
                        fetchFormation();  // Refresh the list after saving
                    }}
                />
            )}
        </div>
    );
}

export default ThemeList;