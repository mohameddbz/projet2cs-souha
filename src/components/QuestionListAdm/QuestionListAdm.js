// import React, { useState, useEffect } from 'react';
// import './QuestionListAdm.css';
// import { FaEye, FaClock, FaChevronLeft, FaChevronRight, FaPlusCircle, FaChevronDown, FaTrash, FaReply } from 'react-icons/fa';
// import Ajouter from '../Ajouter/Ajouter';

// function QuestionListAdm({ questions, onSelect, onDelete, onReply, selectedQuestionId }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortType, setSortType] = useState('recent');
//   const [currentQuestions, setCurrentQuestions] = useState([]);
//   const [totalQuestions, setTotalQuestions] = useState(0);
//   const questionsPerPage = 5;
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const sortedQuestions = [...questions].sort((a, b) => {
//       switch (sortType) {
//         case 'recent': return new Date(b.date_creation) - new Date(a.date_creation);
//         case 'oldest': return new Date(a.date_creation) - new Date(b.date_creation);
//         case 'famous': return b.views - a.views;
//         default: return 0;
//       }
//     });

//     setTotalQuestions(sortedQuestions.length);
//     const indexOfLastQuestion = currentPage * questionsPerPage;
//     const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
//     setCurrentQuestions(sortedQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion));
//   }, [currentPage, questions, sortType]);

//   const paginate = pageNumber => {
//     if (pageNumber > 0 && pageNumber <= Math.ceil(totalQuestions / questionsPerPage)) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   return (
//     <div className='question-bar'>
//       <div className="filter-area">
//         <div className="result-info">
//           Affichage de {currentPage * questionsPerPage - questionsPerPage + 1} à {Math.min(currentPage * questionsPerPage, totalQuestions)} sur {totalQuestions} résultats.
//           <button className="add-button" onClick={() => setShowModal(true)}>
//             <FaPlusCircle />
//           </button>
//         </div>
//         <div className="sortt-dropdown">
//           <p>Trier par</p>
//           <select onChange={(e) => setSortType(e.target.value)}>
//             <option value="recent">Récents</option>
//             <option value="oldest">Anciens</option>
//             <option value="famous">Plus Populaire</option>
//           </select>
//           <FaChevronDown />
//         </div>
//       </div>

//       <div className="question-list">
//         {currentQuestions.map(question => (
//           <div key={question.id}
//                className={`question-item ${question.id === selectedQuestionId ? 'selected' : ''}`}
//                onClick={() => onSelect(question.id)}>
//             <h4 className="question-title">{question.titre}</h4>
//             <p className="question-content">{question.contenu}</p>
//             <div className="question-metadata">
//               <span className="views"><FaEye /> {question.views}</span>
//               <span className="date-posted"><FaClock /> {new Date(question.date_creation).toLocaleDateString()}</span>
//               <FaTrash className="action-icon" onClick={(event) => onDelete(question.id, event)} />
//               <FaReply className="action-icon" onClick={(event) => onReply(question.id, event)} />
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="pagination-bachelier">
//         <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
//           <FaChevronLeft /> Préc
//         </button>
//         {Array.from({ length: Math.ceil(totalQuestions / questionsPerPage) }, (_, index) => index + 1).map(number => (
//           <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
//             {number}
//           </button>
//         ))}
//         <button onClick={() => paginate(currentPage + 1)} disabled={currentPage >= Math.ceil(totalQuestions / questionsPerPage)}>
//           Suiv<FaChevronRight />
//         </button>
//       </div>
//       <Ajouter show={showModal} onClose={() => setShowModal(false)} />
//     </div>
//   );
// }

// export default QuestionListAdm;


import React, { useState, useEffect } from 'react';
import './Question.css';
import { FaEye, FaClock, FaChevronLeft, FaChevronRight, FaPlusCircle, FaChevronDown, FaTrash, FaReply } from 'react-icons/fa';
import Ajouter from '../Ajouter/Ajouter';

function QuestionListAdm({ questions, onSelect, onDelete, onReply, selectedQuestionId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState('recent');
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const questionsPerPage = 5;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const sortedQuestions = [...questions].sort((a, b) => {
      switch (sortType) {
        case 'recent': return new Date(b.date_creation) - new Date(a.date_creation);
        case 'oldest': return new Date(a.date_creation) - new Date(b.date_creation);
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
    if (pageNumber > 0 && pageNumber <= Math.ceil(totalQuestions / questionsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className='question-bar'>
      <div className="filter-area">
        <div className="result-info">
          Affichage de {currentPage * questionsPerPage - questionsPerPage + 1} à {Math.min(currentPage * questionsPerPage, totalQuestions)} sur {totalQuestions} résultats.
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
            <h4 className="question-title">{question.titre}</h4>
            <p className="question-content">{question.contenu}</p>
            <div className="question-metadata">
              <span className="views"><FaEye /> {question.views}</span>
              <span className="date-posted"><FaClock /> {new Date(question.date_creation).toLocaleDateString()}</span>
              <FaTrash className="action-icon-supp" onClick={(event) => onDelete(question.id, event)} />
              {question.valide===false && <FaReply className="action-icon-reply" onClick={(event) => onReply(question.id, event)} /> } 
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-bachelier">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          <FaChevronLeft /> Préc
        </button>
        {Array.from({ length: Math.ceil(totalQuestions / questionsPerPage) }, (_, index) => index + 1).map(number => (
          <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage >= Math.ceil(totalQuestions / questionsPerPage)}>
          Suiv<FaChevronRight />
        </button>
      </div>
      <Ajouter show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default QuestionListAdm;

