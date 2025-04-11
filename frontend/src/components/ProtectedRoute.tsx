import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            setLoading(false);
        };
        checkAuth();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};