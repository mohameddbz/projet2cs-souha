import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaLinkedinIn } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';
import { useNavigate, useParams, useLocation, Outlet, Link } from 'react-router-dom';
import DefaultProfileImage from '../../images/Cherch.png'; 
import './Chercheur.css';  
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';

function ChercheurProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { Idchercheur } = useParams();
  const [publicationData, setPublicationData] = useState(null);
  const [chercheurData, setChercheurData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [activeMenu, setActiveMenu] = useState('profile');

  const handleNavigation = (path) => {
    navigate(path);
    if (path.includes('cv')) {
      setActiveMenu('profile');
    } else if (path.includes('publication')) {
      setActiveMenu('publication');
    } else if (path.includes('projet-recherche')) {
      setActiveMenu('projet-recherche');
    }
  };

  const fetchPublicationData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/publication/searchall/?publisher=${Idchercheur}&type_publication=chercheur_profile`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setPublicationData(data[0]);
        }
      } else {
        console.error('Erreur lors de la récupération des données de publication');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const fetchChercheurNames = async () => {
    try {
      if (publicationData) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/${publicationData.publisher}/`);
        if (response.ok) {
          const data = await response.json();
          setFirstName(data.first_name);
          setFamilyName(data.family_name);
        } else {
          console.error('Erreur lors de la récupération des noms du chercheur');
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const fetchChercheurData = async () => {
    try {
      if (firstName && familyName) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/annuaire/enseignant/${familyName}/${firstName}/`);
        if (response.ok) {
          const data = await response.json();
          setChercheurData(data);
        } else {
          console.error('Erreur lors de la récupération des données du chercheur');
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

 
  useEffect(() => {
    if (Idchercheur) {
      fetchPublicationData();
    }
  }, [Idchercheur]);

  
  useEffect(() => {
    if (publicationData) {
      fetchChercheurNames();
    }
  }, [publicationData]);

  useEffect(() => {
    if (firstName && familyName) {
      fetchChercheurData();
    }
  }, [firstName, familyName]);

  // Set the default menu item based on the current URL
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.includes('cv')) {
      setActiveMenu('profile');
    } else if (currentPath.includes('publication')) {
      setActiveMenu('publication');
    } else if (currentPath.includes('projet-recherche')) {
      setActiveMenu('projet-recherche');
    }
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
      <section className='chercheur-section2'>
        <div className='chercheur-rect3'>
          <img 
            className='chercheur-image4' 
            src={
              publicationData && publicationData.image
                ? `${process.env.REACT_APP_API_URL}${publicationData.image}`
                : DefaultProfileImage
            } 
            alt="Chercheur" 
          />
          
          {chercheurData && (
            <div className='chercheur-info'>
              <h2 className='chercheur-medium_title'>{chercheurData.nom} {chercheurData.prenom}</h2>
              <div className='chercheur-text2'>{chercheurData.profession}</div>
              <h5 className='chercheur-highlight'>{chercheurData.grade}</h5>
              <div className='chercheur-coordonnes'>
                <div className='chercheur-contact'>
                  <FaLinkedinIn className='chercheur-image9' />
                  <h5 className='chercheur-highlight5'>{chercheurData.linkedin || 'Non renseigné'}</h5>
                </div>
                <div className='chercheur-contact'>
                  <MdMailOutline className='chercheur-image9'/>
                  <h5 className='chercheur-highlight5'>{chercheurData.email || 'Non renseigné'}</h5>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="chercheur-menu">
        <Link
            to={`cv/${publicationData?.id_publication}`}
            className={`chercheur-highlight1 ${activeMenu === 'profile' ? 'active' : ''}`}
          >
            Profile
          </Link>
          <Link
            to="publication"
            className={`chercheur-highlight1 ${activeMenu === 'publication' ? 'active' : ''}`}
          >
            Publication
          </Link>
          <Link
            to="projet-recherche"
            className={`chercheur-highlight1 ${activeMenu === 'projet-recherche' ? 'active' : ''}`}
          >
            Projet Recherche
          </Link>
        </div>
        <hr className='chercheur-line' size={1} />
        <Outlet /> {/* This will render nested routes here */}
      </section>
      <Footer />
    </div>
  );
}

ChercheurProfile.propTypes = {
  publicationData: PropTypes.object,
  chercheurData: PropTypes.object,
};

export default ChercheurProfile;
