// QuestionComponent.js
import React, { useEffect, useState } from 'react';
import './QuestionComponent.css'; // Assurez-vous que le chemin est correct
import axios from 'axios';
import header from '../header';

const QuestionComponent = ({ currentQuestion, onReturn }) => {
    const [response, setResponse] = useState('');
    const handleSubmit = async () =>  {
        console.log('Réponse soumise:', response);
        const reponseQuestion = {
            'contenu':response,
            'question':currentQuestion.id
        }
        const token = localStorage.getItem('token')
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/repondre-question/${currentQuestion.id}/`,
                 reponseQuestion, 
                
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `token ${token}`
                    }
                }
            );
            console.log('Réponse soumise:', response.data); // Affiche les données de la réponse
            onReturn()
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la réponse:', error);
        }
    };

    return (
        <div className="overlayy">
            <div className="modall">
                <button className="returnn-button" onClick={onReturn}>Retour</button>
                <h2 className="questionn">{currentQuestion.contenu}</h2>
                <textarea
                    // ref={responseRef}
                    className="responsee-inputt"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Votre réponse"
                />
                <button className="submitt" onClick={handleSubmit}>Répondre</button>
            </div>
        </div>
    );
};

export default QuestionComponent;
