import React, { useState, useEffect } from 'react';
import { FaList, FaSearch, FaTrash } from 'react-icons/fa';
import SidebarAdm from '../../components/Sidebar/SidebarAdmin/SidebarAdm';
import axios from 'axios';
import styles from './ListeUser.module.css';

function ListeUser() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/`, {
                headers: { 'Authorization': `token ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
            setError('Failed to fetch users. Please try again later.');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    function handleReject(id) {
        const token = localStorage.getItem('token');
        axios.delete(`${process.env.REACT_APP_API_URL}/users/delete/${id}/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => {
            console.log('User deleted successfully:', response);
            fetchUsers(); // Refresh users list
        })
        .catch(error => {
            console.error('Failed to delete user:', error);
            alert('Failed to delete the user. Please try again.');
        });
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const getRole = (user) => {
        if (user.is_administrateur) return 'Administrateur';
        if (user.is_editeur) return 'Éditeur';
        if (user.is_chercheur) return 'Chercheur';
        if (user.is_responsable_fablab) return 'Responsable FabLab';
        if (user.is_directeur_relex) return 'Directeur Relex';
        return 'Utilisateur';
    };

    const filteredUsers = users.filter(
        user =>
            user.family_name?.toLowerCase().includes(searchTerm) ||
            user.first_name?.toLowerCase().includes(searchTerm) ||
            user.email?.toLowerCase().includes(searchTerm) ||
            getRole(user).toLowerCase().includes(searchTerm)
    );

    if (error) {
        return <div>Error loading users. Please try again later.</div>;
    }

    return (
        <div className={styles.adminPageContainer}>
            <div className={styles.sidebar}>
                <SidebarAdm />
            </div>
            <div className={styles.adminContainer}>
                <div className={styles.adminHeader}>
                    <h1><FaList /> Liste des Utilisateurs</h1>
                    <div className={styles.searchBox}>
                        <button className={styles.searchButton} onClick={() => console.log('Search clicked')}>
                            <FaSearch />
                        </button>
                        <input
                            type="search"
                            placeholder="Rechercher"
                            className={styles.searchInput}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <table className={styles.adminTable}>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Rôle</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.family_name || 'No Family Name'}</td>
                                <td>{user.first_name || 'No First Name'}</td>
                                <td>{getRole(user)}</td>
                                <td>{user.email || 'No Email'}</td>
                                <td>
                                    <div className={styles.actionButtons}>
                                        <button className={styles.reject} data-tooltip="Supprimer" onClick={() => handleReject(user.id)}><FaTrash/></button>
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

export default ListeUser;
