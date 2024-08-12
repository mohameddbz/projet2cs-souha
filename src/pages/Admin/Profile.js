import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import SidebarAdm from '../../components/Sidebar/SidebarAdmin/SidebarAdm';
import './Admin.css';
import axios  from 'axios';

const ProfilePage = () => {
 
  

  const [currentUser,setCurrentUser]= useState('')
  const [rolee, setRole] = useState('');

  const checkRole = () => {
    if (currentUser.is_adminstrateur === true) {
      setRole('admin');
    }  if (currentUser.is_editeur === true) {
      setRole('editor');
    }  if (currentUser.is_chercheur === true ) {
      setRole('researcher');
    }  if (currentUser.is_responsable_fablab === true ) {
      setRole('fablab_responsible');
    }  if (currentUser.is_directeur_relex === true ) {
      setRole('director_relex');
    }
    //  {
    //   setRole('unknown'); // Default role if no attributes match
    // }
  };
 
  useEffect(()=>{
      const getCurrentUser = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/`, {
                headers: { 'Authorization': `Token ${token}` }  // Correct 'Token' instead of 'token'
            });
            setCurrentUser(res.data)
            checkRole()
        } catch (error) {
            console.error('Error fetching user:', error);
        }
      }
      getCurrentUser()
  },[])
 

  return (
    <div className='admin-page-container'>
    <div className='sidebar'>
        <SidebarAdm />
    </div>
    <div className="admin-container">
    <div className="profile-card">
        <div className="profile-item">
          <strong>E-mail:</strong>
          <p>{currentUser.email}</p>
        </div>
        <div className="profile-item">
          <strong>Family Name:</strong>
          <p>{currentUser.family_name}</p>
        </div>
        <div className="profile-item">
          <strong>Last Name:</strong>
          <p>{currentUser.first_name}</p>
        </div>
        <div className="profile-item">
          <strong>Role:</strong>
          <p>{rolee}</p>
        </div>
      </div>
    </div>
</div>
     
  );
};

export default ProfilePage;