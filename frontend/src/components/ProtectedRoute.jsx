import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
        // Redirect to login or home page if no user ID
        // The replace prop ensures that the navigation does not leave a history entry
        // This is useful for preventing the user from going back to the protected route
        return <Navigate to="/user" replace />;
    }
    
    return children;
};

export default ProtectedRoute;