import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import axios from 'axios'; // Import axios for HTTP requests
import styles from './index.module.scss';
import styles1 from './enreg.module.scss';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import Chatbot from '../../components/chatbot/Chatbot';
import Datepicker from './Datepicker';

function DemandeDevis(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [Formations, setFormations] = useState([]);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [formData, setFormData] = useState({
    organisme: '',
    email: '',
    Numero_telephone: '',
    Formations: '',
    Nombre_participants: '',
  });

  useEffect(() => {
    fetchFormations(); // Correctly calls fetchFormations when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };

  const fetchFormations = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/themes-formation/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setOptions(response.data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  const handleDateClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    // Construct the data object for the form submission
    const requestData = {
      ...formData,
      Formations,
    };
  
    console.log(requestData);
  
    try {
      // Send a POST request with the form data using axios
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/demande-devis/add/`, requestData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Success:', response.data);
      setSubmissionSuccess(true);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  };
  const handleFormationsChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    const selectedObjects = selectedValues.map((value) => options.find((option) => option.titre === value));
    const selectedIds = selectedObjects.map((obj) => obj.id);
    setFormations(selectedIds);
  };

  return (
    <div>
      <Navbar />
      <Chatbot />
      <div className={cn(styles.root, props.className, 'demande-devis')}>
        <div className={styles.rect1} />
        <div className={styles.description_container}>
          <h2 className={styles.medium_title_box}>
            <span className={styles.medium_title}>
              <span className={styles.medium_title_span0}>Personnalisez vos </span>
              <span className={styles.medium_title_span1}>
                coûts !<br />
              </span>
            </span>
          </h2>
          <h5 className={styles.highlight_box}>
            <span className={styles.highlight}>
              <span className={styles.highlight_span0}>Ce </span>
              <span className={styles.highlight_span1}>simulateur</span>
              <span className={styles.highlight_span2}>
                vous permet de calculer rapidement et facilement le coût estimé d'une formation sur mesure pour votre
                entreprise ou votre organisation. En fournissant quelques détails sur vos besoins en formation, notre
                outil générera un{' '}
              </span>
              <span className={styles.highlight_span3}>devis personnalisé</span>
              <span className={styles.highlight_span4}>
                {' '}
                afin que vous puissiez planifier votre budget en toute tranquillité.
              </span>
            </span>
          </h5>
        </div>

        <div className={styles.formContainer}>
        {!submissionSuccess ? ( // Conditionally render form or success link
          <form className={styles.formDevis} onSubmit={handleSubmit}>
            <div className={styles.rect2} />
            <input
              type="text"
              className={`${styles.text} ${styles.transparentinput}`}
              placeholder="Nom de l'organisme"
              name="organisme"
              value={formData.organisme}
              onChange={handleInputChange}
            />
            <div className={styles.line} />

            <input
              type="email"
              className={`${styles.text2} ${styles.transparentinput}`}
              placeholder="Adresse E-mail"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <div className={styles.line2} />

            <input
              type="text"
              className={`${styles.text5} ${styles.transparentinput}`}
              placeholder="Numéro de téléphone"
              name="Numero_telephone"
              value={formData.Numero_telephone}
              onChange={handleInputChange}
            />
            <div className={styles.line5} />

            <div>
              <label >Formations *</label>
              <select  multiple onChange={handleFormationsChange}>
                {options.map((option) => (
                  <option key={option.id} value={option.titre}>
                    {option.titre}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.line} />

            <input
              type="number"
              className={`${styles.text} ${styles.transparentinput}`}
              placeholder="Nombre de participants"
              name="Nombre_participants"
              value={formData.Nombre_participants}
              onChange={handleInputChange}
            />
            <div className={styles.line} />

            <button type="submit" className={styles.buttonSubmit}>
              Valider
            </button>
          </form>
          ) : (
              <div className={styles1.formDevis} >
              <div className={styles1.rect2Enreg} >
              <h2 className={styles1.medium_title_box2}>
                <span className={styles1.medium_title}>
                <span className={styles1.medium_title_span02}>Demande enregistrée avec succès !</span>
                </span>
              </h2>
              </div>
              </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

DemandeDevis.propTypes = {
  className: PropTypes.string,
};

export default DemandeDevis;
