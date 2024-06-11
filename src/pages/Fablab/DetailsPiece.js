import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './DetailsPiece.css';
import image1 from '../../assets/dfd.jpg';
import image2 from '../../assets/quas.jpg';
import image3 from '../../assets/pok.jpg';

function PieceDetail() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

    const piece = {
        nom: "Arduino ABX00092",
        statut: "Disponible",
        categorie: "Microcontrôleurs",
        description: "Dans le cadre des efforts menés par l’école pour la lutte contre le changement climatique et la restauration d’un écosystème naturel, l’ESI a organisé une campagne de reboisement hier mardi 05 mars 2024  à 14h00, et ce, en collaboration avec la Direction des forets et la ceinture verte de la wilaya d’Alger, circonscriptions  de Belfort.Cette campagne a vu la participation de toute la communauté de l’école étudiants, enseignants et employés ayant contribué à la  plantation de plus de 200 arbustes dans les différents espaces de l’école. Cette opération de plantation vise également à consacrer la culture environnementale dans la communauté de l’école  et à faire connaitre l’importance de la ceinture verte, tout en inculquant aux participants les bonnes pratiques de plantation et les modalités de préservation des arbustes plantés au regard des changements climatiques.",
        images: [image1, image2, image3],
    };

    const displayedDescription = isDescriptionExpanded ? piece.description : `${piece.description.substring(0, 100)}...`;

    return (
        <div className="detail-container">
            <h1 className="title">Détails sur la pièce</h1>
            <button onClick={() => window.history.back()} className="back-button">
                <FaArrowLeft className="mr-2" /> Revenir
            </button>
            <div className="shadow-card">
                <div className="card-content">
                    <div className="flex-container md">
                        <div className="image-gallery">
                            <img src={piece.images[currentImageIndex]} alt={`Pièce ${currentImageIndex + 1}`} />
                            <div className="indicator-container">
        {piece.images.map((_, index) => (
            <button 
                key={index} 
                className={`indicator-button ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
            />
        ))}
    </div>
                        </div>
                        <div className="details">
                        <span className={`status-indicator ${piece.statut === "Disponible" ? "status-available" : "status-unavailable"}`}>
                                {piece.statut}
                            </span>
                        <h3 className="category">{piece.categorie}</h3>
                            <h2>{piece.nom}</h2>
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
    <button className="action-button">Demander</button>
</div>

                </div>
            </div>
        </div>
    );
}

export default PieceDetail;
