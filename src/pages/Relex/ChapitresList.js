import React, { useState, useEffect } from 'react';
import { FaList, FaSearch, FaPen, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './partenaire.css';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';
import ChapitreModal from './ChapitreModal';
 import './Modifier.css';
import { useNavigate } from 'react-router-dom';

function ChapitreList() {
    const navigate = useNavigate();
   // const [userInfo, setUserInfo] = useState('');
    const [chapitre, setChapitre] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [selectedChapitre, setSelectedChapitre] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchChapitres();
    }, [showPopup]);

    const fetchChapitres = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/chapitres/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'

            });
            setChapitre(response.data);
        } catch (error) {
            console.error('Error fetching chapitres:', error);
            setError('Failed to fetch chapitre. Please try again later.');
        }
    };

    const handleApprove = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/chapitre/${id}/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'
            });
            setSelectedChapitre({
                ...response.data,
                titre: response.data.titre ,
                contenu: response.data.contenu ,
                duree: response.data.duree  ,
            });
            setShowPopup(true);
        } catch (error) {
            console.error('Failed to fetch chapitre details:', error);
            alert('Failed to load chapitre details. Please try again.');
        }
    };

    const handleReject = async (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`${process.env.REACT_APP_API_URL}/chapitre/delete/${id}/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => {
            fetchChapitres(); // Refresh formateur list
        })
        .catch(error => {
            console.error('Failed to delete chapitre:', error);
            alert('Failed to delete the chapitre. Please try again.');
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredChapitre = chapitre.filter(
        chap =>
            chap.titre.toLowerCase().includes(searchTerm) ||
            chap.contenu.toLowerCase().includes(searchTerm) ||
            chap.duree.includes(searchTerm)
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
                    <h1><FaList /> Lists des chapitres </h1>
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
                            <th>Contenue</th>
                            <th>Duree</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredChapitre.map(chap => (
                            <tr key={chap.id}>
                                <td>{chap.titre }</td>
                                <td>{chap.contenu }</td>
                                <td>{chap.duree }</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="approve" data-tooltip="Modifier" onClick={() => handleApprove(chap.id)}>
                                            <FaPen />
                                        </button>
                                        <button className="reject" data-tooltip="Supprimer" onClick={() => handleReject(chap.id)}>
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
                <ChapitreModal
                    chapitre={selectedChapitre}
                    onClose={() => setShowPopup(false)}
                    onSave={(updatedChapitre) => {
                        console.log('Updated chapitre:', updatedChapitre);
                        setShowPopup(false);
                        fetchChapitres();  // Refresh the list after saving
                    }}
                />
            )}
        </div>
    );
}

export default ChapitreList;