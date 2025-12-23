import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { formatCurrency } from '../utils/formatUtils';

interface DashboardStats {
    income: number;
    expense: number;
    balance: number;
    incomeDiff: number;
    expenseDiff: number;
    balanceDiff: number;
}

interface ExpenseBreakdownItem {
    name: string;
    value: number;
    percentage: number;
    color?: string; // Optional for UI mapping
}

/* Helper to map category names to colors - could be dynamic later */
const getCategoryColorClass = (index: number) => {
    const classes = ['bg-[#2bee6c]', 'bg-[#34d399]', 'bg-[#059669]', 'bg-[#9ca3af]', 'bg-[#f59e0b]'];
    return classes[index % classes.length];
};



const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<DashboardStats>({
        income: 0,
        expense: 0,
        balance: 0,
        incomeDiff: 0,
        expenseDiff: 0,
        balanceDiff: 0
    });
    const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
    const [expenseBreakdown, setExpenseBreakdown] = useState<ExpenseBreakdownItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const data = await api.get('/dashboard');
                setStats(data.stats);
                setRecentTransactions(data.recentTransactions);
                setExpenseBreakdown(data.expenseBreakdown);
            } catch (error) {
                console.error('Failed to load dashboard data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const formatPercentage = (val: number) => {
        const sign = val >= 0 ? '+' : '';
        return `${sign}${val.toFixed(1)}%`;
    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="size-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 animate-fade-in-up">
            {/* Page Header */}
            <div className="flex flex-col justify-between items-start gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ikhtisar Keuangan</h1>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">Selamat datang kembali, berikut ringkasan keuangan Anda hari ini.</p>
                </div>
                <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                    <div className="relative min-w-[200px]">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">
                            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                        </div>
                        <select aria-label="Pilih Rentang Waktu" title="Pilih Rentang Waktu" className="block w-full rounded-lg border-gray-200 bg-white py-2.5 pl-10 pr-8 text-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-[#162b1e] dark:text-white">
                            <option>30 Hari Terakhir</option>
                            <option>Kuartal Ini</option>
                            <option>Tahun Lalu</option>
                        </select>
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 dark:border-border-dark dark:bg-[#162b1e] dark:text-white dark:hover:bg-white/5">
                        <span className="material-symbols-outlined text-[20px]">download</span>
                        Ekspor
                    </button>
                    <button 
                        onClick={() => navigate('/add-transaction')}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-primary-hover shadow-lg shadow-primary/20"
                    >
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        Tambah Transaksi
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Total Balance */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-border-dark dark:bg-card-dark transition-all hover:shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-600 dark:text-text-secondary">Total Saldo</p>
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                        </div>
                    </div>
                    <p className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.balance)}</p>
                    <div className={`flex items-center gap-1 text-sm font-medium ${stats.balanceDiff >= 0 ? 'text-primary' : 'text-red-500'}`}>
                        <span className="material-symbols-outlined text-[16px]">{stats.balanceDiff >= 0 ? 'trending_up' : 'trending_down'}</span>
                        <span>{formatPercentage(stats.balanceDiff)}</span>
                        <span className="ml-1 font-normal text-gray-600 dark:text-gray-400">vs bulan lalu</span>
                    </div>
                </div>

                {/* Total Income */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-border-dark dark:bg-card-dark transition-all hover:shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-600 dark:text-text-secondary">Pemasukan</p>
                        <div className="rounded-lg bg-green-500/10 p-2 text-green-500">
                            <span className="material-symbols-outlined text-[20px]">payments</span>
                        </div>
                    </div>
                    <p className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.income)}</p>
                    <div className={`flex items-center gap-1 text-sm font-medium ${stats.incomeDiff >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <span className="material-symbols-outlined text-[16px]">{stats.incomeDiff >= 0 ? 'trending_up' : 'trending_down'}</span>
                        <span>{formatPercentage(stats.incomeDiff)}</span>
                        <span className="ml-1 font-normal text-gray-600 dark:text-gray-400">vs bulan lalu</span>
                    </div>
                </div>

                {/* Total Expense */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-border-dark dark:bg-card-dark transition-all hover:shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-600 dark:text-text-secondary">Pengeluaran</p>
                        <div className="rounded-lg bg-red-500/10 p-2 text-red-500">
                            <span className="material-symbols-outlined text-[20px]">credit_card</span>
                        </div>
                    </div>
                    <p className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.expense)}</p>
                    <div className={`flex items-center gap-1 text-sm font-medium ${stats.expenseDiff <= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <span className="material-symbols-outlined text-[16px]">{stats.expenseDiff <= 0 ? 'trending_down' : 'trending_up'}</span>
                        <span>{formatPercentage(stats.expenseDiff)}</span>
                        <span className="ml-1 font-normal text-gray-600 dark:text-gray-400">vs bulan lalu</span>
                    </div>
                </div>

                {/* Burn Rate */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-border-dark dark:bg-card-dark transition-all hover:shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-600 dark:text-text-secondary">Pengeluaran Harian</p>
                        <div className="rounded-lg bg-orange-500/10 p-2 text-orange-500">
                            <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
                        </div>
                    </div>
                    <p className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(stats.expense / 30)}<span className="text-lg font-medium text-gray-500">/hari</span>
                    </p>
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-text-secondary">
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                        <span>0.5%</span>
                        <span className="ml-1 font-normal text-gray-600 dark:text-gray-400">stabil</span>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Cash Flow Chart (Takes 2 cols) */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-border-dark dark:bg-[#162b1e] lg:col-span-2">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Arus Kas</h3>
                            <p className="text-sm text-gray-600 dark:text-text-secondary">Pemasukan vs Pengeluaran (6 Bulan Terakhir)</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="flex items-center gap-2 text-xs font-medium dark:text-white">
                                <span className="size-2 rounded-full bg-primary"></span> Pemasukan
                            </span>
                            <span className="flex items-center gap-2 text-xs font-medium dark:text-white">
                                <span className="size-2 rounded-full bg-gray-500"></span> Pengeluaran
                            </span>
                        </div>
                    </div>
                    <div className="h-64 w-full flex items-center justify-center text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-black/10 rounded-lg border border-dashed border-gray-200 dark:border-border-dark">
                        <p>Grafik akan segera hadir dengan integrasi Recharts</p>
                    </div>
                </div>

                {/* Expense Breakdown (Donut) */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-border-dark dark:bg-card-dark">
                    <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">Rincian Pengeluaran</h3>
                    {expenseBreakdown.length > 0 ? (
                        <>
                            <div className="relative mb-8 flex items-center justify-center">
                                {/* Simple CSS Ring for visual demo, replace with real chart lib */}
                                <div className="size-48 rounded-full border-[16px] border-primary/20 dark:border-primary/10 relative">
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.expense)}</span>
                                        <span className="text-xs text-gray-500 dark:text-text-secondary">Total</span>
                                    </div>
                                </div>
                            </div>
                            {/* Legend */}
                            <div className="space-y-3">
                                {expenseBreakdown.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <span 
                                                className={`size-3 rounded-full ${getCategoryColorClass(idx)}`}
                                            ></span>
                                            <span className="text-gray-700 dark:text-gray-200 truncate max-w-[120px]">{item.name}</span>
                                        </div>
                                        <span className="font-bold text-gray-900 dark:text-white">{item.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex h-64 items-center justify-center text-gray-500">Tidak ada data pengeluaran</div>
                    )}
                </div>
            </div>

            {/* Bottom Section: Transactions & Upcoming */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Recent Transactions Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-border-dark dark:bg-[#162b1e] lg:col-span-2">
                    <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-border-dark">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Transaksi Terkini</h3>
                        <button 
                            onClick={() => navigate('/transactions')} 
                            className="text-sm font-medium text-primary hover:text-primary-hover"
                        >
                            Lihat Semua
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500 dark:border-border-dark dark:bg-black/20 dark:text-text-secondary">
                                    <th className="px-6 py-4 font-semibold">Entitas</th>
                                    <th className="px-6 py-4 font-semibold">Tanggal</th>
                                    <th className="px-6 py-4 font-semibold">Kategori</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 text-right font-semibold">Jumlah</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-border-dark">
                                {recentTransactions.map((t) => (
                                    <tr key={t.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`flex size-8 items-center justify-center rounded-full text-xs font-bold ${t.type === 'INCOME' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                                    {t.merchant ? t.merchant.charAt(0).toUpperCase() : '?'}
                                                </div>
                                                <span className="font-medium text-gray-900 dark:text-white">{t.merchant || 'Tidak Diketahui'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {new Date(t.date).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {t.category?.name || 'Tanpa Kategori'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1 rounded-full border border-green-500/20 bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 text-right font-medium ${t.type === 'INCOME' ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>
                                            {t.type === 'EXPENSE' ? '-' : '+'}{formatCurrency(t.amount)}
                                        </td>
                                    </tr>
                                ))}
                                {recentTransactions.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Tidak ada transaksi terkini ditemukan.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Upcoming Payments (Static for now) */}
                <div className="flex flex-col gap-6">
                    <div className="h-full rounded-xl border border-gray-200 bg-white p-6 dark:border-border-dark dark:bg-[#162b1e]">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tagihan Mendatang</h3>
                            <button className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5">
                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                            </button>
                        </div>
                        <div className="space-y-4">
                            {/* Payment Item */}
                            <div className="flex items-center gap-4 rounded-lg border border-gray-100 bg-gray-50 p-3 transition-colors hover:border-primary/50 dark:border-border-dark dark:bg-black/20">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white dark:border-border-dark dark:bg-[#162b1e]">
                                    <div className="text-xs font-bold text-gray-600 dark:text-gray-300">AD</div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold text-gray-900 dark:text-white">Adobe Creative Cloud</p>
                                    <p className="text-xs font-medium text-red-500">Jatuh Tempo Besok</p>
                                </div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">Rp 850.000</p>
                            </div>
                            {/* Payment Item */}
                            <div className="flex items-center gap-4 rounded-lg border border-gray-100 bg-gray-50 p-3 transition-colors hover:border-primary/50 dark:border-border-dark dark:bg-black/20">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white dark:border-border-dark dark:bg-[#162b1e]">
                                    <div className="text-xs font-bold text-gray-600 dark:text-gray-300">Kan</div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold text-gray-900 dark:text-white">Sewa Kantor - Nov</p>
                                    <p className="text-xs text-gray-500 dark:text-text-secondary">Jatuh Tempo 5 Hari</p>
                                </div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">Rp 5.000.000</p>
                            </div>
                        </div>
                        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-2 text-sm font-medium text-gray-500 transition-colors hover:border-primary hover:text-primary dark:border-border-dark">
                            <span className="material-symbols-outlined text-[18px]">add_circle</span>
                            Jadwalkan Pembayaran
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
