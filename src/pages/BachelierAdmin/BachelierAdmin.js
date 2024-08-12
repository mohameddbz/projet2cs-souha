import React, { useState, useEffect } from 'react';
import "./BachelierAdmin.css";
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import QuestionItemAdm from '../../components/QuestionItemAdm/QuestionItemAdm';
import QuestionListAdm from '../../components/QuestionListAdm/QuestionListAdm';

const BachelierAdmin = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  // const token = localStorage('token')
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/admin/questions/`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setQuestions(data);
  //       setSelectedQuestion(data[0]); // Pré-sélectionner la première question si disponible
  //     })
  //     .catch(error => console.error('Error fetching questions:', error));
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem('token'); 

    fetch(`${process.env.REACT_APP_API_URL}/admin/questions/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Ajouter le token dans les en-têtes
        'Content-Type': 'application/json' // Assurez-vous que le type de contenu est correct
      }
    })
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        setSelectedQuestion(data[0]); 
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []); //

  const handleSelectQuestion = (id) => {
    const question = questions.find(q => q.id === id);
    setSelectedQuestion(question);
  };
   
  const handleDelete = (id, event) => {
    event.stopPropagation();
    console.log("Delete question with ID:", id);
  };

  const handleReply = (id, event) => {
    event.stopPropagation();
    console.log("Reply to question with ID:", id);
  };
      

      return (
        <>
        <Navbar/>
        <div className='forum'>
        <header className="forum-header">
          <h1 className="forum-title">Forum E-Bachelier Pour l'Administrateur</h1>
          <p className="forum-subtitle">Bienvenue dans cet espace dédié aux bacheliers où vous avez l'opportunité de poser des questions et de recevoir des réponses éclairées.</p>
        </header>
        <div className='forum-container'>
        <QuestionListAdm
 questions={questions}
 onSelect={handleSelectQuestion}
 onDelete={handleDelete}
 onReply={handleReply}
 selectedQuestionId={selectedQuestion ? selectedQuestion.id : null}
/>

<QuestionItemAdm selectedQuestion={selectedQuestion} />
</div>
        </div>
        <Footer/>
        </>
        
      );
    }

export default BachelierAdmin;
