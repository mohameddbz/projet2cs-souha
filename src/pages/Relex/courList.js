import React, { useState, useEffect } from 'react';
import { FaList, FaSearch, FaPen, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './partenaire.css';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';
import CourModal from './CourModal';
 import './Modifier.css';
import { useNavigate } from 'react-router-dom';

function CourList() {
    const navigate = useNavigate();
   // const [userInfo, setUserInfo] = useState('');
    const [cour, setCour] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [selectedCour, setSelectedCour] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchCour();
    }, [showPopup]);

    const fetchCour = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/cours/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'

            });
            console.log(response.data)
            setCour(response.data);
        } catch (error) {
            console.error('Error fetching cours:', error);
            setError('Failed to fetch cours. Please try again later.');
        }
    };

    const handleApprove = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/cours/${id}/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'
            });
            setSelectedCour({
                ...response.data,
                titre: response.data.titre ,
                description: response.data.description ,
                competences: response.data.competences,
                chapitres : response.data.chapitres
            });
            setShowPopup(true);
        } catch (error) {
            console.error('Failed to fetch course details:', error);
            alert('Failed to load course details. Please try again.');
        }
    };

    const handleReject = async (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`${process.env.REACT_APP_API_URL}/cours/delete/${id}/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => {
            fetchCour(); // Refresh formateur list
        })
        .catch(error => {
            console.error('Failed to delete cours:', error);
            alert('Failed to delete the course. Please try again.');
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredCour = cour.filter(
        cour =>
            cour.titre.toLowerCase().includes(searchTerm) ||
            cour.description.toLowerCase().includes(searchTerm)
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
                    <h1><FaList /> Lists des cours </h1>
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
                            <th>Competances</th>
                            <th>Chapitres</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCour.map(cour => (
                            <tr key={cour.id}>
                                <td>{cour.titre }</td>
                                <td className="competences">
                                    {cour.competences.map((com, index) => (
                                        <li key={index}>{com.nom}</li>
                                    ))}
                                </td>
                                <td className="competences">
                                    {cour.chapitres.map((com, index) => (
                                        <li key={com.id}>{com.titre}</li>
                                    ))}
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="approve" data-tooltip="Modifier" onClick={() => handleApprove(cour.id)}>
                                            <FaPen />
                                        </button>
                                        <button className="reject" data-tooltip="Supprimer" onClick={() => handleReject(cour.id)}>
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
                <CourModal
                    cour={selectedCour}
                    onClose={() => setShowPopup(false)}
                    onSave={(updateCour) => {
                        console.log('Updated cour:', updateCour);
                        setShowPopup(false);
                        fetchCour();  // Refresh the list after saving
                    }}
                />
            )}
        </div>
    );
}

export default CourList;