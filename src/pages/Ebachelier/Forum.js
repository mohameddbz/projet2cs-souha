import React, { useState } from 'react';
import "./Forum.css";
import QuestionDetails from '../../components/QuestionItem/QuestionItem';
import QuestionList from "../../components/QuestionList/QuestionList";

const ForumPage = () => {
    const questions = [
        {
          id: 1,
          title: "Quels sont les prérequis pour le programme d'ingénierie?",
          content: "Je voudrais savoir quels sont les cours ou les compétences nécessaires avant de postuler au programme d'ingénierie.",
          date: "June 15, 2024",
          time: "10:35",
          views: 102,
          adminResponse: {
            content:"non le concours est un concours d'accés à l'ecole (ou bien au cycle superieur) aprés avoir fait les classes preparatoire vous allez passer un concours et suite aux resultats et vos choix vous serez affecter à une des trois écoles (ESI, ESI-SBA, ESTIN) les externes peuvent aussi passer le concours mais avec des conditions",
            responseDate: "June 16, 2024"
          }
        },
        {
          id: 2,
          title: "Comment fonctionne le processus de sélection?",
          content: "Pouvez-vous expliquer comment l'université sélectionne les candidats pour les programmes compétitifs?",
          date: "June 14, 2024",
          time: "15:20",
          views: 150,
          adminResponse: {
            content: "Vous devez avoir complété des cours en URBAAAA et physique.",
            responseDate: "June 16, 2024"
          }
        },
        {
          id: 3,
          title: "Quelles sont les options de bourse disponibles?",
          content: "Quelles sont les bourses disponibles pour les étudiants internationaux à l'ESI?",
          date: "June 13, 2024",
          time: "09:45",
          views: 87,
          adminResponse: {
            content: "Vous devez avoir complété des cours en MSSIIIIIII et physique.",
            responseDate: "June 16, 2024"
          }
        },
        {
          id: 4,
          title: "Logement étudiant, quelles options?",
          content: "Quelles sont les options de logement pour les nouveaux étudiants? Est-il mieux de vivre sur le campus ou en ville?",
          date: "June 12, 2024",
          time: "11:00",
          views: 76,
          adminResponse: {
            content: "Vous devez avoir complété des cours en FASIIIIIIIIIIIIII et physique.",
            responseDate: "June 16, 2024"
          }
        },
        {
          id: 5,
          title: "Comment s'inscrire aux clubs étudiants?",
          content: "Je suis intéressé par les activités parascolaires, comment puis-je m'inscrire aux clubs et sociétés à l'ESI?",
          date: "June 11, 2024",
          time: "16:42",
          views: 98,
          adminResponse: {
            content: "Vous devez avoir complété des cours en MPSIIIIIIIIIIII et physique.",
            responseDate: "June 16, 2024"
          }
        },
        {
          id: 6,
          title: "Comment sJJJJJJJJJ'inscrire aux clubs étudiants?",
          content: "Je suis intéressé par les activités parascolaires, comment puis-je m'inscrire aux clubs et sociétés à l'ESI?",
          date: "June 11, 2024",
          time: "16:42",
          views: 98,
          adminResponse: {
            content: "Vous devez avoir complété des cours en COFIIIIIIIII et physique.",
            responseDate: "June 16, 2024"
          }
        },
        {
          id: 7,
          title: "Comment sQQQQQQ'inscrire aux clubs étudiants?",
          content: "Je suis intéressé par les activités parascolaires, comment puis-je m'inscrire aux clubs et sociétés à l'ESI?",
          date: "June 11, 2024",
          time: "16:42",
          views: 98,
          adminResponse: {
            content: "Vous devez avoir complété des cours en ALOGGGGGG et physique.",
            responseDate: "June 16, 2024"
          }
        },
        {
          id: 8,
          title: "Quels sont les prérequis pour le programme d'ingénierie?",
          content: "Je voudrais savoir quels sont les cours ou les compétences nécessaires avant de postuler au programme d'ingénierie.",
          date: "June 15, 2024",
          time: "10:35",
          views: 102,
          adminResponse: {
            content:"non le concours est un concours d'accés à l'ecole (ou bien au cycle superieur) aprés avoir fait les classes preparatoire vous allez passer un concours et suite aux resultats et vos choix vous serez affecter à une des trois écoles (ESI, ESI-SBA, ESTIN) les externes peuvent aussi passer le concours mais avec des conditions",
            responseDate: "June 16, 2024"
          }
        },
        {
          id: 9,
          title: "Comment fonctionne le processus de sélection?",
          content: "Pouvez-vous expliquer comment l'université sélectionne les candidats pour les programmes compétitifs?",
          date: "June 14, 2024",
          time: "15:20",
          views: 150,
          adminResponse: {
            content: "Vous devez avoir complété des cours en URBAAAA et physique.",
            responseDate: "June 16, 2024"
          }
        },
        {
          id: 10,
          title: "Quelles sont les options de bourse disponibles?",
          content: "Quelles sont les bourses disponibles pour les étudiants internationaux à l'ESI?",
          date: "June 13, 2024",
          time: "09:45",
          views: 87,
          adminResponse: {
            content: "Vous devez avoir complété des cours en MSSIIIIIII et physique.",
            responseDate: "June 16, 2024"
          }
        },
        {
          id: 11,
          title: "Logement étudiant, quelles options?",
          content: "Quelles sont les options de logement pour les nouveaux étudiants? Est-il mieux de vivre sur le campus ou en ville?",
          date: "June 12, 2024",
          time: "11:00",
          views: 76,
          adminResponse: {
            content: "Vous devez avoir complété des cours en FASIIIIIIIIIIIIII et physique.",
            responseDate: "June 16, 2024"
          }
        },
        {
          id: 12,
          title: "Comment s'inscrire aux clubs étudiants?",
          content: "Je suis intéressé par les activités parascolaires, comment puis-je m'inscrire aux clubs et sociétés à l'ESI?",
          date: "June 11, 2024",
          time: "16:42",
          views: 98,
          adminResponse: {
            content: "Vous devez avoir complété des cours en MPSIIIIIIIIIIII et physique.",
            responseDate: "June 16, 2024"
          }
        },
        {
          id: 13,
          title: "Comment sJJJJJJJJJ'inscrire aux clubs étudiants?",
          content: "Je suis intéressé par les activités parascolaires, comment puis-je m'inscrire aux clubs et sociétés à l'ESI?",
          date: "June 11, 2024",
          time: "16:42",
          views: 98,
          adminResponse: {
            content: "Vous devez avoir complété des cours en COFIIIIIIIII et physique.",
            responseDate: "June 16, 2024"
          }
        },
        {
          id: 14,
          title: "Comment sQQQQQQ'inscrire aux clubs étudiants?",
          content: "Je suis intéressé par les activités parascolaires, comment puis-je m'inscrire aux clubs et sociétés à l'ESI?",
          date: "June 11, 2024",
          time: "16:42",
          views: 98,
          adminResponse: {
            content: "Vous devez avoir complété des cours en ALOGGGGGG et physique.",
            responseDate: "June 16, 2024"
          }
        }
      ];
      const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);

  const handleSelectQuestion = (id) => {
    const question = questions.find(q => q.id === id);
    setSelectedQuestion(question);
  }
      

      return (
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

<QuestionDetails question={selectedQuestion} />
</div>
        </div>
      );
    }

export default ForumPage;
