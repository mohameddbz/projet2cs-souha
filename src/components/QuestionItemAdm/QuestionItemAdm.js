// import React from 'react';
// import './QuestionItemAdm.css';
// import { FaClock } from 'react-icons/fa'; // Import the clock icon

// const QuestionItemAdm = ({ selectedQuestion }) => {
//     if (!selectedQuestion) {
//         return <div className="details-container">Select a question from the list.</div>;
//     }
//     const formatDate = (dateString) => {
//         const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//         return new Date(dateString).toLocaleDateString('fr-FR', options);
//       };

//     return (
//         <div className="details-container">
//             <h3 className="details-title">{selectedQuestion.titre}</h3>
//             <div className="details-metadata">
//                 <span>{selectedQuestion.category} vues</span>
//                 <span>Publié le: {formatDate(selectedQuestion.date_creation)}</span>
//             </div>
//             <div className="separator"></div>
//             <p className="questions-content">{selectedQuestion.contenu}</p>
//             <div className="separator"></div>
//       {selectedQuestion.contenu && (
//           <div className="admin-response">
//           <div className="admin-response-header">
//               <h4>Réponse de ESI Admin</h4>
//               <div className="response-metadata">
//                   <FaClock className="icon-clock" />
//                   <span className="response-date">{selectedQuestion.contenu}</span>
//               </div>
//           </div>
//           <p>{selectedQuestion.contenu}</p>
//       </div>
//   )}
// </div>
// );
// }

// export default QuestionItemAdm;

import React, { useEffect, useState } from 'react';
import './QuestionItemAdm.css';
import { FaClock } from 'react-icons/fa'; // Import the clock icon

const QuestionItemAdm = ({ selectedQuestion }) => {
    const [reponseQuestion, setReponseQuestion] = useState(null);
    const [noReponseQuestions, setNoReponseQuestion] = useState(true);

    useEffect(() => {
        const fetchReponseQuestion = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/reponse/${selectedQuestion.id}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                if (data && data.responses && data.responses.length > 0) {
                    setReponseQuestion(data.responses[0]); // Assurez-vous que `responses` est un tableau et contient des éléments
                    setNoReponseQuestion(false); // Il y a une réponse, donc pas de message d'absence
                } else {
                    setReponseQuestion(null); // Pas de réponse, assurez-vous que `reponseQuestion` est nul
                    setNoReponseQuestion(true); // Pas de réponse, donc affichez le message d'absence
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        if (selectedQuestion) {
            fetchReponseQuestion();
        }
    }, [selectedQuestion]);

    if (!selectedQuestion) {
        return <div className="details-container">Sélectionnez une question dans la liste.</div>;
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <div className="details-container">
            <h3 className="details-title">{selectedQuestion.titre}</h3>
            <div className="details-metadata">
                <span>{selectedQuestion.category} vues</span>
                <span>Publié le: {formatDate(selectedQuestion.date_creation)}</span>
            </div>
            <div className="separator"></div>
            <p className="questions-content">{selectedQuestion.contenu}</p>
            <div className="separator"></div>
            {reponseQuestion && (
                <div className="admin-response">
                    <div className="admin-response-header">
                        <h4>Réponse de ESI Admin</h4>
                        <div className="response-metadata">
                            <FaClock className="icon-clock" />
                            <span className="response-date">{formatDate(reponseQuestion.date_creation)}</span>
                        </div>
                    </div>
                    <p>{reponseQuestion.contenu}</p>
                </div>
            )}
            {noReponseQuestions && (
                <div>
                    Vous n'avez pas encore répondu à cette question !
                </div>
            )}
        </div>
    );
};

export default QuestionItemAdm;
