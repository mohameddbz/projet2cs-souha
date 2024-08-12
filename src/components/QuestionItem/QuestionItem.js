import React, { useEffect, useState } from 'react';
import './QuestionItem.css';
import { FaClock } from 'react-icons/fa'; // Import the clock icon

const QuestionDetails = ({selectedQuestion }) => {
    const [reponseQuestion,setReponseQuestion]= useState('')
    useEffect(() => {
        const fetchReponseQuestion = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/reponse/${selectedQuestion.id}/`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            if (data) {
              const { responses } = data;
              setReponseQuestion(responses[0]); // Default to an empty array if responses is undefined
            }
          } catch (error) {
            console.error('Fetch error:', error);
          }
        };
        fetchReponseQuestion();
      }, [selectedQuestion]);
      
    if (!selectedQuestion) {
        return <div className="details-container">Select a question from the list.</div>;
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
      {selectedQuestion.contenu && (
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
</div>
);
}

export default QuestionDetails;