import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './auth.css'; // Import your CSS file here
import log from '../../assets/images/log.svg'
import register from '../../assets/images/register.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import logoEsi from '../../assets/images/logo_esi1.svg'

function Auth() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Se Connecter</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="fa-icon"></FontAwesomeIcon>
              <input type="text" placeholder="Email" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="fa-icon"></FontAwesomeIcon>
              <input type="password" placeholder="mot de passe" />
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
