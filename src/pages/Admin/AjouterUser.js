import React, { useState, useEffect } from 'react';
import styles from './AjouterUser.module.css';
import SidebarAdm from '../../components/Sidebar/SidebarAdmin/SidebarAdm';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

function AjouterUser() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: '',
        categorie: '',
        club: '',
        equipeRecherche: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [categories, setCategories] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [equipeRecherche, setEquipeRecherche] = useState([]);

    useEffect(() => {
        // Fetch categories
        axios.get(`${process.env.REACT_APP_API_URL}/categorie`)
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        if (formData.categorie === 'club') {
            axios.get(`${process.env.REACT_APP_API_URL}/clubs/`)
                .then(response => setClubs(response.data))
                .catch(error => console.error('Error fetching clubs:', error));
        } else {
            setClubs([]); // Clear clubs if category is not 'club'
        }
    }, [formData.categorie]);

    useEffect(() => {
        if (formData.categorie === 'chercheur') {
            axios.get(`${process.env.REACT_APP_API_URL}/equipe_recherche`)
                .then(response => setEquipeRecherche(response.data))
                .catch(error => console.error('Error fetching équipe de recherche:', error));
        } else {
            setEquipeRecherche([]); // Clear équipe de recherche if category is not 'chercheur'
        }
    }, [formData.categorie]);

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
    
        const category = categories.find(cat => cat.nom === formData.categorie);
        const categoryId = category ? category.id_categorie : null;
    
        const userData = {
            email: formData.email,
            first_name: formData.firstName,
            family_name: formData.lastName,
            password: formData.password,
            date_joined: new Date().toISOString(),
            last_login: null,
            is_chercheur: formData.categorie === 'chercheur',
            is_adminstrateur: formData.role === 'admin',
            is_editeur: formData.role === 'editor',
           
            equipeRecherche: formData.equipeRecherche || null, // ID of équipe de recherche
            is_responsable_fablab: formData.categorie === 'responsable_fablab',
            is_directeur_relex: formData.categorie === 'directeur_relex',
            Categorie: categoryId, // ID of category
            is_club: formData.categorie === 'club',
            club: formData.categorie === 'club' ? parseInt(formData.club) || null : null // ID of club
        };
    
        const token = localStorage.getItem('token'); 
    
        axios.post(`${process.env.REACT_APP_API_URL}/users/add`, userData, {
            headers: { 'Authorization': `token ${token}` }
        })
        .then(response => {
            
            alert('Utilisateur ajouté avec succès!');
            setFormData({
                firstName: '',
                lastName: '',
                role: '',
                categorie: '',
                club: '',
                equipeRecherche: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        })
        .catch(error => {
            
            
            alert('Erreur lors de l\'ajout de l\'utilisateur.');
        });
    };

    return (
        <div className={styles.adminPageContainer}>
            <div className={styles.sidebar}>
                <SidebarAdm />
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
                            <option value="editor">Éditeur</option>
                           
                            
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Catégorie</label>
                        <select
                            className={styles.select}
                            name="categorie"
                            value={formData.categorie}
                            onChange={handleChange}
                        >
                            <option value="">Sélectionner une catégorie</option>
                            {categories.map(cat => (
                                <option key={cat.id_categorie} value={cat.nom}>
                                    {cat.nom}
                                </option>
                            ))}
                        </select>
                    </div>

                    {formData.categorie === 'club' && (
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Club</label>
                            <select
                                className={styles.select}
                                name="club"
                                value={formData.club}
                                onChange={handleChange}
                            >
                                <option value="">Sélectionner un club</option>
                                {clubs.map(club => (
                                    <option key={club.id_club} value={club.id_club}>
                                        {club.nom}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {formData.categorie === 'chercheur' && (
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Équipe de Recherche</label>
                            <select
                                className={styles.select}
                                name="equipeRecherche"
                                value={formData.equipeRecherche}
                                onChange={handleChange}
                            >
                                <option value="">Sélectionner une équipe de recherche</option>
                                {equipeRecherche.map(equipe => (
                                    <option key={equipe.id_equipe_recherche} value={equipe.id_equipe_recherche}>
                                        {equipe.nom}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

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