import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

import './Demande.css';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';

function DemandeForm() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    numero_telephone: '',
    numero_immatriculation: '',
    cycle_etude: '',
    piece: '',
    quantite_emprunnee: 1,
    description: '',
    // utilisateur: '',  // Champ utilisateur
  });

  const [userName, setUserName] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fonction pour récupérer le nom de l'utilisateur
    // const fetchUserName = async () => {
    //   try {
    //     const token = localStorage.getItem('token');
    //     const response = await fetch('http://127.0.0.1:8000/users/', {
    //       headers: {
    //         'Authorization': `Bearer ${token}`,
    //       },
    //     });

    //     if (response.ok) {
    //       const data = await response.json();
    //       const user = data.find(u => u.email === formData.email);
    //       if (user) {
    //         setUserName(user.first_name);
    //         setFormData(prev => ({ ...prev, utilisateur: user.id }));
    //       } else {
    //         console.error('Utilisateur non trouvé');
    //       }
    //     } else {
    //       console.error('Error fetching user data:', await response.json());
    //     }
    //   } catch (error) {
    //     console.error('Network error:', error);
    //   }
    // };

    // if (formData.email) {
    //   fetchUserName();
    // }
  }, [formData.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (delta) => {
    setFormData(prev => ({ ...prev, quantite_emprunnee: Math.max(1, prev.quantite_emprunnee + delta) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/faire-demande-materiel/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        if (response.ok) {
          const data = await response.json();
          console.log('Success:', data);
          alert('Demande envoyée avec succès!');
          // Réinitialiser le formulaire après succès
          setFormData({
            nom: '',
            prenom: '',
            email: '',
            numero_telephone: '',
            numero_immatriculation: '',
            cycle_etude: '',
            piece: '',
            quantite_emprunnee: 1,
            description: '',
            // utilisateur: '',
          });
          setUserName('');
        } else {
          const errorData = await response.json();
          setErrors(errorData);
          alert(`Erreur: ${JSON.stringify(errorData)}`);
          console.error('Error:', errorData);
        }
      } else {
        const text = await response.text();
        alert(`Erreur du serveur: ${text}`);
        console.error('Erreur du serveur:', text);
      }
    } catch (error) {
      alert('Erreur de connexion.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="demande-form">
        <h1>Demander Pièce électronique</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleInputChange} />
            <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <input type="tel" name="numero_telephone" placeholder="Téléphone" value={formData.numero_telephone} onChange={handleInputChange} />
            <input type="text" name="numero_immatriculation" placeholder="Numéro d'immatriculation" value={formData.numero_immatriculation} onChange={handleInputChange} />
          </div>
          <div className="input-block">
            <select name="cycle_etude" value={formData.cycle_etude} onChange={handleInputChange}>
              <option value="">Sélectionnez ou saisissez une option...</option>
              <option value="Cycle 1">Cycle 1</option>
              <option value="Cycle 2">Cycle 2</option>
            </select>
          </div>
          <div className="input-group">
            <input type="text" name="piece" placeholder="Nom de la pièce" value={formData.piece} onChange={handleInputChange} />
            <div className="quantity-controls">
              <button type="button" onClick={() => handleQuantityChange(-1)}><FaMinus /></button>
              <input type="number" name="quantite_emprunnee" value={formData.quantite_emprunnee} onChange={(e) => setFormData(prev => ({ ...prev, quantite_emprunnee: Number(e.target.value) }))} />
              <button type="button" onClick={() => handleQuantityChange(1)}><FaPlus /></button>
            </div>
          </div>
          <textarea name="description" placeholder="Bref description pourquoi vous demandez cette pièce" value={formData.description} onChange={handleInputChange}></textarea>
          <button type="submit" className="action-button">Demander</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default DemandeForm;
