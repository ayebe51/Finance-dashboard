import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuditLog: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-hidden">
            {/* Settings Sidebar */}
            <aside className="hidden lg:flex flex-col w-72 h-full border-r border-gray-200 dark:border-white/5 bg-white dark:bg-background-dark shrink-0">
                <div className="p-6 flex flex-col gap-1">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')} title="Kembali ke Dasbor">
                        <span className="material-symbols-outlined text-primary">arrow_back</span>
                        <h1 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">FinancePro</h1>
                    </div>
                    <p className="text-primary/80 text-xs font-medium uppercase tracking-wider pl-8">Admin Dashboard</p>
                </div>
                <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group" href="/settings">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">domain</span>
                        <span className="text-sm font-medium">Profil Perusahaan</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group" href="/chart-of-accounts">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">bar_chart</span>
                        <span className="text-sm font-medium">Bagan Akun</span>
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
                    {/* Active Item */}
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary border-l-4 border-primary transition-all" href="#">
                        <span className="material-symbols-outlined text-[24px] fill-1">history</span>
                        <span className="text-sm font-semibold">Log Audit</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group" href="/display-settings">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">palette</span>
                        <span className="text-sm font-medium">Tampilan</span>
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
            <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-light dark:bg-[#102216]">
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
                    <div className="max-w-7xl mx-auto p-6 md:p-10 flex flex-col gap-6">
                        {/* Breadcrumbs */}
                        <div className="flex flex-wrap gap-2 text-sm">
                            <a className="text-gray-500 dark:text-[#92c9a4] hover:text-primary font-medium transition-colors cursor-pointer" onClick={() => navigate('/settings')}>Pengaturan</a>
                            <span className="text-gray-500 dark:text-[#92c9a4] font-medium">/</span>
                            <span className="text-gray-900 dark:text-white font-medium">Log Audit</span>
                        </div>

                        {/* Page Heading & Primary Action */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Log Audit</h1>
                                <p className="text-gray-500 dark:text-[#92c9a4] text-base font-normal max-w-2xl">
                                    Lacak aktivitas sistem secara kronologis, pantau tindakan pengguna, dan pastikan kepatuhan dengan log acara yang terperinci.
                                </p>
                            </div>
                            <button className="flex shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-5 bg-primary hover:bg-[#22c55b] text-[#0a160f] text-sm font-bold leading-normal tracking-[0.015em] transition-all shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-[20px]">download</span>
                                <span className="truncate">Ekspor Log</span>
                            </button>
                        </div>

                        {/* Search & Filter Toolbar */}
                        <div className="flex flex-col xl:flex-row gap-4 bg-white/50 dark:bg-[#1a3322]/50 border border-gray-200 dark:border-[#23482f] p-4 rounded-xl">
                            {/* Search */}
                            <div className="flex-1 min-w-[300px]">
                                <label className="flex w-full items-stretch rounded-lg h-10 border border-gray-200 dark:border-[#23482f] bg-white dark:bg-[#112217] focus-within:border-primary transition-colors">
                                    <div className="text-gray-500 dark:text-[#92c9a4] flex items-center justify-center pl-3">
                                        <span className="material-symbols-outlined text-[20px]">search</span>
                                    </div>
                                    <input aria-label="Search Audit Log" title="Search Audit Log" className="flex w-full min-w-0 flex-1 bg-transparent text-gray-900 dark:text-white focus:outline-0 placeholder:text-gray-400 dark:placeholder:text-[#5e806a] px-3 text-sm font-normal" placeholder="Cari berdasarkan ID Tindakan, Pengguna, atau IP..." />
                                </label>
                            </div>
                            {/* Chips/Filters */}
                            <div className="flex flex-wrap gap-3 items-center">
                                <span className="text-xs font-semibold text-gray-500 dark:text-[#5e806a] uppercase tracking-wider mr-1">Filter berdasarkan:</span>
                                <button className="flex h-8 items-center gap-x-2 rounded-lg bg-white dark:bg-[#1a3322] border border-gray-200 dark:border-[#23482f] hover:border-primary/50 hover:text-gray-900 dark:hover:text-white px-3 transition-all group">
                                    <span className="text-gray-600 dark:text-[#92c9a4] group-hover:text-gray-900 dark:group-hover:text-white text-xs font-medium">Tanggal: 24 Okt - 25 Okt</span>
                                    <span className="material-symbols-outlined text-[16px] text-gray-400 dark:text-[#92c9a4] group-hover:text-gray-900 dark:group-hover:text-white">calendar_today</span>
                                </button>
                                <button className="flex h-8 items-center gap-x-2 rounded-lg bg-white dark:bg-[#1a3322] border border-gray-200 dark:border-[#23482f] hover:border-primary/50 hover:text-gray-900 dark:hover:text-white px-3 transition-all group">
                                    <span className="text-gray-600 dark:text-[#92c9a4] group-hover:text-gray-900 dark:group-hover:text-white text-xs font-medium">Tipe Acara</span>
                                    <span className="material-symbols-outlined text-[16px] text-gray-400 dark:text-[#92c9a4] group-hover:text-gray-900 dark:group-hover:text-white">expand_more</span>
                                </button>
                                <button className="flex h-8 items-center gap-x-2 rounded-lg bg-white dark:bg-[#1a3322] border border-gray-200 dark:border-[#23482f] hover:border-primary/50 hover:text-gray-900 dark:hover:text-white px-3 transition-all group">
                                    <span className="text-gray-600 dark:text-[#92c9a4] group-hover:text-gray-900 dark:group-hover:text-white text-xs font-medium">Tingkat Keparahan</span>
                                    <span className="material-symbols-outlined text-[16px] text-gray-400 dark:text-[#92c9a4] group-hover:text-gray-900 dark:group-hover:text-white">expand_more</span>
                                </button>
                                <button className="flex h-8 items-center gap-x-2 rounded-lg bg-white dark:bg-[#1a3322] border border-gray-200 dark:border-[#23482f] hover:border-primary/50 hover:text-gray-900 dark:hover:text-white px-3 transition-all group">
                                    <span className="text-gray-600 dark:text-[#92c9a4] group-hover:text-gray-900 dark:group-hover:text-white text-xs font-medium">Pengguna</span>
                                    <span className="material-symbols-outlined text-[16px] text-gray-400 dark:text-[#92c9a4] group-hover:text-gray-900 dark:group-hover:text-white">expand_more</span>
                                </button>
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-gray-400 dark:text-[#92c9a4] hover:text-primary transition-colors ml-auto xl:ml-0" title="Bersihkan Filter">
                                    <span className="material-symbols-outlined text-[20px]">restart_alt</span>
                                </button>
                            </div>
                        </div>

                        {/* Data Table Container */}
                        <div className="flex flex-col rounded-xl border border-gray-200 dark:border-[#23482f] bg-white dark:bg-[#112217] overflow-hidden shadow-sm">
                            <div className="overflow-x-auto custom-scrollbar">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-[#23482f] bg-gray-50/50 dark:bg-[#1a3322]/50">
                                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-[#92c9a4] uppercase tracking-wider whitespace-nowrap">Waktu</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-[#92c9a4] uppercase tracking-wider whitespace-nowrap">Pengguna</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-[#92c9a4] uppercase tracking-wider whitespace-nowrap">Tindakan</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-[#92c9a4] uppercase tracking-wider whitespace-nowrap">Sumber Daya</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-[#92c9a4] uppercase tracking-wider whitespace-nowrap">Alamat IP</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-[#92c9a4] uppercase tracking-wider whitespace-nowrap">Status</th>
                                            <th className="p-4 w-10"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-200 dark:divide-[#23482f]">
                                        {/* Row 1 */}
                                        <tr className="group hover:bg-gray-50 dark:hover:bg-[#1a3322] transition-colors">
                                            <td className="p-4 whitespace-nowrap text-gray-600 dark:text-[#92c9a4]">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-900 dark:text-white font-mono">24 Okt 2023</span>
                                                    <span className="text-xs opacity-70">14:32:05 UTC</span>
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <img className="size-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF_McA5TiOphxrnciQBrlUBwVVnQm8yPS9guWZY2vmouxrN4HXJ5ffI0-pIyIqcWW0YfG2BAs6VoavIYUIa7B1VHZVlTvHslJtJTZM65oU-4bPRHi37ffzv-Xuq-L7Ow2h0DYoNZYprUwZaVbkr-HGedlrewZzcKfSEprfnnLAY7q0J3F9FFJp0hvMQKGlrX9TeQhytKYXhHGLXK4dYrbuaDdczDDKWVxlloW5Zvz2FNF2NhsNtM8Rwi0o_-D3dRzjmr1GGXBdGeA" alt="Sarah Jenkins" />
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-900 dark:text-white">Sarah Jenkins</span>
                                                        <span className="text-xs text-gray-500 dark:text-[#92c9a4]">CFO</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <span className="text-gray-900 dark:text-white font-medium">Anggaran Diperbarui</span>
                                                <span className="block text-xs text-gray-500 dark:text-[#92c9a4] mt-0.5">Modifikasi Alokasi Q4</span>
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-gray-500 dark:text-[#92c9a4] font-mono text-xs">ID: BUD-2023-Q4</td>
                                            <td className="p-4 whitespace-nowrap text-gray-500 dark:text-[#92c9a4] font-mono text-xs">192.168.10.42</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                                                    <span className="size-1.5 rounded-full bg-green-500 dark:bg-green-400"></span>
                                                    Sukses
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="text-gray-400 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white p-1">
                                                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Row 2 */}
                                        <tr className="group hover:bg-gray-50 dark:hover:bg-[#1a3322] transition-colors">
                                            <td className="p-4 whitespace-nowrap text-gray-600 dark:text-[#92c9a4]">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-900 dark:text-white font-mono">24 Okt 2023</span>
                                                    <span className="text-xs opacity-70">12:05:11 UTC</span>
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-gray-100 dark:bg-[#1a3322] flex items-center justify-center text-gray-400 dark:text-[#92c9a4] border border-gray-200 dark:border-[#23482f]">
                                                        <span className="material-symbols-outlined text-[16px]">question_mark</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-900 dark:text-white italic">Pengguna Tidak Dikenal</span>
                                                        <span className="text-xs text-gray-500 dark:text-[#92c9a4]">Tidak Terautentikasi</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <span className="text-gray-900 dark:text-white font-medium">Percobaan Login Gagal</span>
                                                <span className="block text-xs text-gray-500 dark:text-[#92c9a4] mt-0.5">3 kegagalan berturut-turut</span>
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-gray-500 dark:text-[#92c9a4] font-mono text-xs">Layanan Otentikasi</td>
                                            <td className="p-4 whitespace-nowrap text-gray-500 dark:text-[#92c9a4] font-mono text-xs">203.0.113.195</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                                                    <span className="size-1.5 rounded-full bg-amber-500 dark:bg-amber-400"></span>
                                                    Peringatan
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="text-gray-400 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white p-1">
                                                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Row 3 */}
                                        <tr className="group hover:bg-gray-50 dark:hover:bg-[#1a3322] transition-colors">
                                            <td className="p-4 whitespace-nowrap text-gray-600 dark:text-[#92c9a4]">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-900 dark:text-white font-mono">24 Okt 2023</span>
                                                    <span className="text-xs opacity-70">09:15:33 UTC</span>
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <img className="size-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7DGEIofe7BtqcakBNve_-0PUrZKnAjl6qMwYAM_RuFbvsXDYCniTZub5zF599zjCHI-Rf5ZnrD4vS-SkrBu8O6R8iO4MEk3Yx5nc2RBOOvylV_k6MwW648_UWw5J0dvMwZ-tnX4rXu0x7lkeJquuMAGyrLHk6loVBOuFY18CIxCku2azt5AsFQJyGvJDi1Pg_zdz6QjdKWtuO3sG4wCDSj5RkSeksVly5OLoFQQDEu6qjwsIeTXz5MERnPBuHQSnfPWuPHtfQnLY" alt="Mike Ross" />
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-900 dark:text-white">Mike Ross</span>
                                                        <span className="text-xs text-gray-500 dark:text-[#92c9a4]">Analis Senior</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <span className="text-gray-900 dark:text-white font-medium">Transaksi Dibuat</span>
                                                <span className="block text-xs text-gray-500 dark:text-[#92c9a4] mt-0.5">Nilai: $5.000,00</span>
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-gray-500 dark:text-[#92c9a4] font-mono text-xs">TXN-88420-US</td>
                                            <td className="p-4 whitespace-nowrap text-gray-500 dark:text-[#92c9a4] font-mono text-xs">192.168.10.25</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                                                    <span className="size-1.5 rounded-full bg-green-500 dark:bg-green-400"></span>
                                                    Sukses
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="text-gray-400 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white p-1">
                                                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Row 4 */}
                                        <tr className="group hover:bg-gray-50 dark:hover:bg-[#1a3322] transition-colors">
                                            <td className="p-4 whitespace-nowrap text-gray-600 dark:text-[#92c9a4]">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-900 dark:text-white font-mono">24 Okt 2023</span>
                                                    <span className="text-xs opacity-70">02:00:00 UTC</span>
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30">
                                                        <span className="material-symbols-outlined text-[16px]">dns</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-900 dark:text-white">Sistem</span>
                                                        <span className="text-xs text-gray-500 dark:text-[#92c9a4]">Otomatis</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <span className="text-gray-900 dark:text-white font-medium">Pencadangan Sistem</span>
                                                <span className="block text-xs text-gray-500 dark:text-[#92c9a4] mt-0.5">Snapshot harian selesai</span>
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-gray-500 dark:text-[#92c9a4] font-mono text-xs">DB-Cluster-01</td>
                                            <td className="p-4 whitespace-nowrap text-gray-500 dark:text-[#92c9a4] font-mono text-xs">internal-net</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                                                    <span className="size-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                                                    Info
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="text-gray-400 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white p-1">
                                                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                                </button>
                                            </td>
                                        </tr>
                                         {/* Row 5 */}
                                         <tr className="group hover:bg-gray-50 dark:hover:bg-[#1a3322] transition-colors">
                                            <td className="p-4 whitespace-nowrap text-gray-600 dark:text-[#92c9a4]">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-900 dark:text-white font-mono">23 Okt 2023</span>
                                                    <span className="text-xs opacity-70">22:15:00 UTC</span>
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <img className="size-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALpLT6BwY_lL73gq8j2la-lsetqfIPvZReCnwIiYChMzMDUXTImRv_nibRD62zQrsV4vfOur6I51xmGVoauDSlJD2vKmIxbhFeVUAPioAKIc_cvB9BgCTDwK0q89r0Sl8Pv8BCcaB1Et799dXoRpz2O40U5B6FlRwQohk245MOPfVBTU4l0xHVDFM6v_UARbNzztI0SAPUo7gQq_VwaJDoboonyZSBw-qaG3WbGkqOQsFnox_LQG416DPQwrCEGSK3QY8z6rYb4oo" alt="John Doe" />
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-900 dark:text-white">John Doe</span>
                                                        <span className="text-xs text-gray-500 dark:text-[#92c9a4]">DevOps</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <span className="text-gray-900 dark:text-white font-medium">Kunci API Dicabut</span>
                                                <span className="block text-xs text-gray-500 dark:text-[#92c9a4] mt-0.5">ID Kunci: ...8x92</span>
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-gray-500 dark:text-[#92c9a4] font-mono text-xs">Pengaturan Keamanan</td>
                                            <td className="p-4 whitespace-nowrap text-gray-500 dark:text-[#92c9a4] font-mono text-xs">10.0.0.52</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20">
                                                    <span className="size-1.5 rounded-full bg-red-500 dark:bg-red-400"></span>
                                                    Kritis
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="text-gray-400 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white p-1">
                                                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-gray-200 dark:border-[#23482f] bg-gray-50/30 dark:bg-[#1a3322]/30">
                                <div className="text-sm text-gray-600 dark:text-[#92c9a4]">
                                    Menampilkan <span className="text-gray-900 dark:text-white font-bold">1-5</span> dari <span className="text-gray-900 dark:text-white font-bold">124</span> hasil
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="flex items-center justify-center size-8 rounded bg-white dark:bg-[#23482f] border border-gray-200 dark:border-transparent text-gray-500 dark:text-[#92c9a4] hover:bg-gray-100 dark:hover:bg-[#2c5a3b] hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                                    </button>
                                    <button className="flex items-center justify-center size-8 rounded bg-primary text-[#0a160f] font-bold text-sm cursor-pointer">1</button>
                                    <button className="flex items-center justify-center size-8 rounded bg-white dark:bg-[#23482f] border border-gray-200 dark:border-transparent text-gray-500 dark:text-[#92c9a4] hover:bg-gray-100 dark:hover:bg-[#2c5a3b] hover:text-gray-900 dark:hover:text-white text-sm cursor-pointer">2</button>
                                    <button className="flex items-center justify-center size-8 rounded bg-white dark:bg-[#23482f] border border-gray-200 dark:border-transparent text-gray-500 dark:text-[#92c9a4] hover:bg-gray-100 dark:hover:bg-[#2c5a3b] hover:text-gray-900 dark:hover:text-white text-sm cursor-pointer">3</button>
                                    <span className="text-gray-400 dark:text-[#92c9a4] px-1">...</span>
                                    <button className="flex items-center justify-center size-8 rounded bg-white dark:bg-[#23482f] border border-gray-200 dark:border-transparent text-gray-500 dark:text-[#92c9a4] hover:bg-gray-100 dark:hover:bg-[#2c5a3b] hover:text-gray-900 dark:hover:text-white text-sm cursor-pointer">12</button>
                                    <button className="flex items-center justify-center size-8 rounded bg-white dark:bg-[#23482f] border border-gray-200 dark:border-transparent text-gray-500 dark:text-[#92c9a4] hover:bg-gray-100 dark:hover:bg-[#2c5a3b] hover:text-gray-900 dark:hover:text-white cursor-pointer">
                                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AuditLog;
