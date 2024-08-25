import React, { useState, useEffect } from 'react';
import { FaList, FaSearch, FaPen, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './partenaire.css';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';
import ModuleModal from './ModuleModal';
 import './Modifier.css';
import { useNavigate } from 'react-router-dom';

function ModuleList() {
    const navigate = useNavigate();
   // const [userInfo, setUserInfo] = useState('');
    const [module, setModule] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [selectedModule, setSelectedModule] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchModule();
    }, [showPopup]);

    const fetchModule = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/modules/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'

            });
            console.log(response.data)
            setModule(response.data);
        } catch (error) {
            console.error('Error fetching modules:', error);
            setError('Failed to fetch modules. Please try again later.');
        }
    };

    const handleApprove = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/module/${id}/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'
            });
            setSelectedModule({
                ...response.data,
                titre: response.data.titre ,
                description: response.data.description ,
                competences: response.data.competences,
                volume_horaire : response.data.volume_horaire,
                formateur : response.data.formateur
            });
            setShowPopup(true);
        } catch (error) {
            console.error('Failed to fetch module details:', error);
            alert('Failed to load module details. Please try again.');
        }
    };

    const handleReject = async (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`${process.env.REACT_APP_API_URL}/module/delete/${id}/`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => {
            fetchModule(); // Refresh formateur list
        })
        .catch(error => {
            console.error('Failed to delete module:', error);
            alert('Failed to delete the module. Please try again.');
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredModule = module.filter(
        mod =>
            mod.titre.toLowerCase().includes(searchTerm) ||
            mod.description.toLowerCase().includes(searchTerm) ||
            mod.volume_horaire.includes(searchTerm)
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
                    <h1><FaList /> Lists des modules </h1>
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
                            <th>competances</th>
                            <th>formateur</th>
                            <th>Horaire</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredModule.map(module => (
                            <tr key={module.id}>
                                <td>{module.titre }</td>
                                <td className="competences">
                                    {module.competences.map((com, index) => (
                                        <li key={index}>{com.nom}</li>
                                    ))}
                                </td>
                                <td>{module.formateur.nom}</td>
                                <td>{module.volume_horaire }</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="approve" data-tooltip="Modifier" onClick={() => handleApprove(module.id)}>
                                            <FaPen />
                                        </button>
                                        <button className="reject" data-tooltip="Supprimer" onClick={() => handleReject(module.id)}>
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
                <ModuleModal
                    module={selectedModule}
                    onClose={() => setShowPopup(false)}
                    onSave={(updatedModule) => {
                        console.log('Updated module:', updatedModule);
                        setShowPopup(false);
                        fetchModule();  // Refresh the list after saving
                    }}
                />
            )}
        </div>
    );
}

export default ModuleList;