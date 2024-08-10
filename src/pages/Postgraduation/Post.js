import React, { useState, useEffect } from 'react';
import './Post.css';
import Lcsiback from '../../images/Lcsiback.png';
import lcsib from '../../images/lcsib.png';
import a from '../../images/a.png';
import cardData from '../../db/soutenance.json';
import treePic from '../../assets/images/TreePic.jpg';
import LLM from '../../assets/images/LLM.png';
import axios from 'axios' ;
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer'

// Définir la taille de la page
const pageSize = 4;

// Définir les données des événements

const soutData = [
  {
    date: '06 Mar 2024',
    title: 'Thèse/PHD',
    description: 'Data Quality Error Detection powered by LLMs',
  },
  {
    date: '06 Mar 2024',
    title: 'Thèse/PHD',
    description: 'Data Quality Error Detection powered by LLMs',
  },
];
const soutData1 = [
  {
    date: '06 Mar 2024',
    title: 'Appel d offre recrutement',
    description: 'This article is the second in a series about cleaning data using Large Language Models (LLMs), with a focus on identifying errors in tabular data sets.',
    image:LLM,
  },
 
];
// Composant Countdown pour gérer la logique du compte à rebours
const Countdown = ({ initialDays, initialHours, initialMinutes,initialSeconds}) => {
  // const [days, setDays] = useState(initialDays);
  // const [hours, setHours] = useState(initialHours);
  // const [minutes, setMinutes] = useState(initialMinutes);
  // const [seconds, setSeconds] = useState(initialSeconds);


  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (seconds === 0) {
  //       if (minutes === 0) {
  //         if (hours === 0) {
  //           if (days === 0) {
  //             clearInterval(timer);
  //             return;
  //           }
  //           setDays(prevDays => prevDays - 1);
  //           setHours(23);
  //         } else {
  //           setHours(prevHours => prevHours - 1);
  //         }
  //         setMinutes(59);
  //       } else {
  //         setMinutes(prevMinutes => prevMinutes - 1);
  //       }
  //       setSeconds(59);
  //     } else {
  //       setSeconds(prevSeconds => prevSeconds - 1);
  //     }
  //   }, 1000); // Mise à jour toutes les secondes
  
  //   return () => clearInterval(timer);
  // }, [days, hours, minutes, seconds]);
  
  // return (
  //   <div className='soutenance-container'>
  //     <div className='soutenance-blog'>
  //       <h3 className='soutenance-blog_subtitle'>Jours: {days}</h3>
  //       <h5 className='soutenance-blog_subtitle'>Heures: {hours}</h5>
  //       <h5 className='soutenance-blog_subtitle'>Minutes: {minutes}</h5>
  //       <h5 className='soutenance-blog_subtitle'>Secondes: {seconds}</h5>

  //     </div>
  //   </div>
  // );
};

// Composant principal Lcsi
const Lcsi = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/publication/searchall/?type_publication=event&etat=valide`); // Replace with your API endpoint
        setEventsData(response.data);
      } catch (error) {
        console.error('Error fetching events data:', error);
      }
    };

    fetchEventsData();
  }, []);

  const getCurrentPageCard = () => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return cardData.slice(startIndex, endIndex);
  };

  return (
     <div>
      <Navbar/>
      <div className="main-content">
    <img className='lcsi-cover' src={Lcsiback} alt="alt text" />
    <img className='lcsi-cover' src={lcsib} alt="alt text" />
    <h1 className='post-recherche'>Poste graduation et Recherche</h1>
      <div className='lcsi_emoj'>
    <div className='lcsi-ep1'>
        <img className='lcsi-image' src={a} alt="alt text" />
        <svg className='lcsi-image1' xmlns="http://www.w3.org/2000/svg" width="3rem" height="2em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7 2h10v7.85q0 .575-.25 1.025t-.7.725l-3.55 2.1l.7 2.3H17l-3.1 2.2l1.2 3.8l-3.1-2.35L8.9 22l1.2-3.8L7 16h3.8l.7-2.3l-3.55-2.1q-.45-.275-.7-.725T7 9.85zm4 2v7.05l1 .6l1-.6V4z"></path>
        </svg>
        <div className='lcsi-info'>Excellence</div>
    </div>

    <div className='lcsi-ep2'>
        <img className='lcsi-image' src={a} alt="alt text" />
        <svg className='lcsi-image1' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" color="#0061B1"><g fill="none" stroke="#0061B1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} color="red"><path d="M21 6H9C7.34315 6 6 7.34315 6 9V31C6 32.6569 7.34315 34 9 34H39C40.6569 34 42 32.6569 42 31V21"></path><path d="M24 34V42"></path><path d="M32 6L28 10L32 14"></path><path d="M38 6L42 10L38 14"></path><path d="M14 42L34 42"></path></g></svg>
        <p className='lcsi-info2'>
            Qualité <br />
            méthodologique
        </p>
    </div>
    <div className='lcsi-ep3'>
        <img className='lcsi-image' src={a} alt="alt text" />
        <svg className='lcsi-image1' xmlns="http://www.w3.org/2000/svg" color="#0061B1" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M13 3c3.9 0 7 3.1 7 7c0 2.8-1.6 5.2-4 6.3V21H9v-3H8c-1.1 0-2-.9-2-2v-3H4.5c-.4 0-.7-.5-.4-.8L6 9.7C6.2 5.9 9.2 3 13 3m0-2C8.4 1 4.6 4.4 4.1 8.9L2.5 11c-.6.8-.6 1.8-.2 2.6c.4.7 1 1.2 1.7 1.3V16c0 1.9 1.3 3.4 3 3.9V23h11v-5.5c2.5-1.7 4-4.4 4-7.5c0-5-4-9-9-9m-3 9c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1m3 0c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1m3 0c-.5 0-1-.4-1-1s.5-1 1-1s1 .4 1 1s-.5 1-1 1"></path></svg>
        <p className='lcsi-info2'>
            Pensée <br />
            innovante
        </p>
    </div>
    </div>
      
      <div className='post-rect'>
       
        <Countdown initialDays={2} initialHours={12} initialMinutes={30} initialSeconds={60}/>
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 256 256" color="white" style={{ position: "absolute", bottom: "64", left: "42" }}>
          <path fill="currentColor" d="m251.76 88.94l-120-64a8 8 0 0 0-7.52 0l-120 64a8 8 0 0 0 0 14.12L32 117.87v48.42a15.9 15.9 0 0 0 4.06 10.65C49.16 191.53 78.51 216 128 216a130 130 0 0 0 48-8.76V240a8 8 0 0 0 16 0v-40.49a115.6 115.6 0 0 0 27.94-22.57a15.9 15.9 0 0 0 4.06-10.65v-48.42l27.76-14.81a8 8 0 0 0 0-14.12M128 200c-43.27 0-68.72-21.14-80-33.71V126.4l76.24 40.66a8 8 0 0 0 7.52 0L176 143.47v46.34c-12.6 5.88-28.48 10.19-48 10.19m80-33.75a97.8 97.8 0 0 1-16 14.25v-45.57l16-8.53Zm-20-47.31l-.22-.13l-56-29.87a8 8 0 0 0-7.52 14.12L171 128l-43 22.93L25 96l103-54.93L231 96Z" />
        </svg>

        <div className='soutenance-container'>
          {getCurrentPageCard().map((product, index) => (
            <div key={index} className='soutenance-blog'>
          
            </div>
          ))}
        </div>
      </div>

      <div className='soutenance-sidebar'>
        <div className='soutenance-search'>
          <button className='soutenancesearch-button'>Soutenance</button>
        </div>
        <div className='soutenance-evenements'>
          <a href="#">Événements</a>
        </div>
      </div>

      <div className='post-container'>
      <div className='post-evenement-container'>
      {eventsData.map((event, index) => (
        <div key={index} className='post-evenement'>
          <div className='post-evenement-s1'>
            <div className='post-evenement-img-cont'>
              <img src={`${process.env.REACT_APP_API_URL}${event.image}`} alt='' className='post-evenement-img' />
              <div className='post-evenement-date'>
                {event.date_debut ? (
                  <>
                    <span className='post-evn-span'>{event.date_debut.split(' ')[0]}</span>
                    {event.date_debut.split(' ')[1]} {event.date_debut.split(' ')[2]}
                  </>
                ) : (
                  <span className='post-evn-span'>Date non disponible</span>
                )}
              </div>
            </div>
          </div>
          <div className='post-evenement-s2'>
            <div className='post-evenement-title'>{event.titre}</div>
            <div className='post-evenement-type'>{event.type}</div>
            <div className='post-evenement-description'>
              {event.description}
            </div>
          </div>
        </div>
      ))}
    </div>

    </div>
    <div>
    <div className='sout-evenement-buttons'>
      {soutData .map((event, index) => (
        <div key={index} className='sout-evenement'>
          <div className='poste-evenement-date'>
            <span className='post-evn-span'>{event.date.split(' ')[0]}</span>
            {event.date.split(' ')[1]} {event.date.split(' ')[2]}
          </div>
          <div className='sout-evenement-s2'>
                  <div className='sout-evenement-title'>{event.title}</div>
                  <div className='sout-evenement-description'>
                    {event.description}
                  </div>
          </div>
        </div>
      ))}
    </div>
     <div className="titles">
     <span className="title">Contactez-nous</span>
     <span className="title">Appel d'offre</span>
</div>
<div className="contact-info">
  <span>Vous avez des questions sur<br/> les études à ESI ?</span>
  <button className="contact-button">Contactez-nous</button>
</div>
<div className='appel-evenement-buttons-container'>
  <div className='appel-evenement-buttons'>
    {soutData1.map((event, index) => (
      <div key={index} className='appel-evenement'>
        <div className='appel-evenement-s2'>
          <div className='appel-evenement-content'>
            <div className='appel-evenement-title'>{event.title}</div>
            <div className='appel-evenement-description'>{event.description}</div>
          </div>
          <img src={`${process.env.REACT_APP_API_URL}${event.image}`} className='appel-evenement-img' />
        </div>
      </div>
    ))}
  </div>
</div>


    </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Lcsi;
