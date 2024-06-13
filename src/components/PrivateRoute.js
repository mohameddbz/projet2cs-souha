import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const useAuth = () => {
    const token = localStorage.getItem('token');
    const isAdministrateur = localStorage.getItem('is_adminstrateur') === 'true';
    const isEditeur = localStorage.getItem('is_editeur') === 'true';
    console.log(isAdministrateur);
    console.log(isEditeur);
    return { isAuthenticated: !!token, isAdministrateur, isEditeur };
   
};

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isAdministrateur, isEditeur } = useAuth();
    const location = useLocation();
    
    if (!isAuthenticated) {
        // Rediriger vers la page de connexion si non authentifié
        return <Navigate to="/Auth" />;
    }

    // Si l'utilisateur est un administrateur, mais tente d'accéder à une page Publieur
    if (isAdministrateur && location.pathname.startsWith('/Publieur')) {
        return <Navigate to="/Admin/publications" />;
    }

    // Si l'utilisateur est un éditeur (publieur), mais tente d'accéder à une page Admin
    if (isEditeur && location.pathname.startsWith('/Admin')) {
        return <Navigate to="/Publieur/publications" />;
    }

    return children; // Rendre les enfants si authentifié et autorisé
};

export default PrivateRoute;
