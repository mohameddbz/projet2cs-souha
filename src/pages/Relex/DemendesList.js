import React, { useState, useEffect } from 'react';
import { FaList, FaSearch, FaPen, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './partenaire.css';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';
import Devis from './Devis';
 import './Modifier.css';
import { useNavigate } from 'react-router-dom';

function DemendesList() {
    const navigate = useNavigate();
    const [Demendes, setDemendes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [selectedDemendes, setSelectedDemendes] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchDemendes();
    }, [showPopup]);

    const fetchDemendes = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/demande-devis/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'

            });
            console.log(response.data)
            setDemendes(response.data);
        } catch (error) {
            console.error('Error fetching formations:', error);
            setError('Failed to fetch formations. Please try again later.');
        }
    };

    const handleApprove = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/demande-devis/${id}/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'
            });
            setSelectedDemendes({
                ...response.data,
                organisme: response.data.organisme ,
                email: response.data.email ,
                Numero_telephone: response.data.Numero_telephone,
                Formations : response.data.Formations,
                date_fin : response.data.Nombre_participants
            });
            setShowPopup(true);
        } catch (error) {
            console.error('Failed to fetch formation details:', error);
            alert('Failed to load formation details. Please try again.');
        }
    };


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filterdDemendes = Demendes.filter(
        demd =>
            demd.organisme.toLowerCase().includes(searchTerm) ||
            demd.email.toLowerCase().includes(searchTerm) ||
            demd.Numero_telephone.includes(searchTerm) ||
            demd.Nombre_participants.includes(searchTerm)
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
                    <h1><FaList /> Lists des demendes </h1>
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
                            <th>organisme</th>
                            <th>Formations</th>
                            <th>email</th>
                            <th>Nombre participants</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterdDemendes.map(form => (
                            <tr key={form.id}>
                                <td>{form.organisme }</td>
                                <td className="competences">
                                    {form.Formations.map((com, index) => (
                                        <li key={com.id}>{com.titre}</li>
                                    ))}
                                </td>
                                <td>{form.email}</td>
                                <td>{form.Nombre_participants }</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="approve" data-tooltip="Répondre" onClick={() => handleApprove(form.id)}>Répondre</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showPopup && (
                <Devis
                    demende={selectedDemendes}
                    onClose={() => setShowPopup(false)}
                    onSave={(updatedDemendes) => {
                        console.log('Updated demendes:', updatedDemendes);
                        setShowPopup(false);
                        fetchDemendes();  // Refresh the list after saving
                    }}
                />
            )}
        </div>
    );
}

export default DemendesList;