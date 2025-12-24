
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCategoryModal from '../components/modals/AddCategoryModal';
import { api } from '../lib/api';

const Categories: React.FC = () => {
    const navigate = useNavigate();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');
    
    // Filter categories based on active tab
    const filteredCategories = categories.filter(category => category.type === activeTab);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await api.get('/categories');
            setCategories(data);
        } catch (error) {
            console.error('Failed to load categories', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col overflow-x-hidden">
            {/* Top Navigation - FinTrack Specific */}
            <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-border-dark bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm px-6 lg:px-10 py-3">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="size-8 text-primary">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor"></path>
                            <path clipRule="evenodd" d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z" fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">FinTrack</h2>
                </div>
                <nav className="hidden md:flex flex-1 justify-end gap-8">
                    <div className="flex items-center gap-9">
                        <a className="text-slate-500 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white text-sm font-medium leading-normal transition-colors cursor-pointer" onClick={() => navigate('/')}>Dashboard</a>
                        <a className="text-slate-500 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white text-sm font-medium leading-normal transition-colors cursor-pointer" onClick={() => navigate('/transactions')}>Transactions</a>
                        <a className="text-slate-500 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white text-sm font-medium leading-normal transition-colors cursor-pointer" onClick={() => navigate('/budget')}>Budgets</a>
                        <a className="text-slate-500 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white text-sm font-medium leading-normal transition-colors cursor-pointer" onClick={() => navigate('/reports')}>Reports</a>
                        <a className="text-slate-900 dark:text-white text-sm font-bold leading-normal cursor-pointer" onClick={() => navigate('/settings')}>Settings</a>
                    </div>
                    <img className="rounded-full size-10 border border-slate-200 dark:border-slate-700 object-cover" title="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmm9ckLr66kli_I_GLIgg1gJIR0PTkyPIiRUcaJoFn85UfruVjeoWNY7b1GXub0JuNbYNdbP-2WtBPKJCk6_pmW93P02pjZ03tK46Q456fSiMhzEZPpHa4gIqrG3mK9mxlHGHrmAd3t9l3xJ-gHRPs3hzSdrNIifYRCnpf4NjJtgFNVNBTOcxN2bi0BKsCf6xwVhUmZKzQjXJKnMdCB8djq4VuekKBU8-wxYHABaERvXG1UlTE5wUVFiYEuEnOgHL_Ysih7o4DGCs" alt="User Profile" />
                </nav>
            </header>

            <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div className="flex flex-col gap-2 max-w-2xl">
                        <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] text-slate-900 dark:text-white">Manajemen Kategori</h1>
                        <p className="text-slate-500 dark:text-text-secondary text-base font-normal leading-normal">
                            Kelola kategori pemasukan dan pengeluaran, lacak hierarki pengeluaran, dan atur struktur keuangan Anda dengan efisien.
                        </p>
                    </div>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-primary hover:bg-green-400 text-[#102216] text-sm font-bold leading-normal tracking-[0.015em] transition-colors shadow-lg shadow-green-500/20 whitespace-nowrap"
                    >
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        <span>Tambah Kategori Baru</span>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <label className="flex flex-col w-full h-14">
                        <div className="flex w-full flex-1 items-center rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-transparent overflow-hidden shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/50">
                            <div className="text-slate-400 dark:text-text-secondary flex items-center justify-center pl-4 pr-2">
                                <span className="material-symbols-outlined text-[24px]">search</span>
                            </div>
                            <input className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-text-secondary focus:ring-0 h-full text-base font-medium focus:outline-none" placeholder="Cari kategori, sub-kategori..." />
                        </div>
                    </label>
                </div>

                {/* Main Content Area: Tabs + List */}
                <div className="flex flex-col rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-slate-200 dark:border-border-dark">
                        <button 
                            onClick={() => setActiveTab('EXPENSE')}
                            className={`flex-1 md:flex-none md:w-48 flex items-center justify-center py-4 border-b-[3px] transition-colors ${activeTab === 'EXPENSE' ? 'border-primary bg-primary/5 dark:bg-transparent' : 'border-transparent hover:bg-slate-50 dark:hover:bg-surface-dark'}`}
                        >
                            <p className={`text-sm font-bold leading-normal tracking-[0.015em] ${activeTab === 'EXPENSE' ? 'text-primary' : 'text-slate-500 dark:text-text-secondary'}`}>Pengeluaran</p>
                        </button>
                        <button 
                            onClick={() => setActiveTab('INCOME')}
                            className={`flex-1 md:flex-none md:w-48 flex items-center justify-center py-4 border-b-[3px] transition-colors ${activeTab === 'INCOME' ? 'border-primary bg-primary/5 dark:bg-transparent' : 'border-transparent hover:bg-slate-50 dark:hover:bg-surface-dark'}`}
                        >
                            <p className={`text-sm font-bold leading-normal tracking-[0.015em] ${activeTab === 'INCOME' ? 'text-primary' : 'text-slate-500 dark:text-text-secondary'}`}>Pemasukan</p>
                        </button>
                    </div>

                    {/* List Header (Desktop Only) */}
                    <div className="hidden md:flex px-6 py-3 bg-slate-50 dark:bg-surface-dark border-b border-slate-200 dark:border-border-dark text-xs font-semibold text-slate-500 dark:text-text-secondary uppercase tracking-wider">
                        <div className="w-1/2">Nama Kategori</div>
                        <div className="w-1/4 text-right">Total Jumlah</div>
                        <div className="w-1/4 text-right pr-8">Transaksi</div>
                        <div className="w-12"></div>
                    </div>

                    {/* Accordion List */}
                    <div className="flex flex-col divide-y divide-slate-200 dark:divide-border-dark">
                        {loading ? (
                            <div className="p-8 text-center text-slate-500">Loading categories...</div>
                        ) : filteredCategories.length === 0 ? (
                            <div className="p-8 text-center text-slate-500">No {activeTab.toLowerCase()} categories found.</div>
                        ) : (
                            filteredCategories.map((category) => (
                                <details key={category.id} className="group open:bg-slate-50/50 dark:open:bg-surface-dark/30 transition-colors">
                                    <summary className="flex cursor-pointer items-center justify-between p-4 md:px-6 hover:bg-slate-50 dark:hover:bg-surface-dark transition-colors select-none list-none [&::-webkit-details-marker]:hidden">
                                        <div className="flex items-center gap-4 w-full md:w-1/2">
                                            <div className={`p-2 rounded-lg bg-${category.color || 'slate'}-100 text-${category.color || 'slate'}-600 dark:bg-${category.color || 'slate'}-500/20 dark:text-${category.color || 'slate'}-400`}>
                                                <span className="material-symbols-outlined text-[20px]">{category.icon || 'category'}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-slate-900 dark:text-white text-base font-bold">{category.name}</span>
                                                <span className="md:hidden text-xs text-slate-500 dark:text-text-secondary mt-1">
                                                    {category.type}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="hidden md:block w-1/4 text-right">
                                            <span className="text-slate-900 dark:text-white font-medium font-mono">-</span>
                                        </div>
                                        <div className="hidden md:block w-1/4 text-right pr-8">
                                            <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-border-dark text-slate-600 dark:text-text-secondary text-xs font-medium">
                                                -
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-slate-400 dark:text-text-secondary transition-transform duration-200 group-open:-rotate-180">
                                                <span className="material-symbols-outlined">expand_more</span>
                                            </div>
                                        </div>
                                    </summary>
                                    <div className="flex flex-col pl-4 md:pl-[4.5rem] pr-4 md:pr-6 pb-4 gap-1 animate-fade-in-down duration-200">
                                        {category.children && category.children.length > 0 ? (
                                            category.children.map((child: any) => (
                                                <div key={child.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-border-dark/50 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                       <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                                       <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{child.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-xs text-slate-500">-</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="py-2 text-sm text-slate-400 dark:text-text-secondary italic ml-3">No sub-categories.</div>
                                        )}
                                    </div>
                                </details>
                            ))
                        )}
                    </div>
                </div>
            </main>
            <AddCategoryModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        </div>
    );
};

export default Categories;
