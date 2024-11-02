import React, { useState, useEffect } from 'react';
import './Post.css';
import axios from 'axios';
import Lcsiback from '../../images/Lcsiback.png';
import lcsib from '../../images/lcsib.png';
import treePic from '../../assets/images/TreePic.jpg';
import LLM from '../../assets/images/LLM.png';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import groupe1 from '../../images/Group 578.png';
import groupe2 from '../../images/Group 579.png';
import groupe3 from '../../images/Group580.png';

const pageSize = 4;

const Post = () => {
  const [eventsData, setEventsData] = useState([]);
  const [soutData, setSoutData] = useState([]);
  const [soutData1, setSoutData1] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const eventsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/publications/bycategory/1/`
        );
        setEventsData(eventsResponse.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchSoutenanceData = async () => {
      try {
        const soutResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/publication/searchall/?type_publication=soutenance&etat=valide`
        );
        setSoutData(soutResponse.data);
      } catch (error) {
        console.error('Error fetching soutenance:', error);
      }
    };

    const fetchAppelData = async () => {
      try {
        const appelResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/publication/searchall/?type_publication=appel&etat=valide`
        );
        setSoutData1(appelResponse.data);
      } catch (error) {
        console.error('Error fetching appel:', error);
      }
    };

    fetchEventsData();
    fetchSoutenanceData();
    fetchAppelData();
  }, []);

  const getCurrentPageCard = () => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return soutData.slice(startIndex, endIndex);
  };

  return (
    <div>
      <Navbar />

      <div className="lcsi-main-content">
        <img className="lcsi-cover" src={Lcsiback} alt="alt text" />
        <img className="top-image" src={lcsib} alt="alt text" />
        <div className='lcsi-header'>
          <h1 className='lcsi-hero_title'>Post Graduation et Recherche</h1>
          <div className='imagecontainer'>
            <div className='top-images'>
              <img src={groupe1} alt="groupe 1" />
              <img src={groupe2} alt="groupe 2" />
            </div>
            <div className='bottom-image'>
              <img src={groupe3} alt="groupe 3" />
            </div>
          </div>
        </div>
      </div>

      <div className='post-rect'>
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 256 256" color="white" style={{ position: "absolute", bottom: "64", left: "42" }}>
          <path fill="currentColor" d="M251.76 88.94l-120-64a8 8 0 0 0-7.52 0l-120 64a8 8 0 0 0 0 14.12L32 117.87v48.42a15.9 15.9 0 0 0 4.06 10.65C49.16 191.53 78.51 216 128 216a130 130 0 0 0 48-8.76V240a8 8 0 0 0 16 0v-40.49a115.6 115.6 0 0 0 27.94-22.57a15.9 15.9 0 0 0 4.06-10.65v-48.42l27.76-14.81a8 8 0 0 0 0-14.12Z" />
        </svg>

        <div className='soutenance-container'>
          {getCurrentPageCard().map((product, index) => (
            <div key={index} className='soutenance-blog'>
              {/* Render your soutenance data here */}
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
                <img  src={`${process.env.REACT_APP_API_URL}${event.image}`} alt="alt text" />

                
                  {/* <img src={event.image || treePic} alt='' className='post-evenement-img' /> */}
                  <div className='post-evenement-date'>
  {event.date_debut ? (
    <>
      <span className='post-evn-span'>
        {new Date(event.date_debut).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })}
      </span>
    </>
  ) : (
    'Date non disponible'
  )}
</div>
                </div>
              </div>
              <div className='post-evenement-s2'>
                <div className='post-evenement-title'>{event.titre}</div>
                <div className='post-evenement-type'>{event.type}</div>
                <div className='post-evenement-description'>{event.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='sout-evenement-buttons'>
        {soutData.map((event, index) => (
          <div key={index} className='sout-evenement'>
            <div className='poste-evenement-date'>
              {event.date_debut ? (
                <>
                  <span className='post-evn-span'>{event.date_debut.split(' ')[0]}</span>
                  {event.date_debut.split(' ')[1]} {event.date_debut.split(' ')[2]}
                </>
              ) : (
                'Date non disponible'
              )}
            </div>
            <div className='sout-evenement-s2'>
              <div className='sout-evenement-title'>{event.titre}</div>
              <div className='sout-evenement-description'>{event.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="post-titles">
        <span className="post-title">Contactez-nous</span>
        <span className="post-title">Appel d'offre</span>
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
                  <div className='appel-evenement-title'>{event.titre}</div>
                  <div className='appel-evenement-description'>{event.description}</div>
                </div>
                <img src={event.image || LLM} alt='' className='appel-evenement-img' />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='pf'>
        <Footer />
      </div>
    </div>
  );
}

export default Post;
