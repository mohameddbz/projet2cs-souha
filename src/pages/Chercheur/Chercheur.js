import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Chercheur.css';
import Cherch from '../../images/Cherch.png';
import DefaultProfileImage from '../../images/Cherch.png'; 
import ChercheurSection from './ChercheurProfile';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';

function Chercheur(props) {
  const { publicationId } = useParams();
  const [chercheurData, setChercheurData] = useState(null);
  const [publicationData, setPublicationData] = useState(null);
  const [sectionsData, setSectionsData] = useState([]);
  const [familyName, setFamilyName] = useState('');
  const [firstName, setFirstName] = useState('');




  const fetchPublicationData = async () => {
    try {
      const publicationResponse = await fetch(`${process.env.REACT_APP_API_URL}/publication/searchall/?id_publication=${publicationId}`);
      if (publicationResponse.ok) {
        const publications = await publicationResponse.json();
        const publication = publications.find(pub => pub.titre.startsWith('Profil de'));
        setPublicationData(publication);

        if (publication) {
          const sectionsResponse = await fetch(`${process.env.REACT_APP_API_URL}/publication/sections/${publicationId}/`);
          if (sectionsResponse.ok) {
            const sections = await sectionsResponse.json();
            setSectionsData(sections);
          } else {
            console.error('Erreur lors de la récupération des sections de publication');
          }
        }
      } else {
        console.error('Erreur lors de la récupération des publications');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  useEffect(() => {
    fetchPublicationData();
  }, [publicationId]);


  return (
  
      <div className='chercheur-publication'>
        {publicationData && (
          <div>
            <div className='chercheur-publication-content'>
              <img 
                className='chercheur-image41' 
                src={
                  publicationData.image
                    ? `${process.env.REACT_APP_API_URL}${publicationData.image}`
                    : DefaultProfileImage
                } 
                alt="Publication" 
              />
              <div>
                <h2 className='chercheur-medium_title1'>{publicationData.titre}</h2>
                <hr className='chercheur-line' size={1} />
                <h3 className='chercheur-subtitle1'>Résumé</h3>
                <h3 className='chercheur-subtitle'>{publicationData.description}</h3>
              </div>
            </div>

            {sectionsData.length > 0 ? (
              sectionsData.map((section, index) => (
                <div key={index} className='chercheur-section-item'>
                  <h3 className='chercheur-subtitle1'>{section.titre}</h3>
                  <h3 className='chercheur-subtitle'>{section.contenu}</h3>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
   
  );
}

export default Chercheur;
