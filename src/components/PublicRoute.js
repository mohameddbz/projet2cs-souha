import React from 'react';
import { Navigate } from 'react-router-dom';

const useAuth = () => {
    const token = localStorage.getItem('token');
    return { isAuthenticated: !!token };
};

const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        // Rediriger vers le tableau de bord ou une page par défaut pour les utilisateurs authentifiés
        return <Navigate to="/Admin/publications" />;
    }
    
    return children; // Rendre les enfants si non authentifié
};

export default PublicRoute;
