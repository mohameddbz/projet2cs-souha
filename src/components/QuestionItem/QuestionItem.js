import React from 'react';
import './QuestionItem.css';
import { FaClock } from 'react-icons/fa'; // Import the clock icon

const QuestionDetails = ({ question }) => {
    if (!question) {
        return <div className="details-container">Select a question from the list.</div>;
    }

    return (
        <div className="details-container">
            <h3 className="details-title">{question.title}</h3>
            <div className="details-metadata">
                <span>{question.views} vues</span>
                <span>Publié le: {question.date}</span>
            </div>
            <div className="separator"></div>
            <p className="questions-content">{question.content}</p>
            <div className="separator"></div>
      {question.adminResponse && (
          <div className="admin-response">
          <div className="admin-response-header">
              <h4>Réponse de ESI Admin</h4>
              <div className="response-metadata">
                  <FaClock className="icon-clock" />
                  <span className="response-date">{question.adminResponse.responseDate}</span>
              </div>
          </div>
          <p>{question.adminResponse.content}</p>
      </div>
  )}
</div>
);
}

export default QuestionDetails;