import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { exportToCSV } from '../utils/export';
import { formatCurrency } from '../utils/formatUtils';
import PaymentModal from '../components/modals/PaymentModal';

const Transactions: React.FC = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [paymentModal, setPaymentModal] = useState<{
        isOpen: boolean;
        transactionId: string;
        amount: number;
        description: string;
    }>({
        isOpen: false,
        transactionId: '',
        amount: 0,
        description: ''
    });

    // Client-side filtering state
    const [filterType, setFilterType] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Derived filtered transactions
    const filteredTransactions = transactions.filter(t => {
        // 1. Filter by Type/Status
        if (filterType !== 'All') {
            if (filterType === 'Income' && t.type !== 'INCOME') return false;
            if (filterType === 'Expense' && t.type !== 'EXPENSE') return false;
            if (filterType === 'Pending' && t.status !== 'PENDING') return false;
        }
        
        // 2. Filter by Search Query (Description or Amount)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchDescription = t.description?.toLowerCase().includes(query);
            const matchMerchant = t.merchant?.toLowerCase().includes(query);
            const matchAmount = t.amount.toString().includes(query);
            if (!matchDescription && !matchMerchant && !matchAmount) return false;
        }

        return true;
    });

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            const data = await api.get('/transactions');
            setTransactions(data);
        } catch (error) {
            console.error('Failed to load transactions', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
            try {
                await api.delete(`/transactions/${id}`);
                loadTransactions();
            } catch (error) {
                console.error('Failed to delete transaction', error);
                alert('Gagal menghapus transaksi');
            }
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-background-light font-display text-slate-900 transition-colors dark:bg-background-dark dark:text-white">
            {/* Top Navigation - Specific to Transactions Page for 1:1 match */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-border-dark bg-white dark:bg-[#112217] px-4 py-3 md:px-10">
                <div className="flex items-center gap-4 text-slate-900 dark:text-white">
                    <div className="flex size-8 items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[32px]">
                            account_balance_wallet
                        </span>
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-white">FinancePro</h2>
                </div>
                <div className="flex flex-1 justify-end gap-8">
                    <div className="hidden items-center gap-9 md:flex">
                        <a
                            className="text-sm font-medium leading-normal text-slate-500 hover:text-slate-900 dark:text-text-secondary transition-colors dark:hover:text-white"
                            href="/"
                        >
                            Dasbor
                        </a>
                        <a className="text-sm font-medium leading-normal text-slate-900 dark:text-white" href="/transactions">
                            Transaksi
                        </a>
                        <a
                            className="text-sm font-medium leading-normal text-slate-500 hover:text-slate-900 dark:text-text-secondary transition-colors dark:hover:text-white"
                            href="/reports"
                        >
                            Laporan
                        </a>
                        <a
                            className="text-sm font-medium leading-normal text-slate-500 hover:text-slate-900 dark:text-text-secondary transition-colors dark:hover:text-white"
                            href="/settings"
                        >
                            Pengaturan
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-slate-500 hover:text-slate-900 dark:text-text-secondary dark:hover:text-white">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                            <img
                                className="size-10 rounded-full border border-slate-200 dark:border-border-dark object-cover"
                                title="Profil Pengguna"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe487hKvQgptzUVAvR6yv5Myr8v6VFNJaPUhI81f0P-zV9kucscd9Pyb3QaYIbraO0J1ktJDjuxMmU3JvQ4_dPzSMb04r6ijHlC2Fs0wqLUxqEm3FAsI0Zm9XQUusOAvqVn_FJwS6bx0mRapXcEw4W80576Uo3F-DSYnYiMt2nL3QprzFzT5PSk0FSOTdQljIDEYUMHLmN_lpM8atzk3u27qb0m4p20gUhg07f6QAg1W3Oe72P5QyvIwRSXU55dU6Ybmlo2GQgNic"
                                alt="Profil Pengguna"
                            />
                    </div>
                </div>
            </header>

            {/* Main Content Layout */}
            <div className="layout-container flex h-full grow flex-col">
                <div className="flex flex-1 justify-center px-4 py-8 md:px-12 lg:px-40">
                    <div className="layout-content-container flex w-full max-w-[1200px] flex-1 flex-col">
                        {/* Page Heading & Primary Actions */}
                        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-slate-900 dark:text-white">
                                    Transaksi
                                </h1>
                                <p className="text-base font-normal leading-normal text-slate-500 dark:text-text-secondary">
                                    Kelola dan lacak semua pergerakan keuangan Anda
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => exportToCSV(transactions, 'my-transactions')}
                                    className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark px-4 text-sm font-bold leading-normal tracking-[0.015em] text-slate-900 dark:text-white transition-colors hover:bg-slate-50 dark:hover:bg-[#2a4535]"
                                >
                                    <span className="material-symbols-outlined text-lg">download</span>
                                    <span className="truncate">Ekspor CSV</span>
                                </button>
                                <button 
                                    onClick={() => navigate('/add-transaction')}
                                    className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-[#112217] shadow-[0_0_15px_rgba(43,238,108,0.3)] transition-colors hover:bg-[#25cc5d]"
                                >
                                    <span className="material-symbols-outlined text-lg">add</span>
                                    <span className="truncate">Tambah Transaksi</span>
                                </button>
                            </div>
                        </div>

                        {/* Tabs & Filters Container */}
                        <div className="mb-6 rounded-xl border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-surface-dark/30 p-1">
                            <div className="flex flex-col justify-between gap-4 p-3 lg:flex-row lg:items-center xl:items-start">
                                {/* Tabs */}
                                <div className="scrollbar-hide flex w-full gap-2 overflow-x-auto pb-2 lg:w-auto lg:pb-0">
                                    {[
                                        { id: 'All', label: 'Semua' },
                                        { id: 'Income', label: 'Pemasukan' },
                                        { id: 'Expense', label: 'Pengeluaran' },
                                        { id: 'Pending', label: 'Tertunda' }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setFilterType(tab.id)}
                                            className={`flex items-center justify-center rounded-lg px-4 py-2 transition-all ${
                                                filterType === tab.id
                                                    ? 'bg-primary text-[#112217] shadow-lg shadow-primary/20'
                                                    : 'bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark text-slate-900 dark:text-white shadow-sm hover:border-primary/50'
                                            }`}
                                        >
                                            <p className="text-sm font-bold leading-normal tracking-[0.015em]">{tab.label}</p>
                                        </button>
                                    ))}
                                </div>
                                {/* Search & Dropdown Filters */}
                                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                                    {/* Search */}
                                    <div className="relative flex-1 sm:min-w-[280px]">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-text-secondary">
                                            <span className="material-symbols-outlined text-[20px]">search</span>
                                        </div>
                                        <input
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="block h-10 w-full rounded-lg border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark py-2 pl-10 pr-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm"
                                            placeholder="Cari deskripsi atau ID..."
                                            type="text"
                                        />
                                    </div>
                                    {/* Filter Dropdowns */}
                                    <div className="flex gap-3">
                                        <button className="flex h-10 min-w-[120px] items-center justify-between gap-2 rounded-lg border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark px-3 py-2 text-sm text-slate-700 dark:text-white transition-colors hover:border-primary/50">
                                            <span className="truncate">Bulan Ini</span>
                                            <span className="material-symbols-outlined text-[18px] text-slate-400 dark:text-text-secondary">
                                                calendar_today
                                            </span>
                                        </button>
                                        <button className="flex h-10 min-w-[120px] items-center justify-between gap-2 rounded-lg border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark px-3 py-2 text-sm text-slate-700 dark:text-white transition-colors hover:border-primary/50">
                                            <span className="truncate">Semua Kategori</span>
                                            <span className="material-symbols-outlined text-[18px] text-slate-400 dark:text-text-secondary">
                                                filter_list
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="w-full overflow-hidden rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark/20 backdrop-blur-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-left">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-surface-dark/80">
                                            <th className="w-[140px] whitespace-nowrap px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-text-secondary">
                                                Tanggal
                                            </th>
                                            <th className="whitespace-nowrap px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-text-secondary">
                                                Deskripsi
                                            </th>
                                            <th className="w-[180px] whitespace-nowrap px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-text-secondary">
                                                Kategori
                                            </th>
                                            <th className="w-[180px] whitespace-nowrap px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-text-secondary">
                                                Akun
                                            </th>
                                            <th className="w-[140px] whitespace-nowrap px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-text-secondary">
                                                Jumlah
                                            </th>
                                            <th className="w-[120px] whitespace-nowrap px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-text-secondary">
                                                Status
                                            </th>
                                            <th className="w-[60px] px-6 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-border-dark">
                                        {loading ? (
                                             <tr>
                                                <td colSpan={7} className="px-6 py-8 text-center text-slate-500">Memuat transaksi...</td>
                                            </tr>
                                        ) : filteredTransactions.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="px-6 py-8 text-center text-slate-500">Tidak ada transaksi ditemukan.</td>
                                            </tr>
                                        ) : (
                                            filteredTransactions.map((transaction) => (
                                                <tr key={transaction.id} className="group transition-colors hover:bg-slate-50 dark:hover:bg-surface-dark/50">
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900 dark:text-white">
                                                        {new Date(transaction.date).toLocaleDateString('id-ID')}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                                                {transaction.description || 'Tanpa Deskripsi'}
                                                            </span>
                                                            <span className="text-xs text-slate-500 dark:text-text-secondary">
                                                                {transaction.merchant ? transaction.merchant : 'Merchant Tidak Diketahui'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 dark:text-text-secondary">
                                                        <span className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5 px-2 py-1 text-xs">
                                                            {transaction.category?.name || 'Tanpa Kategori'}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900 dark:text-white">
                                                        {transaction.account || 'Akun Utama'}
                                                    </td>
                                                    <td className={`whitespace-nowrap px-6 py-4 text-right text-sm font-bold ${transaction.type === 'INCOME' ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                                                        {transaction.type === 'INCOME' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-center">
                                                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                                                            transaction.status === 'COMPLETED' ? 'border-primary/20 bg-primary/10 text-primary' :
                                                            transaction.status === 'PENDING' ? 'border-yellow-500/20 bg-yellow-500/10 text-yellow-500' :
                                                            'border-red-500/20 bg-red-500/10 text-red-500'
                                                        }`}>
                                                            <span className={`size-1.5 rounded-full ${
                                                                transaction.status === 'COMPLETED' ? 'bg-primary' :
                                                                transaction.status === 'PENDING' ? 'bg-yellow-500 animate-pulse' :
                                                                'bg-red-400'
                                                            }`}></span>
                                                            {transaction.status === 'COMPLETED' ? 'SELESAI' : transaction.status === 'PENDING' ? 'TERTUNDA' : 'GAGAL'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            {transaction.status === 'PENDING' && (
                                                                <button
                                                                    onClick={() => setPaymentModal({
                                                                        isOpen: true,
                                                                        transactionId: transaction.id,
                                                                        amount: transaction.amount,
                                                                        description: transaction.description || 'Pembayaran Transaksi'
                                                                    })}
                                                                    className="text-primary hover:text-primary-hover transition-colors"
                                                                    title="Bayar Sekarang"
                                                                >
                                                                    <span className="material-symbols-outlined text-[20px]">
                                                                        credit_card
                                                                    </span>
                                                                </button>
                                                            )}
                                                            <button 
                                                                onClick={() => handleDelete(transaction.id)}
                                                                className="text-slate-400 dark:text-text-secondary opacity-0 transition-opacity hover:text-red-500 dark:hover:text-red-400 group-hover:opacity-100"
                                                                title="Hapus Transaksi"
                                                            >
                                                                <span className="material-symbols-outlined text-[20px]">
                                                                    delete
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination */}
                            <div className="flex items-center justify-between border-t border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-500 dark:text-text-secondary">Baris per halaman:</span>
                                    <div className="relative">
                                        <select aria-label="Baris per halaman" title="Baris per halaman" className="h-8 rounded border-slate-200 dark:border-border-dark bg-white dark:bg-background-dark pl-2 pr-8 text-sm text-slate-900 dark:text-white focus:border-primary focus:ring-0">
                                            <option>10</option>
                                            <option>20</option>
                                            <option>50</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-text-secondary">
                                    <span>{filteredTransactions.length > 0 ? `1-${Math.min(filteredTransactions.length, 10)}` : '0'} dari {filteredTransactions.length}</span>
                                    <div className="flex items-center gap-1">
                                        <button
                                            className="flex h-8 w-8 items-center justify-center rounded text-slate-400 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-50"
                                            disabled
                                        >
                                            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                        </button>
                                        <button className="flex h-8 w-8 items-center justify-center rounded text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5">
                                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PaymentModal
                isOpen={paymentModal.isOpen}
                onClose={() => setPaymentModal({ ...paymentModal, isOpen: false })}
                transactionId={paymentModal.transactionId}
                amount={paymentModal.amount}
                description={paymentModal.description}
                onSuccess={() => {
                    loadTransactions(); // Refresh list to see updated status
                }}
            />
        </div>
    );

};

export default Transactions;
