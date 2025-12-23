import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Verifying privileges...</div>;
    }

    if (!user || user.role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
