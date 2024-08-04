import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExplorerFab.css'; // Assurez-vous que le chemin est correct

function getRandomItems(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function ExplorationSection() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [piecesResponse, categoriesResponse] = await Promise.all([
                    axios.get('http://localhost:8000/pieces/'),
                    axios.get('http://localhost:8000/categories/')
                ]);
                const pieces = piecesResponse.data;
                const categories = categoriesResponse.data;
                setItems(getRandomItems(pieces, 4)); // Obtenir 4 éléments aléatoires
                setCategories(categories);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Le tableau vide [] signifie que cette fonction s'exécutera une fois après le premier rendu

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id_category === categoryId);
        return category ? category.name : 'Unknown';
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading data: {error.message}</p>;
    }

    return (
        <div className="exploration-section">
            <div className="header-with-button">
                <h1>Explorer le matériel</h1>
                <button onClick={() => window.location.href = 'http://localhost:3000/Fablab/pieces'}>Voir tous</button>
            </div>
            <div className="item-container">
                {items.map((item) => (
                    <div className="item-box" key={item.id_piece}>
                        <img src={`http://localhost:8000/${item.photo}`} alt={item.nom} />
                        <div className="item-info">
                            <p className="item-name">{item.nom}</p>
                            <p className="item-category">{getCategoryName(item.categorie)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExplorationSection;
