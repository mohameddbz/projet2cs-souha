import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './auth.css'; // Import your CSS file here
import log from '../../assets/images/log.svg'
import register from '../../assets/images/register.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import logoEsi from '../../assets/images/logo_esi1.svg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
      const { token, is_adminstrateur, is_editeur } = response.data;
      if (token) {
        console.log('Token reçu:', token);
        localStorage.setItem('token', token);
        localStorage.setItem('is_adminstrateur', is_adminstrateur);
        localStorage.setItem('is_editeur', is_editeur);
        console.log(is_editeur);
        console.log(is_adminstrateur);

        // Redirigez l'utilisateur en fonction de son rôle
        if (is_adminstrateur) {
          navigate('/Admin/publications');
        } else if (is_editeur) {
          navigate('/Publieur/publications');
        } else {
          navigate('/'); // Rediriger vers une page par défaut si non-admin/éditeur
        }
      } else {
        alert('Connexion échouée : aucun token reçu');
      }
    } catch (error) {
      console.error('Erreur de connexion', error);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            alert('Email et mot de passe sont requis');
            break;
          case 401:
            alert('Identifiants invalides');
            break;
          case 500:
            alert('Problème de serveur');
            break;
          default:
            alert('Problème de connexion');
        }
      } else {
        alert('Problème de connexion au serveur');
      }
    }
};

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={handleSignIn} >
            <h2 className="title">Se Connecter</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="fa-icon"></FontAwesomeIcon>
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="fa-icon"></FontAwesomeIcon>
              <input type="password" placeholder="mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <input type="submit" value="Se Connecter" className="btn solid" />
            <p className="social-text">Ou bien se connecter via le compte gmail@esi.dz</p>
            <div className="social-media">
              <Link to="#" className="social-icon">
                <FontAwesomeIcon icon={faEnvelope}  className="fab fa-facebook-f"></FontAwesomeIcon>
              </Link>
            </div>
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">S'inscrire</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Nom utilisateur" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Mot de passe" />
            </div>
            <input type="submit" className="btn" value="S'inscrire" />
            <p className="social-text">Ou bien s'inscrire en utilisant le compte gmail@esi.dz</p>
            <div className="social-media">
            <Link to="#" className="social-icon">
                <FontAwesomeIcon icon={faEnvelope}  className="fab fa-facebook-f"></FontAwesomeIcon>
              </Link>
            </div>
          </form>
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
