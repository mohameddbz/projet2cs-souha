import React, { useEffect, useState } from 'react';
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
import axios  from 'axios';
import { FaUsers, FaTasks } from 'react-icons/fa';  // Example for FontAwesome icons


function textMenu(icon, text) {
    return (
        <div className={styles.MenuItemContainer}>
            <img src={icon} alt="icon" className={styles.icon} />
            <div className={styles.menuText}>{text}</div>
        </div>
    )
}

function logout() {
    localStorage.removeItem('token'); 
    window.location.href = '/Auth'; 
}


export default function SidebarPub() {
    const [is_club,setIsClub]= useState('');

    const getCurrentUser = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'
            });
            setIsClub(res.data.is_club)
        } catch (error) {
            console.error('Error fetching user:', error);
        }
      }

    useEffect(()=>{
        getCurrentUser();
    },[])
    return (
<div className={styles.container}>
    <Sidebar className={styles.sidebarContainer}>
        <Menu className={styles.menuContainer}>
            <Link to="/">
                <img src={im} alt="logo" className={styles.logo} style={{ cursor: 'pointer' }} />
            </Link>

            <SubMenu label="Main Boards" className={styles.SubMenu}>
                <MenuItem className={styles.widthMenu}>
                    <Link to="/Publieur/dashboard">
                        {textMenu(Dashboard, 'Dashboard')}
                    </Link>
                </MenuItem>
            </SubMenu>

            <SubMenu label="Publication" className={styles.SubMenu}>
                <MenuItem className={styles.widthMenu}>
                    <Link to="/Publieur/publications">
                        {textMenu(pubIcon, 'Publication')}
                    </Link>
                </MenuItem>
                <MenuItem className={styles.widthMenu}>
                    <Link to="/Publieur/publier">
                        {textMenu(pubilerIcon, 'Publier')}
                    </Link>
                </MenuItem>
            </SubMenu>

            {is_club && (
                <SubMenu label="Club Menu" className={styles.SubMenu}>
                <MenuItem className={styles.widthMenu}><Link to="/club/event">{textMenu(pubIcon,'Events')}</Link></MenuItem>
                        <MenuItem className={styles.widthMenu}><Link to="/club/Creer">{textMenu(pubilerIcon,'Cree event inscription')}</Link></MenuItem>
            </SubMenu>
            ) } 
            <SubMenu label="Paramètres" className={styles.SubMenu}>
                    <MenuItem className={styles.widthMenu}>
                        <Link to="/editeur/profile">{textMenu(profile, 'Profile')}</Link>
                    </MenuItem>
                    <MenuItem className={styles.widthMenu} onClick={logout}>
                        {textMenu(deconnect, 'Se Deconnecter')}
                    </MenuItem>
            </SubMenu>
            
        </Menu>
    </Sidebar>
</div>

    );
}
