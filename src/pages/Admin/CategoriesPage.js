import React, { useState, useEffect } from 'react';
import { FaList, FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CategoriesPage.css';
import SidebarFablab from '../../components/SidebarAdmin/SidebarFablab';
import CategoryModal from './CategoryModal';

function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories/`, {
                headers: { 'Authorization': `token ${token}` }
            });
            setCategories(response.data);
        } catch (error) {
            // console.error('Erreur lors de la récupération des catégories:', error);
            // setError('Failed to fetch categories. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/categories/delete/${id}/`, {
                headers: { 'Authorization': `token ${token}` }
            });
            console.log('Category deleted successfully');
            fetchCategories(); // Re-fetch categories after deletion
        } catch (error) {
            console.error('Failed to delete the category:', error);
            alert('Failed to delete the category. Please try again.');
        }
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
    };

    const handleSave = async (updatedCategory) => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/categories/update/${updatedCategory.id_category}/`, updatedCategory, {
                headers: { 'Authorization': `token ${token}` }
            });
            console.log('Category updated successfully');
            setSelectedCategory(null);
            fetchCategories(); // Re-fetch categories after update
        } catch (error) {
            console.error('Failed to update the category:', error);
            alert('Failed to update the category. Please try again.');
        }
    };

    const handleCloseModal = () => {
        setSelectedCategory(null);
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='admin-page-container'>
            <div className='sidebar'>
                <SidebarFablab />
            </div>
            <div className="admin-container">
                <div className="admin-header">
                    <h1><FaList /> Catégories</h1>
                    <input
                        type="text"
                        placeholder="Rechercher une catégorie..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <Link to="/ajouter_categorie" className="add-button">
                        <FaPlus /> Ajouter 
                    </Link>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.map(category => (
                                <tr key={category.id_category}>
                                    <td>{category.id_category}</td>
                                    <td>{category.name || 'No Name'}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button onClick={() => handleEdit(category)} className="approve" data-tooltip="Modifier">
                                                <FaPen />
                                            </button>
                                            <button className="reject" data-tooltip="Supprimer" onClick={() => handleDelete(category.id_category)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {selectedCategory && (
                <CategoryModal
                    category={selectedCategory}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}

export default CategoriesPage;
