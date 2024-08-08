import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './PublicationDetail.css';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/navbar/navbar';

const PublicationDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [publication, setPublication] = useState(location.state || null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublication = async () => {
      if (!publication) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/publication/searchall/?id_publication=${id}`);
          const data = await response.json();

          if (data.length > 0) {
            const publicationData = data[0];
            const publisherResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/${publicationData.publisher}`);
            const publisherData = await publisherResponse.json();

            const fullPublicationData = {
              ...publicationData,
              name: `${publisherData.first_name} ${publisherData.family_name}`,
              imageUrl: publicationData.image ? `${process.env.REACT_APP_API_URL}${publicationData.image}` : '',
            };

            setPublication(fullPublicationData);
          }
        } catch (error) {
          setError('Error fetching publication details.');
          console.error('Error fetching publication details:', error);
        }
      }
    };

    const fetchSections = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/publication/sections/${id}`);
        const data = await response.json();
        setSections(data);
      } catch (error) {
        setError('Error fetching sections.');
        console.error('Error fetching sections:', error);
      }
    };
    fetchPublication();
    fetchSections();
    setLoading(false); // Set loading to false after fetching is complete

  }, [id, publication]);

  const handleScrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(`section-${sectionId}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!publication) {
    return <p>Publication not found.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="publication-detail-container">
        <aside className="sidebar">
          <h3>Sections</h3>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <button onClick={() => handleScrollToSection(section.id)} aria-label={`Go to section ${section.titre}`}>
                  {section.titre}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <main className="publication-detail">
          <div
            className="publication-image"
            style={{ backgroundImage: `url(${publication.imageUrl})` }}
            aria-label={`Image of ${publication.titre}`}
          ></div>
          <h1 className="publication-title">{publication.titre || 'Title Not Available'}</h1>
          <h3 className="publication-author">{publication.name}</h3>
          <p className="publication-description">{publication.description}</p>

          {sections.map((section) => (
            <div id={`section-${section.id}`} key={section.id} className="publication-section">
              <h2>{section.titre}</h2>
              <p>{section.contenu}</p>
            </div>
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PublicationDetail;
