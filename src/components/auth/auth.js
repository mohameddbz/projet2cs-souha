import React, { useState } from 'react';
import './auth.css'; // Assurez-vous que le chemin est correct pour vos CSS
import log from '../../assets/images/log.svg'; // Assurez-vous que le chemin est correct pour vos images
import register from '../../assets/images/register.svg'; // Assurez-vous que le chemin est correct pour vos images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import logoEsi from '../../assets/images/logo_esi1.svg'; // Assurez-vous que le chemin est correct pour vos images
import axios from 'axios'; // Assurez-vous d'avoir installé axios
import { Link, useNavigate } from 'react-router-dom'; // Importez useNavigate

function Auth() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Utilisez useNavigate ici

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users/login', {
        email,
        password
      });
      const  access  = response.data;
      console.log('Token reçu:', response.data);
      if (access) {
        localStorage.setItem('token', response.data);
        
        navigate('/Admin/dashboard'); // Utilisez navigate pour la redirection
      } else {
        alert('Connexion échouée : aucun token reçu');
      }
    } catch (error) {
      console.error('Erreur de connexion', error);
      if (error.response && error.response.status === 401) {
        alert('Identifiants invalides');
      } else {
        alert('Problème de connexion');
      }
    }
  };
  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleSignIn}>
            <h2 className="title">Se Connecter</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="fa-icon"></FontAwesomeIcon>
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="fa-icon"></FontAwesomeIcon>
              <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <input type="submit" value="Se Connecter" className="btn solid" />
          </form>
          {/* Incluez ici le formulaire d'inscription si nécessaire */}
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <img src={logoEsi} alt='' className='logoAuth'></img>
            <h3>Bienvenue au site de l'ESI</h3>
            <p>
              Pour pouvoir se connecter vous devez utiliser votre compte professionnel
              (xyz@esi.dz)
            </p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              S'inscrire
            </button>
          </div>
          <img src={log} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <img src={logoEsi} alt='' className='logoAuth'></img>
            <h3>L'un de Nous ?</h3>
            <p>
              Pour pouvoir s'inscrire' vous devez utiliser votre compte professionnel
              (xyz@esi.dz)
            </p>
            <button className="btn transparent" onClick={handleSignInClick}>
              Se connecter
            </button>
          </div>
          <img src={register} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Auth;
