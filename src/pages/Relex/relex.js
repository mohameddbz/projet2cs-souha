import React from 'react';
import SidebarRelex from '../../components/Sidebar/SidebarAdmin/SidebarRelex';
import './relex.css'

function Principal() {
  return (
      <div className='admin-page-container'>
        <div className='sidebar'>
          <SidebarRelex />
        </div>
       
        <div className="admin-container">
        </div>
      </div>
  );
}

export default Principal;