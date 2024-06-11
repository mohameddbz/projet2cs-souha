import React from 'react';
import SidebarAdm from '../../components/Sidebar/SidebarAdmin/SidebarAdm';
import './Principal.css'

function Principal() {
  return (
      <div className='admin-page-container'>
        <div className='sidebar'>
        <SidebarAdm />
        </div>
       
        <div className="admin-container">
        </div>
      </div>
  );
}

export default Principal;
