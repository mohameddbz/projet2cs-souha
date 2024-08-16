import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './auth.css'; 
import log from '../../assets/images/log.svg';
import register from '../../assets/images/register.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import logoEsi from '../../assets/images/logo_esi1.svg';
import axios from 'axios';

function Auth() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUpClick = () => setIsSignUpMode(true);
  const handleSignInClick = () => setIsSignUpMode(false);

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
        email,
        password
      });
      const { token, is_adminstrateur, is_editeur , Categorie , is_chercheur , is_superuser } = response.data;
  
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('is_adminstrateur', is_adminstrateur);
        localStorage.setItem('is_editeur', is_editeur);
        
        if (is_adminstrateur){
          navigate('/Vaidateur')
        } else if (is_superuser) {
          navigate('/Admin/publications');
        } else if (Categorie.nom === "alumni"){
          navigate('/alumni/publications')
        } else if (is_chercheur) {
          navigate('/chercheur/articles');
        } else if (is_editeur){
          navigate("/Publieur/publications")
        } 
      } else {
        setError('Connexion échouée : aucun token reçu');
      }
    } catch (error) {
      const status = error.response?.status;
      switch (status) {
        case 400:
          setError('Email et mot de passe sont requis');
          break;
        case 401:
          setError('Identifiants invalides');
          break;
        case 500:
          setError('Problème de serveur');
          break;
        default:
          setError('Problème de connexion');
      }
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    setError('');
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {
        email,
        password,
        name
      });
      handleSignInClick(); // Switch to sign-in mode after successful registration
    } catch (error) {
      const status = error.response?.status;
      switch (status) {
        case 400:
          setError('Tous les champs sont requis');
          break;
        case 409:
          setError('Email déjà utilisé');
          break;
        case 500:
          setError('Problème de serveur');
          break;
        default:
          setError('Problème de connexion');
      }
    }
  };

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={handleSignIn}>
            <h2 className="title">Se Connecter</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="fa-icon" />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="fa-icon" />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input type="submit" value="Se Connecter" className="btn solid" />
            <p className="social-text">Ou bien se connecter via le compte gmail@esi.dz</p>
            <div className="social-media">
              <Link to="#" className="social-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </Link>
            </div>
          </form>
          <form action="#" className="sign-up-form" onSubmit={handleSignUp}>
            <h2 className="title">S'inscrire</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="fa-icon" />
              <input
                type="text"
                placeholder="Nom utilisateur"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className="fa-icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="fa-icon" />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="fa-icon" />
              <input
                type="password"
                placeholder="Confirmer mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <input type="submit" className="btn" value="S'inscrire" />
            <p className="social-text">Ou bien s'inscrire en utilisant le compte gmail@esi.dz</p>
            <div className="social-media">
              <Link to="#" className="social-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <img src={logoEsi} alt="Logo ESI" className='logoAuth' />
            <h3>Bienvenue au site de l'ESI</h3>
            <p>
              Pour pouvoir se connecter vous devez utiliser votre compte professionnel
              (xyz@esi.dz)
            </p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              S'inscrire
            </button>
          </div>
          <img src={log} className="image" alt="Connexion" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <img src={logoEsi} alt="Logo ESI" className='logoAuth' />
            <h3>L'un de Nous ?</h3>
            <p>
              Pour pouvoir s'inscrire vous devez utiliser votre compte professionnel
              (xyz@esi.dz)
            </p>
            <button className="btn transparent" onClick={handleSignInClick}>
              Se connecter
            </button>
          </div>
          <img src={register} className="image" alt="Inscription" />
        </div>
      </div>
    </div>
  );
}

export default Auth;