
import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import './Demande.css';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';

function DemandeForm() {
  const { id } = useParams(); // Get the piece ID from the URL
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    numero_telephone: '',
    numero_immatriculation: '',
    cycle_etude: '',
    piece: id,
    quantite_emprunnee: 1,
    description: '',
    // utilisateur: '',  // Champ utilisateur
  });
  const [piece,setPiece]= useState(`piece id : ${id}`)

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
    const loadPiece = async () => {
      try {
        // Replace 'id' with the actual ID or state variable as needed
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/pieces/${id}`);
        setPiece(response.data.nom);
      } catch (error) {
        console.error('Error fetching piece details:', error);
      }
    };

    if (id) {
      loadPiece();
    }
  },[id]);

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
      console.log('test test test ')
      console.log(formData)
      // const token = localStorage.getItem('token');
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
            piece: id,
            quantite_empruntee: 1,
            description: '',
          //  utilisateur: '',
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
      <Navbar/>
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
        <input className='myy' type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleInputChange} />
        <div className="input-block">
          <select name="cycle_etude" value={formData.cycle_etude} onChange={handleInputChange}>
            <option value="">Sélectionnez ou saisissez une option...</option>
            <option value="1CP">1CP</option>
            <option value="2CP">2CP</option>
            <option value="1CS">1CS</option>
            <option value="2CS">2CS</option>
            <option value="3CS">3CS</option>
          </select>
        </div>
        <div className="input-group">
          <input type="text" name="nomPiece" placeholder="Nom de la pièce" value={piece}  />
          <div className="quantity-controls">
            <button type="button" onClick={() => handleQuantityChange(-1)}><FaMinus /></button>
            <input type="number" name="quantite_empruntee" value={formData.quantite_empruntee} onChange={handleInputChange} />
            <button type="button" onClick={() => handleQuantityChange(1)}><FaPlus /></button>
          </div>
        </div>
        <textarea name="description" placeholder="Bref description pourquoi vous demandez cette piece" value={formData.description} onChange={handleInputChange}></textarea>
        <button type="submit" className="action-button">Demander</button>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default DemandeForm;
