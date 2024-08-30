import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import styles from './SidebarAdm.module.scss';
import im from '../../../assets/logoSidebar.svg'; 
import Dashboard from'../../../assets/dashoard.svg';
import hourGlass from'../../../assets/hourglass.svg';
import trash from'../../../assets/trash.svg';
import pubIcon from'../../../assets/pubIcon.svg';
import deconnect from '../../../assets/deconnect.svg'
import profile from '../../../assets/profile.svg'
import history from '../../../assets/history.svg'
import pubilerIcon from'../../../assets/publierIcon.svg';

function textMenu(icon, text) {
    return (
        <div className={styles.MenuItemContainer}>
            <img src={icon} alt="icon" className={styles.icon} />
            <div className={styles.menuText}>{text}</div>
        </div>
    )
}

function logout() {
    localStorage.removeItem('token'); // Supprime le token de l'utilisateur du localStorage
    window.location.href = '/Auth'; // Redirige l'utilisateur vers la page de connexion
}

export default function SidebarPub() {
    return (
        <div className={styles.container}>
            <Sidebar className={styles.sidebarContainer}>
                <Menu className={styles.menuContainer}>
                <Link to="/">
            <img src={im} alt="logo" className={styles.logo} style={{ cursor: 'pointer' }} />
          </Link>
                    <SubMenu label="Main Boards" className={styles.SubMenu}>
                        <MenuItem className={styles.widthMenu}><Link to="/Publieur/dashboard">{textMenu(Dashboard,'Dashboard')}</Link></MenuItem>
                    </SubMenu>
                    <SubMenu label="Publication" className={styles.SubMenu}>
                        <MenuItem className={styles.widthMenu}><Link to="/Publieur/publications">{textMenu(pubIcon,'Publication')}</Link></MenuItem>
                        <MenuItem className={styles.widthMenu}><Link to="/Publieur/publier">{textMenu(pubilerIcon,'Publier')}</Link></MenuItem>
                        {/* <MenuItem className={styles.widthMenu}><Link to="/Publieur/demande_suppression">{textMenu(trash,'Demande suppression')}</Link></MenuItem> */}
                        {/* <MenuItem className={styles.widthMenu}><Link to="/Publieur/historique">{textMenu(history,'Historique de publication')} </Link></MenuItem> */}
                    </SubMenu>
                    <SubMenu label="Paramètres" className={styles.SubMenu}>
                        <MenuItem className={styles.widthMenu}><Link to="/editeur/profile">{textMenu(profile,'Profile')}</Link></MenuItem>
                        {/* <MenuItem className={styles.widthMenu}><Link to="/Admin/Ajouter_user">{textMenu(pubilerIcon,'Profile')}</Link></MenuItem> */}
                        <MenuItem className={styles.widthMenu} onClick={logout}>{textMenu(deconnect,'Se Deconnecter')}</MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
        </div>
    );
}
