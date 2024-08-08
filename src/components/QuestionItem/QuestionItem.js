import React from 'react';
import './QuestionItem.css';
import { FaClock } from 'react-icons/fa'; // Import the clock icon

const QuestionDetails = ({ selectedQuestion }) => {
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
                  <span className="response-date">{selectedQuestion.contenu}</span>
              </div>
          </div>
          <p>{selectedQuestion.contenu}</p>
      </div>
  )}
</div>
);
}

export default QuestionDetails;