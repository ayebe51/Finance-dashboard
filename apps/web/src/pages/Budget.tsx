import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { formatCurrency } from '../utils/formatUtils';

const Budget: React.FC = () => {
    const [budgets, setBudgets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBudgets();
    }, []);

    const loadBudgets = async () => {
        try {
            // For now, fetch all budgets. We might filter by period later.
            const data = await api.get('/budgets?period=Q3 2023'); 
            setBudgets(data);
        } catch (error) {
            console.error('Failed to load budgets', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
                <a className="text-text-secondary hover:text-white transition-colors" href="/">Beranda</a>
                <span className="text-text-secondary">/</span>
                <a className="text-text-secondary hover:text-white transition-colors" href="#">Keuangan</a>
                <span className="text-text-secondary">/</span>
                <span className="text-primary font-medium">Anggaran</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Perencanaan Anggaran - Q3 2023</h1>
                    <p className="text-gray-600 dark:text-text-secondary">Kelola alokasi dan lacak pengeluaran real-time terhadap target.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    {/* Period Selector */}
                    <div className="relative min-w-[160px]">
                        <select title="Select Budget Period" aria-label="Select Budget Period" className="appearance-none w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-gray-900 dark:text-white text-sm rounded-lg pl-4 pr-10 py-2.5 focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer outline-none">
                            <option>Q3 2023</option>
                            <option>Q2 2023</option>
                            <option>Q1 2023</option>
                            <option>FY 2022</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 dark:text-text-secondary">
                            <span className="material-symbols-outlined">expand_more</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Table Section */}
            <div className="flex flex-col gap-4 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden">
                <div className="p-5 border-b border-gray-200 dark:border-border-dark flex flex-wrap items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Budget vs. Actual</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-[#162b1d]">
                                <th className="p-4 text-xs font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wider w-[20%]">Kategori</th>
                                <th className="p-4 text-xs font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wider text-right">Alokasi</th>
                                <th className="p-4 text-xs font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wider text-right">Pengeluaran Aktual</th>
                                <th className="p-4 text-xs font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wider w-[25%]">Utilisasi</th>
                                <th className="p-4 text-xs font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wider text-right">Sisa</th>
                                <th className="p-4 text-xs font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wider text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-border-dark text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">Memuat anggaran...</td>
                                </tr>
                            ) : budgets.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">Tidak ada anggaran yang ditetapkan untuk periode ini.</td>
                                </tr>
                            ) : (
                                budgets.map((budget) => {
                                    // Placeholder for actual spend calculation.Ideally backend does this.
                                    const actualSpend = 0; 
                                    const utilization = (actualSpend / budget.amount) * 100;
                                    const remaining = budget.amount - actualSpend;

                                    return (
                                        <tr key={budget.id} className="hover:bg-gray-50 dark:hover:bg-border-dark/30 transition-colors group">
                                            <td className="p-4 font-medium text-gray-900 dark:text-white flex items-center gap-3">
                                                <div className="size-8 rounded bg-gray-200 dark:bg-border-dark flex items-center justify-center text-gray-600 dark:text-text-secondary">
                                                    <span className="material-symbols-outlined text-[18px]">{budget.category?.icon || 'category'}</span>
                                                </div>
                                                {budget.category?.name || 'Unknown'}
                                            </td>
                                            <td className="p-4 text-right text-gray-600 dark:text-text-secondary font-mono">{formatCurrency(budget.amount)}</td>
                                            <td className="p-4 text-right text-gray-900 dark:text-white font-mono font-medium">{formatCurrency(actualSpend)}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs text-gray-600 dark:text-text-secondary w-8">{utilization.toFixed(0)}%</span>
                                                    <div className="flex-1 h-2 bg-gray-200 dark:bg-border-dark rounded-full overflow-hidden">
                                                        {/* eslint-disable-next-line react-dom/no-unsafe-target-blank, @typescript-eslint/ban-ts-comment */ /* @ts-ignore -- Dynamic width requires inline style */}
                                                        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${Math.min(utilization, 100)}%` }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right text-primary font-mono font-medium">{formatCurrency(remaining)}</td>
                                            <td className="p-4 text-center">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                                                    {remaining >= 0 ? 'Sesuai Target' : 'Melebihi Anggaran'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Budget;
