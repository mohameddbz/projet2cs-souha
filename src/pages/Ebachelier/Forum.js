import React, { useState, useEffect } from 'react';
import "./Forum.css";
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import QuestionDetails from '../../components/QuestionItem/QuestionItem';
import QuestionList from '../../components/QuestionList/QuestionList';

const ForumPage = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${apiUrl}/questions/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuestions(data);
        
        if (data.length > 0) {
          setSelectedQuestion(data[0]); // Pré-sélectionner la première question si disponible
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [apiUrl]);

  const handleSelectQuestion = (id) => {
    const question = questions.find(q => q.id === id);
    setSelectedQuestion(question);
  };

  return (
    <>
      <Navbar />
      <div className='forum'>
        <header className="forum-header">
          <h1 className="forum-title">Forum E-Bachelier</h1>
          <p className="forum-subtitle">Bienvenue dans cet espace dédié aux bacheliers où vous avez l'opportunité de poser des questions et de recevoir des réponses éclairées.</p>
        </header>
        <div className='forum-container'>
          <QuestionList
            questions={questions}
            onSelect={handleSelectQuestion}
            selectedQuestionId={selectedQuestion ? selectedQuestion.id : null}
          />
          <QuestionDetails selectedQuestion={selectedQuestion} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ForumPage;
