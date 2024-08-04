import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import { FaArrowLeft } from 'react-icons/fa';
import './DetailsPiece.css';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';

function PieceDetail() {
  const { id } = useParams(); // Get the piece ID from the URL
  const navigate = useNavigate(); // Initialize the navigate function
  const [piece, setPiece] = useState({
    photo: [], // Initialize with an empty array by default
    description: '',
    etat: '',
    categorie: '', // This should contain the category ID initially
    nom: '',
    statut: ''
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axios.get('http://localhost:8000/categories/');
        const categoriesData = res.data || [];
        setCategories(categoriesData);
        const categoryMap = {};
        categoriesData.forEach(category => {
          categoryMap[category.id_category] = category.name;
        });
        setCategoryMap(categoryMap);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(true);
      }
    };

    const loadPiece = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/pieces/${id}`);
        setPiece(response.data);
      } catch (error) {
        console.error('Error fetching piece details:', error);
        setError(true);
      }
    };

    loadCategories();
    loadPiece();
    setLoading(false);
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data. Please try again later.</p>;
  }

  // Handle description truncation
  const displayedDescription = isDescriptionExpanded ? piece.description : `${piece.description.substring(0, 100)}...`;

  return (
    <>
      <Navbar />
      <div className="detail-container">
        <h1 className="title">
          <span className="title-blue">Détails</span> <span className="title-black">sur la pièce</span>
        </h1>
        <button onClick={() => navigate('/Fablab/pieces')} className="back-button">
          <FaArrowLeft className="mr-2" /> Revenir
        </button>
        <div className="shadow-card">
          <div className="card-content">
            <div className="flex-container md">
              <div className="image-gallery">
                {/* Handle case where photo might not be an array */}
                {Array.isArray(piece.photo) ? (
                  <>
                    <img src={`http://localhost:8000/${piece.photo[currentImageIndex]}`} alt={`Pièce ${currentImageIndex + 1}`} />
                    <div className="indicator-container">
                      {piece.photo.map((_, index) => (
                        <button 
                          key={index} 
                          className={`indicator-button ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <img src={`http://localhost:8000/${piece.photo}`} alt="Pièce" />
                )}
              </div>
              <div className="details">
                <span className={`status-indicator ${piece.etat === "Disponible" ? "status-unavailable":"status-available" }`}>
                  {piece.etat ? 'Disponible' : 'Non disponible'}
                </span>
                <h2>{piece.nom}</h2>
                <h3 className="category">{categoryMap[piece.categorie]}</h3>
                <p className='text-detail'>Par: École Nationale Supérieure d'informatique</p>
              </div>
            </div>
            <div className="description-box">
              <div className="description-border">Description</div>
              <p>
                {displayedDescription}
                {piece.description.length > 100 && (
                  <button onClick={() => setDescriptionExpanded(!isDescriptionExpanded)} className="plus-button">
                    {isDescriptionExpanded ? 'Moins' : 'Plus'}
                  </button>
                )}
              </p>
              <button onClick={() => navigate('/FabLab/Demande_piece')} className="action-button">
                Demander
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PieceDetail;
