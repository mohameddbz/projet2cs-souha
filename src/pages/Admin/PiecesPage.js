import React, { useState, useEffect } from 'react';
import { FaList, FaPen, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PiecesPage.css';
import SidebarFablab from '../../components/Sidebar/SidebarAdmin/SidebarFablab';
import PieceModal from './PieceModal'; // Assurez-vous que l'importation est correcte

function PiecesPage() {
    const [pieces, setPieces] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryMap, setCategoryMap] = useState({});
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchPieces();
        loadCategories();
    }, []);

    const fetchPieces = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://127.0.0.1:8000/pieces/', {
                headers: { 'Authorization': `token ${token}` }
            });
            setPieces(response.data.map(piece => ({
                ...piece,
                date_ajout: piece.date_ajout ? new Date(piece.date_ajout).toISOString().slice(0, 16) : '',
            })));
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des pièces:', error);
            setError('Failed to fetch pieces. Please try again later.');
            setLoading(false);
        }
    };

    const loadCategories = () => {
        axios.get('http://127.0.0.1:8000/categories/')
            .then(res => {
                const categoriesData = res.data || [];
                setCategories(categoriesData);
                const categoryMap = {};
                categoriesData.forEach(category => {
                    categoryMap[category.id_category] = category.name;
                });
                setCategoryMap(categoryMap);
            })
            .catch(err => {
                console.error('Error fetching categories:', err);
                setError(true);
            });
    };

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`http://127.0.0.1:8000/supprimer_piece/${id}/`, {
            headers: { 'Authorization': `token ${token}` }
        })
        .then(response => {
            console.log('Piece deleted successfully:', response);
            fetchPieces();
        })
        .catch(error => {
            console.error('Failed to delete the piece:', error);
            alert('Failed to delete the piece. Please try again.');
        });
    };

    const handleEdit = (piece) => {
        setSelectedPiece(piece);
    };

    const handleSave = async (updatedPiece) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://127.0.0.1:8000/modifier_piece/${updatedPiece.id_piece}/`, updatedPiece, {
                headers: { 'Authorization': `token ${token}` }
            });
            console.log('Piece updated successfully:', response);
            setSelectedPiece(null);
            fetchPieces();
        } catch (error) {
            console.error('Failed to update the piece:', error);
            alert('Failed to update the piece. Please try again.');
        }
    };

    const handleCloseModal = () => {
        setSelectedPiece(null);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredPieces = pieces.filter(piece =>
        piece.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        categoryMap[piece.categorie]?.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <h1><FaList /> Pièces</h1>
                    <Link to="/ajouter_piece" className="add-button">
                        <FaPlus /> Ajouter une pièce
                    </Link>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <FaSearch className="search-icon" />
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Catégorie</th>
                                <th>Date d'ajout</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPieces.map(piece => (
                                <tr key={piece.id_piece}>
                                    <td>{piece.id_piece}</td>
                                    <td>{piece.nom || 'No Name'}</td>
                                    <td>{categoryMap[piece.categorie] || 'No Category'}</td>
                                    <td>{piece.created || 'No Date'}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button onClick={() => handleEdit(piece)} className="approve" data-tooltip="Modifier">
                                                <FaPen />
                                            </button>
                                            <button className="reject" data-tooltip="Supprimer" onClick={() => handleDelete(piece.id_piece)}>
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
            {selectedPiece && (
                <PieceModal
                    piece={selectedPiece}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}

export default PiecesPage;