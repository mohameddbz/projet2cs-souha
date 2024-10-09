import React, { useState, useEffect } from 'react';
import { FaList, FaSearch, FaPen, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './partenaire.css';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';
import Devis from './Devis';
 import './Modifier.css';
import { useNavigate } from 'react-router-dom';

function DevisList() {
    const navigate = useNavigate();
    const [Devis, setDevis] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDevis();
    }, []);

    const fetchDevis = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/devis/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'

            });
            console.log(response.data)
            setDevis(response.data);
        } catch (error) {
            console.error('Error fetching Devis:', error);
            setError('Failed to fetch devis. Please try again later.');
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleReject = async (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`${process.env.REACT_APP_API_URL}/devis/delete/${id}/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => {
            fetchDevis(); // Refresh formateur list
        })
        .catch(error => {
            console.error('Failed to delete devis:', error);
            alert('Failed to delete the devis. Please try again.');
        });
    };

    const filterDevis = Devis;

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
                    <h1><FaList /> Lists des devis </h1>
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
                            <th>email</th>
                            <th>Montant</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterDevis.map(form => (
                            <tr key={form.id}>
                                <td>{form.demande_devis.organisme }</td>
                                <td>{form.demande_devis.email}</td>
                                <td>{form.montant }</td>
                                <td>
                                    <button className="reject" data-tooltip="Supprimer" onClick={() => handleReject(form.id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DevisList;