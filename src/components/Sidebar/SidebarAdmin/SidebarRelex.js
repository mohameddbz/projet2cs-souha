import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import styles from './SidebarAdm.module.scss';
import im from '../../../assets/logoSidebar.svg'; 
import Dashboard from'../../../assets/dashoard.svg';
import hourGlass from'../../../assets/hourglass.svg';
import pubIcon from'../../../assets/pubIcon.svg';
// import question from '../../../assets/question.svg';
import deconnect from '../../../assets/deconnect.svg'
import profile from '../../../assets/profile.svg'
import { FaBars } from 'react-icons/fa'; // Import hamburger icon from react-icons if needed


function textMenu(icon, text) {
  return (
    <div className={styles.MenuItemContainer}>
      <img src={icon} alt="icon" className={styles.icon} />
      <div className={styles.menuText}>{text}</div>
    </div>
  );
}

function logout() {
  // Supprime toutes les clés spécifiques liées à l'utilisateur et à ses rôles du localStorage
  localStorage.removeItem('token'); // Supprime le token de l'utilisateur
  localStorage.removeItem('is_adminstrateur'); // Supprime l'indicateur de rôle d'administrateur
  localStorage.removeItem('is_editeur'); // Supprime l'indicateur de rôle d'éditeur

  // Pour s'assurer que toutes les instances de l'application réagissent à la déconnexion,
  // vous pouvez utiliser un événement de stockage ou simplement recharger la page
  // qui nettoiera toutes les mémoires cachées et les états des composants.
  window.location.href = '/Auth'; // Redirige l'utilisateur vers la page de connexion
}


export default function SidebarAdm() {
  const [isVisible, setIsVisible] = useState(false); // State to handle sidebar visibility
  function toggleSidebar() {
    setIsVisible(!isVisible);
  }
  return (
    <div className={styles.container}>
    <div onClick={toggleSidebar} className={styles.hamburgerMenu}>
        <FaBars />
    </div>
    <div className={`${styles.overlay} ${isVisible ? styles.overlayVisible : ''}`}
        onClick={() => setIsVisible(false)} />
    <Sidebar className={`${styles.sidebarContainer} ${isVisible ? styles.sidebarVisible : ''}`}>
       
        <Menu className={styles.menuContainer}>
          <Link to="/">
            <img src={im} alt="logo" className={styles.logo} style={{ cursor: 'pointer' }} />
          </Link>
          <SubMenu label="Main Boards" className={styles.SubMenu}>
            <MenuItem className={styles.widthMenu}><Link to="">{textMenu(Dashboard,'Dashboard')}</Link></MenuItem>
          </SubMenu>
          <SubMenu label="Partenaire" className={styles.SubMenu}>
            <MenuItem className={styles.widthMenu}><Link to="/relex/partenaire">{textMenu(pubIcon,'Liste des Partenaires')}</Link></MenuItem>
            <MenuItem className={styles.widthMenu}><Link to="/relex/partenaireDemende">{textMenu(hourGlass,'Demende partenariat')}</Link></MenuItem>
            <MenuItem className={styles.widthMenu}><Link to="/relex/historiqueDemnde">{textMenu(hourGlass,'Historique Demende')}</Link></MenuItem>
            <MenuItem className={styles.widthMenu}><Link to="/relex/AjouterPartenaire">{textMenu(pubIcon,'Ajouter partenaire')}</Link></MenuItem>
          </SubMenu>
          <SubMenu label="Formation a la carte" className={styles.SubMenu}>
            <MenuItem className={styles.widthMenu}><Link to="">{textMenu(pubIcon,'Liste des formations')}</Link></MenuItem>
            <MenuItem className={styles.widthMenu}><Link to="">{textMenu(hourGlass,'Ajouter formation')}</Link></MenuItem>
          </SubMenu>
          <SubMenu label="Formation avant promo" className={styles.SubMenu}>
            <MenuItem className={styles.widthMenu}><Link to="/relex/FormateurList">{textMenu(pubIcon,'Liste des formateurs')}</Link></MenuItem>
            <MenuItem className={styles.widthMenu}><Link to="/relex/AddFormateur">{textMenu(pubIcon,'Add formateur')}</Link></MenuItem>
            <MenuItem className={styles.widthMenu}><Link to="">{textMenu(pubIcon,'Liste des formations')}</Link></MenuItem>
            <MenuItem className={styles.widthMenu}><Link to="">{textMenu(hourGlass,'Ajouter formation')}</Link></MenuItem>
          </SubMenu>
          <SubMenu label="Paramètres" className={styles.SubMenu}>
            <MenuItem className={styles.widthMenu}><Link to="/relex/profile">{textMenu(profile,'Profile')}</Link></MenuItem>
            <MenuItem className={styles.widthMenu} onClick={logout}>{textMenu(deconnect,'Se Deconnecter')}</MenuItem>
          </SubMenu>
        </Menu>
        </Sidebar>
    </div>
  );
}
