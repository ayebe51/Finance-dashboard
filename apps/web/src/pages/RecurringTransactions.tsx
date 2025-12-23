import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface RecurringTransaction {
    id: string;
    description: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    interval: string;
    nextRun: string;
    status: string;
    category: { name: string; color: string } | null;
}

const RecurringTransactions: React.FC = () => {
    const [recurring, setRecurring] = useState<RecurringTransaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRecurring();
    }, []);

    const loadRecurring = async () => {
        try {
            const response = await api.get('/recurring');
            setRecurring(response.data);
        } catch (error) {
            console.error('Failed to load recurring transactions', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to stop this recurring transaction?')) return;
        try {
            await api.delete(`/recurring/${id}`);
            loadRecurring();
        } catch (error) {
            console.error('Failed to delete recurring transaction', error);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transaksi Berulang</h1>
                    <p className="text-gray-500 dark:text-text-secondary mt-1">Manage your automated recurring payments</p>
                </div>
            </div>

            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-border-dark shadow-sm overflow-hidden flex-1 flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-border-dark flex justify-between items-center">
                    <h3 className="font-bold text-lg">Active Recurring Profiles</h3>
                    <button onClick={() => loadRecurring()} className="text-primary hover:text-primary-hover transition-colors">
                        <span className="material-symbols-outlined">refresh</span>
                    </button>
                </div>
                
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : recurring.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-12">
                        <div className="bg-gray-100 dark:bg-surface-dark p-4 rounded-full mb-4">
                            <span className="material-symbols-outlined text-gray-400 text-3xl">event_repeat</span>
                        </div>
                        <h3 className="text-lg font-medium mb-2">No recurring transactions</h3>
                        <p className="text-gray-500 dark:text-text-secondary max-w-md mx-auto text-center">
                            Set up recurring payments like rent or subscriptions when adding a new transaction.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 dark:bg-surface-dark/50 text-gray-500 type-xs uppercase font-semibold sticky top-0">
                                <tr>
                                    <th className="px-6 py-4">Description</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Interval</th>
                                    <th className="px-6 py-4">Next Run</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-border-dark">
                                {recurring.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-surface-dark/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.type === 'INCOME' ? 'bg-primary/20 text-primary-hover' : 'bg-red-100 text-red-600'}`}>
                                                    <span className="material-symbols-outlined text-sm">{item.type === 'INCOME' ? 'arrow_downward' : 'arrow_upward'}</span>
                                                </div>
                                                <div>
                                                    <div className="font-medium">{item.description}</div>
                                                    <div className="text-xs text-gray-500">{item.category?.name || 'Uncategorized'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 font-bold ${item.type === 'INCOME' ? 'text-green-600 dark:text-primary' : 'text-gray-900 dark:text-white'}`}>
                                            {item.type === 'EXPENSE' ? '-' : '+'}${item.amount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium">
                                                {item.interval}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(item.nextRun).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                                                title="Stop/Delete"
                                            >
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecurringTransactions;
