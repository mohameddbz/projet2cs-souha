import React, { useState, useEffect } from 'react';
import { FaList } from 'react-icons/fa';
import axios from 'axios';
import SidebarFablab from '../../components/SidebarAdmin/SidebarFablab';
import './FablabInscriptionPage.css';

function FablabInscriptionPage() {
  const [inscriptions, setInscriptions] = useState([]);
  const [filteredInscriptions, setFilteredInscriptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchInscriptions();
  }, []);

  const fetchInscriptions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/inscriptions/`);
      setInscriptions(response.data);
      setFilteredInscriptions(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des inscriptions:', error);
      alert('Erreur lors de la récupération des inscriptions. Veuillez réessayer plus tard.');
    }
  };

  const handleDateFilter = async () => {
    if (!selectedDate) {
      alert('Veuillez sélectionner une date.');
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/filter-inscriptions-by-date/`, {
        params: { date: selectedDate }
      });
      setFilteredInscriptions(response.data);
    } catch (error) {
      console.error('Erreur lors du filtrage des inscriptions:', error);
      alert('Erreur lors du filtrage des inscriptions. Veuillez réessayer.');
    }
  };

  const updateInscriptionsList = (id) => {
    setFilteredInscriptions(filteredInscriptions.filter(inscription => inscription.id !== id));
    setInscriptions(inscriptions.filter(inscription => inscription.id !== id));
  };

  const handleValidation = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/inscriptions/${id}/valider/`);
      alert('Inscription validée!');
      updateInscriptionsList(id);
    } catch (error) {
      console.error('Erreur lors de la validation de l\'inscription:', error);
      alert('Erreur lors de la validation de l\'inscription. Veuillez réessayer.');
    }
  };

  const handleRejection = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/inscriptions/${id}/rejeter/`);
      alert('Inscription rejetée!');
      updateInscriptionsList(id);
    } catch (error) {
      console.error('Erreur lors du rejet de l\'inscription:', error);
      alert('Erreur lors du rejet de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
    <div className="inscription-page-container">
      <div className="sidebar">
        <SidebarFablab />
      </div>
      <div className="admin-container">
        <div className="admin-header">
          <h1><FaList /> Inscriptions FabLab</h1>
          <div className="filter-container">
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)} 
              className="search-input"
            />
            <button onClick={handleDateFilter}>Filtrer par date</button>
          </div>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInscriptions.map(inscription => (
              <tr key={inscription.id}>
                <td>{inscription.nom}</td>
                <td>{inscription.prenom}</td>
                <td>{inscription.status}</td>
                <td>{new Date(inscription.created).toLocaleDateString()}</td>
                <td>
                  {inscription.status === 'validée' || inscription.status === 'rejetée' ? null : (
                    <div className="action-buttons">
                      <button className="approve" onClick={() => handleValidation(inscription.id)}>Valider</button>
                      <button className="reject" onClick={() => handleRejection(inscription.id)}>Rejeter</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FablabInscriptionPage;
