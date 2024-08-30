import React, { useState, useEffect } from 'react';
import './Publications.css';
import Cherch from '../../images/Cherch.png';
import { FaLinkedinIn } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import PropTypes from 'prop-types';
import cn from 'classnames';
import Navbar from '../../components/navbar/navbar';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import ChercheurProfile from './ChercheurProfile'; 
import { useParams } from 'react-router-dom';

function Publication(props) {
  const [chercheurData, setChercheurData] = useState(null);
  const [soutData, setSoutData] = useState([]);
  const [publicationData, setPublicationData] = useState(null);
  const { Idchercheur } = useParams(); 

  useEffect(() => {
    const fetchChercheurData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/${Idchercheur}/`);
        const { family_name, first_name } = response.data;

        const chercheurInfo = await axios.get(`http://localhost:8000/annuaire/enseignant/${family_name}/${first_name}/`);
        setChercheurData(chercheurInfo.data);
      } catch (error) {
        console.error("Error fetching chercheur data:", error);
      }
    };

    const fetchSoutData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/publication/searchall/?publisher=${Idchercheur}&etat=valide&type_publication=article`);
        const publications = response.data.map(pub => ({
          title: pub.titre,
          description: pub.description,
          image: pub.image ? `http://localhost:8000${pub.image}` : Cherch,
        }));
        setSoutData(publications);


        const publication = publications.find(pub => pub.title.startsWith('Profil de'));
        setPublicationData(publication);
      } catch (error) {
        console.error("Error fetching publication data:", error);
      }
    };

    fetchChercheurData();
    fetchSoutData();
  }, [Idchercheur]); 

  return (
    <div>
      <div className={cn('pub_container', props.className)}>
        <section className='pub-section2'>
          <div className='pub-container'>
            <div className='pub-buttons'>
              {soutData.map((event, index) => (
                <div key={index} className='pub-evenement'>
                  <div className='pub-evenement-s2'>
                    <div className='pub-evenement-content'>
                      <div className='pub-title'>{event.title}</div>
                      <div className='pub-description'>{event.description}</div>
                    </div>
                    <img src={event.image} alt='Publication' className='pub-img' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className='f'></div>
    </div>
  );
}

Publication.propTypes = {
  className: PropTypes.string,
};

export default Publication;
