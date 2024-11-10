import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import styles from './SidebarFablab.module.scss';
import im from '../../../assets/logoSidebar.svg'; 
import pubIcon from'../../../assets/pubIcon.svg';

import deconnect from '../../../assets/deconnect.svg';
import profile from '../../../assets/profile.svg';

function textMenu(icon, text) {
    return (
        <div className={styles.MenuItemContainer}>
            <img src={icon} alt="icon" className={styles.icon} />
            <div className={styles.menuText}>{text}</div>
        </div>
    );
}

function logout() {
    localStorage.removeItem('token'); // Supprime le token de l'utilisateur du localStorage
    window.location.href = '/Auth'; // Redirige l'utilisateur vers la page de connexion
}

export default function SidebarFablab() {
    return (
        <div className={styles.container}>
            <Sidebar className={styles.sidebarContainer}>
                <Menu className={styles.menuContainer}>
                    <Link to="/">
                        <img src={im} alt="logo" className={styles.logo} style={{ cursor: 'pointer' }} />
                    </Link>
                    <SubMenu label="Gestion des pièces" className={styles.SubMenu}>
                        <MenuItem className={styles.widthMenu}><Link to="/pieces">{textMenu(pubIcon, 'Liste des pièces ')}</Link></MenuItem>
                        <MenuItem className={styles.widthMenu}><Link to="/ajouter_piece">{textMenu(pubIcon, 'Ajouter pièce')}</Link></MenuItem>
                    </SubMenu>
                    <SubMenu label="Gestion des catégories" className={styles.SubMenu}>
                        <MenuItem className={styles.widthMenu}><Link to="/Fablab/categories">{textMenu(pubIcon, 'Liste des catégories')}</Link></MenuItem>
                        <MenuItem className={styles.widthMenu}><Link to="/ajouter_category">{textMenu(pubIcon, 'Ajouter catégorie')}</Link></MenuItem>
                    </SubMenu>
                    <SubMenu label="Demandes et Inscription" className={styles.SubMenu}>
                        <MenuItem className={styles.widthMenu}><Link to="/Fablab/demandes-materiels">{textMenu(pubIcon, 'Les demandes de matériel')}</Link></MenuItem>
                        <MenuItem className={styles.widthMenu}><Link to="/fablab-inscriptions">{textMenu(pubIcon, 'Inscription fablab')}</Link></MenuItem>
                    </SubMenu>
                    <SubMenu label="Paramètres" className={styles.SubMenu}>
                        <MenuItem className={styles.widthMenu}><Link to="/Fablab/profile">{textMenu(profile, 'Profile')}</Link></MenuItem>
                        <MenuItem className={styles.widthMenu} onClick={logout}>{textMenu(deconnect, 'Se Déconnecter')}</MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
        </div>
    );
}
