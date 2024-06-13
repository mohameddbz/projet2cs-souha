import React, { useState, useEffect } from 'react';
import './QuestionList.css';
import { FaEye, FaClock, FaChevronLeft, FaChevronRight, FaPlusCircle, FaChevronDown } from 'react-icons/fa';
import Ajouter from '../Ajouter/Ajouter'; // Assuming this is the modal component

function QuestionList({ questions, onSelect, selectedQuestionId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState('recent');
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const questionsPerPage = 5;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const sortedQuestions = [...questions].sort((a, b) => {
      switch (sortType) {
        case 'recent': return new Date(b.date) - new Date(a.date);
        case 'oldest': return new Date(a.date) - new Date(b.date);
        case 'famous': return b.views - a.views;
        default: return 0;
      }
    });

    setTotalQuestions(sortedQuestions.length);
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    setCurrentQuestions(sortedQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion));
  }, [currentPage, questions, sortType]);

  const paginate = pageNumber => {
    if (pageNumber !== currentPage && pageNumber > 0 && pageNumber <= totalQuestions / questionsPerPage) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Display text calculations
  const startIndex = (currentPage - 1) * questionsPerPage + 1;
  const endIndex = startIndex + currentQuestions.length - 1;

  return (
    <div className='question-bar'>
      <div className="filter-area">
        <div className="result-info">
          Affichage de {startIndex} à {endIndex} sur {totalQuestions} résultats.
          <button className="add-button" onClick={() => setShowModal(true)}>
            <FaPlusCircle />
          </button>
        </div>
        <div className="sortt-dropdown">
          <p>Trier par</p>
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="recent">Récents</option>
            <option value="oldest">Anciens</option>
            <option value="famous">Plus Populaire</option>
          </select>
          <FaChevronDown />
        </div>
      </div>

      <div className="question-list">
        {currentQuestions.map(question => (
          <div key={question.id}
               className={`question-item ${question.id === selectedQuestionId ? 'selected' : ''}`}
               onClick={() => onSelect(question.id)}>
            <h4 className="question-title">{question.title}</h4>
            <p className="question-content">{question.content}</p>
            <div className="question-metadata">
              <span className="views"><FaEye /> {question.views}</span>
              <span className="date-posted"><FaClock /> {question.date}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          <FaChevronLeft /> Prec
        </button>
        {Array.from({ length: Math.ceil(totalQuestions / questionsPerPage) }, (_, index) => index + 1).map(number => (
          <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage >= Math.ceil(totalQuestions / questionsPerPage)}>
          Suiv <FaChevronRight />
        </button>
      </div>
      <Ajouter show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default QuestionList;