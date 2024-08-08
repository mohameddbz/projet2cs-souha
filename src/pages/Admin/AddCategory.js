import React, { useState } from 'react';
import axios from 'axios';
import './AddCategory.css'; // Import the CSS file
import SidebarFablab from '../../components/SidebarAdmin/SidebarFablab';

function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/categories/add/`, { name: categoryName });
      setMessage(response.data.message);
      console.log(response)
      setCategoryName('');
      setError('');
    } catch (error) {
      setError('Failed to add category');
      setMessage('');
    }
  };

  return (
    <div className="admin-page-container">
      <div className="sidebar">
        <SidebarFablab /> {/* Include the SidebarPub component */}
      </div>
      <div className="admin-container">
        <div className="AdminTitleContainer">
          <h1 className="AdminTitle">Ajouter une catégorie</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="AdminInputContainer">
            <label className="AdminLabel" htmlFor="categoryName">Nom de la catégorie*</label>
            <input
              type="text"
              id="categoryName"
              className="AdminInput"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">Ajouter</button>
          </div>
          {message && <p className="message">{message}</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
