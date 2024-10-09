import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import styles from './SidebarAdm.module.scss';
import im from '../../../assets/logoSidebar.svg'; 
import Dashboard from'../../../assets/dashoard.svg';
import hourGlass from'../../../assets/hourglass.svg';
import trash from'../../../assets/trash.svg';
import pubIcon from'../../../assets/pubIcon.svg';
// import question from '../../../assets/question.svg';
import deconnect from '../../../assets/deconnect.svg'
import profile from '../../../assets/profile.svg'
import history from '../../../assets/history.svg'
import pubilerIcon from'../../../assets/publierIcon.svg';
import { FaBars } from 'react-icons/fa'; // Import hamburger icon from react-icons if needed
import { BsQuestionCircle, BsQuestionSquare } from 'react-icons/bs';

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
            <MenuItem className={styles.widthMenu}><Link to="/Admin/dashboard">{textMenu(Dashboard,'Dashboard')}</Link></MenuItem>
          </SubMenu>
          <SubMenu label="Publication" className={styles.SubMenu}>
            <MenuItem className={styles.widthMenu}><Link to="/Admin/publications">{textMenu(pubIcon,'Publication')}</Link></MenuItem>
            <MenuItem className={styles.widthMenu}><Link to="/Admin/publications_en_attente">{textMenu(hourGlass,'Publications en attente')}</Link></MenuItem>
            <MenuItem className={styles.widthMenu}><Link to="/Admin/demande_suppression">{textMenu(trash,'Demande suppression')}</Link></MenuItem>
            <MenuItem className={styles.widthMenu}><Link to="/Admin/historique">{textMenu(history,'Historique de publication')}</Link></MenuItem>
            <MenuItem className={styles.widthMenu}><Link to="/Ebachelier/BachelierAdmin">{textMenu(BsQuestionSquare,'Questions')}</Link></MenuItem>
          </SubMenu>
          <SubMenu label="Paramètres" className={styles.SubMenu}>
            <MenuItem className={styles.widthMenu}><Link to="/Admin/profile">{textMenu(profile,'Profile')}</Link></MenuItem>
            <MenuItem className={styles.widthMenu}><Link to="/Admin/Ajouter_user">{textMenu(pubilerIcon,'Ajouter un utilisateur')}</Link></MenuItem>
            <MenuItem className={styles.widthMenu}><Link to="/Admin/Liste_des_utilisateurs">{textMenu(pubIcon,'Liste Des Utilisateurs')}</Link></MenuItem>
            <MenuItem className={styles.widthMenu} onClick={logout}>{textMenu(deconnect,'Se Deconnecter')}</MenuItem>
          </SubMenu>
        </Menu>
        </Sidebar>
    </div>
  );
}
