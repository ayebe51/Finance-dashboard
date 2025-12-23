import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChartOfAccounts: React.FC = () => {
    const navigate = useNavigate();
    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
        '1000': true,
        '1100': true,
    });

    const toggleRow = (code: string) => {
        setExpandedRows(prev => ({
            ...prev,
            [code]: !prev[code]
        }));
    };

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-hidden">
            {/* Settings Sidebar - Specific to this page to match HTML layout */}
            <aside className="hidden lg:flex flex-col w-72 h-full border-r border-gray-200 dark:border-white/5 bg-white dark:bg-background-dark shrink-0">
                <div className="p-6 flex flex-col gap-1">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')} title="Kembali ke Dasbor">
                        <span className="material-symbols-outlined text-primary">arrow_back</span>
                        <h1 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">FinancePro</h1>
                    </div>
                    <p className="text-primary/80 text-xs font-medium uppercase tracking-wider pl-8">Admin Dashboard</p>
                </div>
                <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
                     {/* Inactive Items */}
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group" href="#">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">domain</span>
                        <span className="text-sm font-medium">Profil Perusahaan</span>
                    </a>
                    {/* Active Item */}
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary border-l-4 border-primary transition-all" href="#">
                        <span className="material-symbols-outlined text-[24px]">bar_chart</span>
                        <span className="text-sm font-semibold">Bagan Akun</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group" href="/bank-accounts">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">account_balance</span>
                        <span className="text-sm font-medium">Akun Bank</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group" href="/users-and-roles">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">group</span>
                        <span className="text-sm font-medium">Pengguna & Peran</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group" href="/notifications">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">notifications</span>
                        <span className="text-sm font-medium">Notifikasi</span>
                    </a>
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-white/5">
                    <div className="flex items-center gap-3 px-3 py-2">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-emerald-800 flex items-center justify-center text-white text-xs font-bold">JD</div>
                        <div className="flex flex-col">
                            <p className="text-gray-900 dark:text-white text-sm font-semibold">Jane Doe</p>
                            <p className="text-gray-500 dark:text-slate-400 text-xs">Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-light dark:bg-[#121c16]">
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-white/5">
                    <div className="flex items-center gap-2">
                        <button className="text-gray-900 dark:text-white p-1" onClick={() => navigate('/')}>
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h1 className="text-gray-900 dark:text-white font-bold">FinancePro</h1>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
                    <div className="max-w-[1200px] mx-auto p-6 md:p-10 flex flex-col gap-6">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center text-sm font-medium text-gray-500 dark:text-[#92c9a4]">
                            <a className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/settings')}>Pengaturan</a>
                            <span className="mx-2">/</span>
                            <a className="hover:text-primary transition-colors cursor-pointer">Keuangan</a>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900 dark:text-white">Bagan Akun</span>
                        </nav>

                        {/* Page Heading */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 dark:border-[#23482f] pb-6">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Bagan Akun</h2>
                                <p className="text-gray-500 dark:text-[#92c9a4]">Kelola struktur akun keuangan organisasi dan hierarkinya.</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center justify-center h-10 px-4 rounded-lg bg-gray-100 dark:bg-[#1c3624] hover:bg-gray-200 dark:hover:bg-[#23482f] border border-gray-200 dark:border-[#23482f] text-gray-700 dark:text-white text-sm font-bold transition-all gap-2">
                                    <span className="material-symbols-outlined text-[20px]">ios_share</span>
                                    Ekspor
                                </button>
                            </div>
                        </div>

                        {/* Toolbar & Actions */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex gap-2 w-full md:w-auto">
                                {/* Search */}
                                <div className="relative group w-full md:w-80">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-gray-400 dark:text-[#92c9a4] text-[20px]">search</span>
                                    </div>
                                    <input 
                                        aria-label="Search Accounts"
                                        title="Search Accounts"
                                        className="block w-full pl-10 pr-3 h-10 bg-white dark:bg-[#1c3624] border border-gray-200 dark:border-[#23482f] rounded-lg leading-5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#92c9a4] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all" 
                                        placeholder="Cari berdasarkan nama atau kode..." 
                                        type="text"
                                    />
                                </div>
                                {/* Filter */}
                                <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#1c3624] border border-gray-200 dark:border-[#23482f] text-gray-500 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-[#92c9a4] transition-colors" title="Filter list">
                                    <span className="material-symbols-outlined text-[20px]">filter_list</span>
                                </button>
                            </div>
                            <button className="flex items-center justify-center h-10 px-5 rounded-lg bg-primary hover:bg-[#25d360] text-[#0a160f] font-bold text-sm gap-2 transition-colors w-full md:w-auto shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                Tambah Akun Baru
                            </button>
                        </div>

                        {/* Data Table (Tree Grid) */}
                        <div className="bg-white dark:bg-[#1c3624] border border-gray-200 dark:border-[#23482f] rounded-xl overflow-hidden shadow-xl">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-[#1c3326] border-b border-gray-200 dark:border-[#23482f] text-gray-500 dark:text-[#92c9a4] text-xs uppercase tracking-wider font-semibold">
                                            <th className="px-6 py-4 w-48 font-bold text-gray-700 dark:text-white">Kode Akun</th>
                                            <th className="px-6 py-4">Nama Akun</th>
                                            <th className="px-6 py-4 w-32">Tipe</th>
                                            <th className="px-6 py-4 w-24 text-right">Pajak</th>
                                            <th className="px-6 py-4 w-40 text-right">Saldo YTD</th>
                                            <th className="px-6 py-4 w-20 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {/* Row 1: Parent (Assets) */}
                                        <tr className="group border-b border-gray-100 dark:border-[#23482f]/50 hover:bg-gray-50 dark:hover:bg-[#23482f]/30 transition-colors cursor-pointer" onClick={() => toggleRow('1000')}>
                                            <td className="px-6 py-3 font-mono text-gray-500 dark:text-[#92c9a4] font-medium">1000</td>
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-2">
                                                    <button className={`text-gray-500 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white transition-transform duration-200 ${expandedRows['1000'] ? 'rotate-0' : '-rotate-90'}`}>
                                                        <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                                    </button>
                                                    <span className="font-bold text-gray-900 dark:text-white text-base">Aset</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-gray-500 dark:text-[#92c9a4]">Aset</td>
                                            <td className="px-6 py-3 text-right text-gray-500 dark:text-[#92c9a4]">-</td>
                                            <td className="px-6 py-3 text-right font-mono font-medium text-primary">$1,240,500.00</td>
                                            <td className="px-6 py-3 text-center">
                                                <button className="text-gray-400 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white p-1 rounded-md hover:bg-gray-100 dark:hover:bg-[#23482f]">
                                                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                                                </button>
                                            </td>
                                        </tr>

                                        {expandedRows['1000'] && (
                                            <>
                                                {/* Row 1.1: Child (Current Assets) */}
                                                <tr className="group border-b border-gray-100 dark:border-[#23482f]/50 hover:bg-gray-50 dark:hover:bg-[#23482f]/30 transition-colors" onClick={(e) => { e.stopPropagation(); toggleRow('1100'); }}>
                                                    <td className="px-6 py-3 font-mono text-gray-500 dark:text-[#92c9a4]">1100</td>
                                                    <td className="px-6 py-3">
                                                        <div className="flex items-center gap-2 pl-8 relative">
                                                            {/* Visual Hierarchy Guide Line */}
                                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-px bg-gray-200 dark:bg-[#23482f]"></div>
                                                            <div className="absolute left-3 top-[-20px] bottom-1/2 w-px bg-gray-200 dark:bg-[#23482f]"></div>
                                                            <button className={`text-gray-500 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white transition-transform duration-200 ${expandedRows['1100'] ? 'rotate-0' : '-rotate-90'}`}>
                                                                <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                                            </button>
                                                            <span className="font-semibold text-gray-900 dark:text-white">Aset Lancar</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-3 text-gray-500 dark:text-[#92c9a4]">Aset</td>
                                                    <td className="px-6 py-3 text-right text-gray-500 dark:text-[#92c9a4]">-</td>
                                                    <td className="px-6 py-3 text-right font-mono text-gray-900 dark:text-white">$450,200.00</td>
                                                    <td className="px-6 py-3 text-center">
                                                        <button className="text-gray-400 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white p-1 rounded-md hover:bg-gray-100 dark:hover:bg-[#23482f]">
                                                            <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                                                        </button>
                                                    </td>
                                                </tr>

                                                {expandedRows['1100'] && (
                                                    <>
                                                        {/* Row 1.1.1: Grandchild (Cash) */}
                                                        <tr className="group border-b border-gray-100 dark:border-[#23482f]/50 hover:bg-gray-50 dark:hover:bg-[#23482f]/30 transition-colors">
                                                            <td className="px-6 py-3 font-mono text-gray-500 dark:text-[#92c9a4]">1110</td>
                                                            <td className="px-6 py-3">
                                                                <div className="flex items-center gap-2 pl-16 relative">
                                                                    {/* Visual Hierarchy Guide Line */}
                                                                    <div className="absolute left-11 top-1/2 -translate-y-1/2 w-4 h-px bg-gray-200 dark:bg-[#23482f]"></div>
                                                                    <div className="absolute left-11 top-[-20px] bottom-1/2 w-px bg-gray-200 dark:bg-[#23482f]"></div>
                                                                    <span className="w-5 h-5 flex items-center justify-center text-gray-400 dark:text-[#92c9a4]">
                                                                        <span className="material-symbols-outlined text-[16px]">subdirectory_arrow_right</span>
                                                                    </span>
                                                                    <span className="text-gray-600 dark:text-[#92c9a4] group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Kas Tunai</span>
                                                                    <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-primary/20 text-primary-dark dark:text-primary font-bold uppercase tracking-wide">Aktif</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-3 text-gray-500 dark:text-[#92c9a4]">Bank</td>
                                                            <td className="px-6 py-3 text-right text-gray-500 dark:text-[#92c9a4]">0%</td>
                                                            <td className="px-6 py-3 text-right font-mono text-gray-600 dark:text-[#92c9a4]">$12,500.00</td>
                                                            <td className="px-6 py-3 text-center">
                                                                <button className="text-gray-400 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white p-1 rounded-md hover:bg-gray-100 dark:hover:bg-[#23482f]">
                                                                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        {/* Row 1.1.2: Grandchild (Checking) */}
                                                        <tr className="group border-b border-gray-100 dark:border-[#23482f]/50 hover:bg-gray-50 dark:hover:bg-[#23482f]/30 transition-colors">
                                                            <td className="px-6 py-3 font-mono text-gray-500 dark:text-[#92c9a4]">1120</td>
                                                            <td className="px-6 py-3">
                                                                <div className="flex items-center gap-2 pl-16 relative">
                                                                    {/* Visual Hierarchy Guide Line */}
                                                                    <div className="absolute left-11 top-1/2 -translate-y-1/2 w-4 h-px bg-gray-200 dark:bg-[#23482f]"></div>
                                                                    <div className="absolute left-11 top-[-20px] bottom-0 w-px bg-gray-200 dark:bg-[#23482f]"></div>
                                                                    <span className="w-5 h-5 flex items-center justify-center text-gray-400 dark:text-[#92c9a4]">
                                                                        <span className="material-symbols-outlined text-[16px]">subdirectory_arrow_right</span>
                                                                    </span>
                                                                    <span className="text-gray-600 dark:text-[#92c9a4] group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Rekening Giro Bisnis</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-3 text-gray-500 dark:text-[#92c9a4]">Bank</td>
                                                            <td className="px-6 py-3 text-right text-gray-500 dark:text-[#92c9a4]">0%</td>
                                                            <td className="px-6 py-3 text-right font-mono text-gray-600 dark:text-[#92c9a4]">$437,700.00</td>
                                                            <td className="px-6 py-3 text-center">
                                                                <button className="text-gray-400 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white p-1 rounded-md hover:bg-gray-100 dark:hover:bg-[#23482f]">
                                                                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )}

                                            </>
                                        )}

                                        {/* Row 2: Parent (Liabilities) */}
                                        <tr className="group border-b border-gray-100 dark:border-[#23482f]/50 hover:bg-gray-50 dark:hover:bg-[#23482f]/30 transition-colors cursor-pointer">
                                            <td className="px-6 py-3 font-mono text-gray-500 dark:text-[#92c9a4] font-medium">2000</td>
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-2">
                                                    <button className="text-gray-500 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white">
                                                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                                    </button>
                                                    <span className="font-bold text-gray-900 dark:text-white text-base">Kewajiban</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-gray-500 dark:text-[#92c9a4]">Kewajiban</td>
                                            <td className="px-6 py-3 text-right text-gray-500 dark:text-[#92c9a4]">-</td>
                                            <td className="px-6 py-3 text-right font-mono font-medium text-gray-900 dark:text-white">$320,000.00</td>
                                            <td className="px-6 py-3 text-center">
                                                <button className="text-gray-400 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white p-1 rounded-md hover:bg-gray-100 dark:hover:bg-[#23482f]">
                                                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                                                </button>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination/Footer */}
                            <div className="px-6 py-4 border-t border-gray-200 dark:border-[#23482f] bg-gray-50 dark:bg-[#1c3326] flex items-center justify-between">
                                <p className="text-xs text-gray-500 dark:text-[#92c9a4]">Menampilkan 1 sampai 5 dari 45 entri</p>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 text-xs font-medium rounded bg-white dark:bg-[#23482f] border border-gray-200 dark:border-transparent text-gray-600 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1c3624] transition-colors">Sebelumnya</button>
                                    <button className="px-3 py-1 text-xs font-medium rounded bg-primary text-[#0a160f]">1</button>
                                    <button className="px-3 py-1 text-xs font-medium rounded bg-white dark:bg-[#23482f] border border-gray-200 dark:border-transparent text-gray-600 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1c3624] transition-colors">2</button>
                                    <button className="px-3 py-1 text-xs font-medium rounded bg-white dark:bg-[#23482f] border border-gray-200 dark:border-transparent text-gray-600 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1c3624] transition-colors">3</button>
                                    <button className="px-3 py-1 text-xs font-medium rounded bg-white dark:bg-[#23482f] border border-gray-200 dark:border-transparent text-gray-600 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1c3624] transition-colors">Selanjutnya</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ChartOfAccounts;
