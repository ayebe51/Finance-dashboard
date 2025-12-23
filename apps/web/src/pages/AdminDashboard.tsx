import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface AdminStats {
    totalUsers: number;
    totalTransactions: number;
    totalRecurring: number;
    totalVolume: number;
}

interface RecentUser {
    id: string;
    name: string | null;
    email: string;
    role: string;
    createdAt: string;
}

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadAdminData();
    }, []);

    const loadAdminData = async () => {
        try {
            const response = await api.get('/admin/stats');
            setStats(response.data.stats);
            setRecentUsers(response.data.recentUsers);
        } catch (err: any) {
            console.error('Failed to load admin stats', err);
            setError(err.response?.status === 403 ? 'Access Denied: Admin privileges required.' : 'Failed to load data.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading admin dashboard...</div>;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full p-8">
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-xl border border-red-200 dark:border-red-900/50 max-w-md text-center">
                    <span className="material-symbols-outlined text-4xl mb-4">gpp_bad</span>
                    <h2 className="text-xl font-bold mb-2">Access Restricted</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                    <p className="text-gray-500 dark:text-text-secondary mt-1">System-wide overview and statistics</p>
                </div>
                <button onClick={loadAdminData} className="text-primary hover:text-primary-hover transition-colors">
                    <span className="material-symbols-outlined">refresh</span>
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-gray-200 dark:border-border-dark shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-text-secondary">Total Users</h3>
                        <span className="material-symbols-outlined text-blue-500 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">group</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalUsers.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-gray-200 dark:border-border-dark shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-text-secondary">Transactions</h3>
                        <span className="material-symbols-outlined text-green-500 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">receipt_long</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalTransactions.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-gray-200 dark:border-border-dark shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-text-secondary">Recurring Profiles</h3>
                        <span className="material-symbols-outlined text-purple-500 bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">event_repeat</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalRecurring}</p>
                </div>
                <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-gray-200 dark:border-border-dark shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-text-secondary">Total Volume</h3>
                        <span className="material-symbols-outlined text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded-lg">payments</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">${stats?.totalVolume.toLocaleString()}</p>
                </div>
            </div>

            {/* Recent Users Table */}
            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-border-dark shadow-sm overflow-hidden flex-1">
                <div className="p-6 border-b border-gray-200 dark:border-border-dark">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Recent Signups</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-surface-dark/50 text-gray-500 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-border-dark">
                            {recentUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-surface-dark/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.name || 'N/A'}</td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-text-secondary">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                            user.role === 'ADMIN' 
                                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' 
                                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-text-secondary">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
