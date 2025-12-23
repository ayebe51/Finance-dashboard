import React from 'react';
import { useNavigate } from 'react-router-dom';

const UsersAndRoles: React.FC = () => {
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
                     {/* Inactive Items */}
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
                    {/* Active Item */}
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary border-l-4 border-primary transition-all" href="#">
                        <span className="material-symbols-outlined text-[24px]">group</span>
                        <span className="text-sm font-semibold">Pengguna & Peran</span>
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
                    <div className="max-w-[1280px] mx-auto p-6 md:p-8 flex flex-col flex-1">
                        {/* Breadcrumbs */}
                        <nav className="flex flex-wrap gap-2 mb-6">
                            <a className="text-gray-500 dark:text-[#92c9a4] text-sm font-medium leading-normal hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/settings')}>Pengaturan</a>
                            <span className="text-gray-400 dark:text-[#5e806a] text-sm font-medium leading-normal">/</span>
                            <span className="text-gray-900 dark:text-white text-sm font-medium leading-normal">Pengguna & Peran</span>
                        </nav>

                        {/* Page Heading & Actions */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div className="flex flex-col gap-2 max-w-2xl">
                                <h1 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Manajemen Tim</h1>
                                <p className="text-gray-500 dark:text-[#92c9a4] text-base font-normal leading-normal">Kelola akses, tentukan peran, dan lacak aktivitas pengguna dalam organisasi Anda untuk keamanan dan kepatuhan.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="group flex items-center justify-center rounded-lg h-10 px-4 bg-transparent border border-gray-300 dark:border-[#326744] text-gray-700 dark:text-white text-sm font-bold hover:bg-gray-100 dark:hover:bg-[#1e3a29] transition-colors">
                                    <span className="material-symbols-outlined mr-2 !text-[20px]">file_download</span>
                                    <span>Ekspor CSV</span>
                                </button>
                                <button className="flex items-center justify-center rounded-lg h-10 px-5 bg-primary text-[#0a160f] text-sm font-bold shadow-[0_0_15px_rgba(43,238,108,0.3)] hover:bg-[#20d860] transition-all transform hover:scale-[1.02]">
                                    <span className="material-symbols-outlined mr-2 !text-[20px]">person_add</span>
                                    <span>Undang Pengguna</span>
                                </button>
                            </div>
                        </div>

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#162b1e] border border-gray-200 dark:border-[#326744] shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                        <span className="material-symbols-outlined">group</span>
                                    </div>
                                    <p className="text-gray-500 dark:text-[#92c9a4] text-sm font-medium leading-normal">Total Pengguna</p>
                                </div>
                                <p className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold leading-tight mt-2">24</p>
                            </div>
                            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#162b1e] border border-gray-200 dark:border-[#326744] shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                                        <span className="material-symbols-outlined">verified_user</span>
                                    </div>
                                    <p className="text-gray-500 dark:text-[#92c9a4] text-sm font-medium leading-normal">Pengguna Aktif</p>
                                </div>
                                <p className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold leading-tight mt-2">19</p>
                            </div>
                            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#162b1e] border border-gray-200 dark:border-[#326744] shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <p className="text-gray-500 dark:text-[#92c9a4] text-sm font-medium leading-normal">Undangan Tertunda</p>
                                </div>
                                <p className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold leading-tight mt-2">5</p>
                            </div>
                            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#162b1e] border border-gray-200 dark:border-[#326744] shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                        <span className="material-symbols-outlined">admin_panel_settings</span>
                                    </div>
                                    <p className="text-gray-500 dark:text-[#92c9a4] text-sm font-medium leading-normal">Peran Terdefinisi</p>
                                </div>
                                <p className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold leading-tight mt-2">4</p>
                            </div>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="mb-6">
                            <div className="flex border-b border-gray-200 dark:border-[#326744] gap-8">
                                <a className="flex items-center gap-2 border-b-[3px] border-b-primary text-gray-900 dark:text-white pb-3 px-2 transition-colors cursor-pointer">
                                    <span className="text-sm font-bold leading-normal tracking-[0.015em]">Pengguna</span>
                                    <span className="flex items-center justify-center bg-gray-100 dark:bg-[#326744] text-gray-600 dark:text-white text-xs font-bold px-2 py-0.5 rounded-full">24</span>
                                </a>
                                <a className="flex items-center gap-2 border-b-[3px] border-b-transparent text-gray-500 dark:text-[#92c9a4] hover:text-gray-700 dark:hover:text-white pb-3 px-2 transition-colors cursor-pointer">
                                    <span className="text-sm font-bold leading-normal tracking-[0.015em]">Peran & Izin</span>
                                </a>
                            </div>
                        </div>

                        {/* Search and Filter Bar */}
                        <div className="bg-white dark:bg-[#162b1e] rounded-xl border border-gray-200 dark:border-[#326744] p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
                            <div className="relative w-full md:w-96">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400 dark:text-slate-500">search</span>
                                </div>
                                <input className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#102216] border border-gray-200 dark:border-[#326744] rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="Cari berdasarkan nama atau email..." type="text"/>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                                <div className="relative group">
                                    <select aria-label="Filter by Role" title="Filter by Role" className="appearance-none bg-gray-50 dark:bg-[#102216] border border-gray-200 dark:border-[#326744] text-gray-700 dark:text-slate-300 text-sm rounded-lg block w-full pl-3 pr-10 py-2.5 cursor-pointer hover:border-gray-300 dark:hover:border-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors">
                                        <option value="">Semua Peran</option>
                                        <option value="admin">Administrator</option>
                                        <option value="editor">Editor</option>
                                        <option value="viewer">Viewer</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                        <span className="material-symbols-outlined text-sm">expand_more</span>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <select aria-label="Filter by Status" title="Filter by Status" className="appearance-none bg-gray-50 dark:bg-[#102216] border border-gray-200 dark:border-[#326744] text-gray-700 dark:text-slate-300 text-sm rounded-lg block w-full pl-3 pr-10 py-2.5 cursor-pointer hover:border-gray-300 dark:hover:border-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors">
                                        <option value="">Semua Status</option>
                                        <option value="active">Aktif</option>
                                        <option value="invited">Tertunda</option>
                                        <option value="deactivated">Dinonaktifkan</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                        <span className="material-symbols-outlined text-sm">expand_more</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="bg-white dark:bg-[#162b1e] border border-gray-200 dark:border-[#326744] rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
                            <div className="overflow-x-auto custom-scrollbar">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-[#326744] bg-gray-50/50 dark:bg-[#1e3a29]/30">
                                            <th className="p-5 w-14">
                                                <div className="flex items-center">
                                                    <input aria-label="Select User" title="Select User" className="w-4 h-4 rounded border-gray-300 dark:border-slate-600 text-primary focus:ring-primary dark:bg-[#102216] dark:checked:bg-primary" type="checkbox"/>
                                                </div>
                                            </th>
                                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#92c9a4]">Pengguna</th>
                                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#92c9a4]">Peran</th>
                                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#92c9a4]">Status</th>
                                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#92c9a4]">Login Terakhir</th>
                                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#92c9a4] text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-[#326744]">
                                        {/* Row 1 */}
                                        <tr className="group hover:bg-gray-50 dark:hover:bg-[#1e3a29]/50 transition-colors">
                                            <td className="p-5">
                                                <div className="flex items-center">
                                                    <input aria-label="Select User" title="Select User" className="w-4 h-4 rounded border-gray-300 dark:border-slate-600 text-primary focus:ring-primary dark:bg-[#102216] dark:checked:bg-primary" type="checkbox"/>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <img className="size-10 rounded-full object-cover border border-gray-200 dark:border-slate-600" title="Alex Morgan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO_FPiI37_NCuXoBLc_nozQckcL_P6ioRaNtCtVRVHZTYraTHLmREf-U5xYffnGN6HjLcVInwrGfWa1d6t7lYbZrSdYuUf-mSTue7SqLgFWrhdK7TQ-Q4xAf52OTr7KHZ5WeOxzg7T4503P0NurFwGWMA_Ae2Yi7O7gRIXooNUgqc9hPWY5Nbw-86Eq8HM9pgBwJP9oemGpu5xjZXg9dt6ojbT4KERObVnrUz_8jpYH4OAqlDNuOgoAkptlEk807Eef2bgTzC23M0" alt="Alex Morgan" />
                                                        <div className="absolute bottom-0 right-0 size-3 rounded-full bg-primary border-2 border-white dark:border-[#162b1e]"></div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-gray-900 dark:text-white">Alex Morgan</span>
                                                        <span className="text-xs text-gray-500 dark:text-slate-400">alex.morgan@finance.com</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                                                    Administrator
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                                                    <span className="text-sm text-gray-700 dark:text-slate-300">Aktif</span>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-900 dark:text-white font-medium">Oct 24, 2023</span>
                                                    <span className="text-xs text-gray-500 dark:text-slate-400">09:42 AM</span>
                                                </div>
                                            </td>
                                            <td className="p-5 text-right">
                                                <button className="p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#326744] transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Row 2 */}
                                        <tr className="group hover:bg-gray-50 dark:hover:bg-[#1e3a29]/50 transition-colors">
                                            <td className="p-5">
                                                <div className="flex items-center">
                                                    <input aria-label="Select User" title="Select User" className="w-4 h-4 rounded border-gray-300 dark:border-slate-600 text-primary focus:ring-primary dark:bg-[#102216] dark:checked:bg-primary" type="checkbox"/>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <img className="size-10 rounded-full object-cover border border-gray-200 dark:border-slate-600" title="Sarah Chen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWNJPANL3xPpjSc33frzP12WYgnjCSRj-w7oRbRNJ4G17PmdUdBUkzHII3DTxyUmp2boZE_lDeN1furMKssa2PRFBMujmQg3bqTGPL_SiVwjV1PXYxgqKh5ziCHO1_C8rKoVMKZdDozJARuX8mHFsxzNzqMo8K9wuTc_8Kz2ci111s5CeuitVQ5wFDNWtqnFURuexOTAO_3ehBEuIqaTuqE_NvKa9731ndGIZ7G91GWfvdShkO6bqtDApn-l6c0v8s5UheLVi6lNU" alt="Sarah Chen" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-gray-900 dark:text-white">Sarah Chen</span>
                                                        <span className="text-xs text-gray-500 dark:text-slate-400">sarah.c@finance.com</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                                    Editor
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                                                    <span className="text-sm text-gray-700 dark:text-slate-300">Aktif</span>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-900 dark:text-white font-medium">Oct 23, 2023</span>
                                                    <span className="text-xs text-gray-500 dark:text-slate-400">02:15 PM</span>
                                                </div>
                                            </td>
                                            <td className="p-5 text-right">
                                                <button className="p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#326744] transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Row 3 */}
                                        <tr className="group hover:bg-gray-50 dark:hover:bg-[#1e3a29]/50 transition-colors">
                                            <td className="p-5">
                                                <div className="flex items-center">
                                                    <input aria-label="Select User" title="Select User" className="w-4 h-4 rounded border-gray-300 dark:border-slate-600 text-primary focus:ring-primary dark:bg-[#102216] dark:checked:bg-primary" type="checkbox"/>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <div className="size-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#23482f] text-gray-600 dark:text-white border border-gray-200 dark:border-slate-600 text-sm font-bold">JD</div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-gray-900 dark:text-white">John Doe</span>
                                                        <span className="text-xs text-gray-500 dark:text-slate-400">john.doe@finance.com</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700">
                                                    Viewer
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="size-2 rounded-full bg-amber-500"></div>
                                                    <span className="text-sm text-gray-700 dark:text-slate-300">Diundang</span>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-400 dark:text-slate-500 font-medium italic">Tidak pernah</span>
                                                </div>
                                            </td>
                                            <td className="p-5 text-right">
                                                <button className="p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#326744] transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination */}
                            <div className="border-t border-gray-200 dark:border-[#326744] p-4 flex items-center justify-between bg-gray-50/50 dark:bg-[#162b1e]">
                                <div className="text-sm text-gray-500 dark:text-slate-400">
                                    Menampilkan <span className="font-bold text-gray-900 dark:text-white">1-3</span> dari <span className="font-bold text-gray-900 dark:text-white">24</span> pengguna
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-[#326744] text-gray-500 dark:text-slate-400 text-sm hover:bg-white dark:hover:bg-[#1e3a29] disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>Sebelumnya</button>
                                    <button className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-[#326744] text-gray-500 dark:text-slate-400 text-sm hover:bg-white dark:hover:bg-[#1e3a29] transition-colors">Selanjutnya</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UsersAndRoles;
