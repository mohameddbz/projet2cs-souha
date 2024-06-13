import React from 'react';
import './VideoFab.css'; // Assurez-vous que le chemin est correct pour votre fichier CSS

function VidSec() {
    return (
        <div className="page-container">
            {/* Les autres sections du composant FabLabPage ici */}
            <div className="next-section">
                <div className="column text-and-buttons">
                    <button className="button">Bouton 1</button>
                    <button className="button">Bouton 2</button>
                    <p>Voici du texte qui accompagne les boutons dans la colonne de gauche.</p>
                </div>
                <div className="column video-container">
                    <video width="320" height="240" controls>
                        <source src="movie.mp4" type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
}

export default VidSec;
