import React, { useState } from 'react';
import styles from './AjouterUser.module.css';
import SidebarAdm from '../../components/Sidebar/SidebarAdmin/SidebarAdm';
import { FaPlus } from 'react-icons/fa';

function AjouterUser() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }
        console.log("User data to submit:", formData);
        setFormData({
            firstName: '',
            lastName: '',
            role: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <div className={styles.adminPageContainer}>
            <div className={styles.sidebar}>
            <SidebarAdm/>
            </div>
            
       
        <div className={styles.formContainer}>
        <div className="admin-header">
        <h1><FaPlus /> Ajouter Un Utilisateur</h1>
        </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Nom</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Prénom</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Rôle</label>
                    <select
                        className={styles.select}
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="">Sélectionner un rôle</option>
                        <option value="admin">Administrateur</option>
                        <option value="publisher">Publieur</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Adresse Mail</label>
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Mot de Passe</label>
                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Confirmer le Mot de Passe</label>
                    <input
                        className={styles.input}
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className={styles.button}>Ajouter</button>
            </form>
        </div>
        </div>
        
    );
}

export default AjouterUser;
