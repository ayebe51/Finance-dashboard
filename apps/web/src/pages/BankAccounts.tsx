import React from 'react';
import { useNavigate } from 'react-router-dom';

const BankAccounts: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-hidden">
            {/* Settings Sidebar - Consistent with ChartOfAccounts */}
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
                    {/* Active Item */}
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary border-l-4 border-primary transition-all" href="#">
                        <span className="material-symbols-outlined text-[24px]">account_balance</span>
                        <span className="text-sm font-semibold">Akun Bank</span>
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
                    <div className="max-w-[1200px] mx-auto p-6 md:p-10 flex flex-col gap-8">
                        {/* Breadcrumbs */}
                        <nav className="hidden md:flex items-center text-sm font-medium text-gray-500 dark:text-[#92c9a4]">
                            <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/settings')}>
                                <span className="material-symbols-outlined text-[20px]">settings</span>
                                <span>Pengaturan</span>
                            </div>
                            <span className="mx-2 text-gray-400 dark:text-[#23482f]">/</span>
                            <span className="text-gray-900 dark:text-white">Akun Bank</span>
                        </nav>

                        {/* Page Heading */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Akun Bank</h2>
                                <p className="text-gray-500 dark:text-[#92c9a4] text-base max-w-2xl">Kelola feed institusi yang terhubung, pantau saldo real-time, dan konfigurasi pengaturan akun.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="hidden lg:flex items-center gap-1 text-xs text-gray-500 dark:text-[#92c9a4] bg-gray-100 dark:bg-[#1a2e22] px-3 py-1 rounded-full border border-gray-200 dark:border-[#23482f]">
                                    <span className="material-symbols-outlined text-[14px]">lock</span>
                                    Diamankan oleh Plaid
                                </div>
                                <button className="flex items-center justify-center gap-2 bg-primary hover:bg-[#25d05f] text-[#0a160f] font-bold py-2.5 px-5 rounded-lg transition-all shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined text-[20px]">add</span>
                                    Hubungkan Akun
                                </button>
                            </div>
                        </div>

                        {/* Stats Widgets */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Widget 1 */}
                            <div className="bg-white dark:bg-[#1a2e22] border border-gray-200 dark:border-[#23482f] rounded-xl p-5 flex flex-col gap-1 relative overflow-hidden group shadow-sm dark:shadow-none">
                                <div className="absolute right-0 top-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50"></div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1.5 bg-gray-100 dark:bg-[#23482f]/50 rounded-md text-primary">
                                        <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                                    </div>
                                    <span className="text-gray-500 dark:text-[#92c9a4] text-sm font-medium">Total Kas Tunai</span>
                                </div>
                                <span className="text-gray-900 dark:text-white text-3xl font-bold tracking-tight">$1,370,299.50</span>
                                <div className="flex items-center gap-1 mt-1 text-primary text-xs font-bold">
                                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                                    <span>+2.4%</span>
                                    <span className="text-gray-400 dark:text-[#92c9a4] font-normal ml-1">vs bulan lalu</span>
                                </div>
                            </div>

                            {/* Widget 2 */}
                            <div className="bg-white dark:bg-[#1a2e22] border border-gray-200 dark:border-[#23482f] rounded-xl p-5 flex flex-col gap-1 relative overflow-hidden group shadow-sm dark:shadow-none">
                                <div className="absolute right-0 top-0 p-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50"></div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1.5 bg-gray-100 dark:bg-[#23482f]/50 rounded-md text-blue-500 dark:text-blue-400">
                                        <span className="material-symbols-outlined text-[20px]">link</span>
                                    </div>
                                    <span className="text-gray-500 dark:text-[#92c9a4] text-sm font-medium">Koneksi Aktif</span>
                                </div>
                                <span className="text-gray-900 dark:text-white text-3xl font-bold tracking-tight">3</span>
                                <div className="flex items-center gap-1 mt-1 text-gray-400 dark:text-[#92c9a4] text-xs">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                    <span>Semua sistem operasional</span>
                                </div>
                            </div>

                            {/* Widget 3 */}
                            <div className="bg-white dark:bg-[#1a2e22] border border-gray-200 dark:border-[#23482f] rounded-xl p-5 flex flex-col gap-1 relative overflow-hidden group md:hidden lg:flex shadow-sm dark:shadow-none">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1.5 bg-gray-100 dark:bg-[#23482f]/50 rounded-md text-orange-500 dark:text-orange-400">
                                        <span className="material-symbols-outlined text-[20px]">warning</span>
                                    </div>
                                    <span className="text-gray-500 dark:text-[#92c9a4] text-sm font-medium">Perlu Perhatian</span>
                                </div>
                                <span className="text-gray-900 dark:text-white text-3xl font-bold tracking-tight">1</span>
                                <div className="flex items-center gap-1 mt-1 text-orange-500 dark:text-orange-400 text-xs font-bold">
                                    <span>Kesalahan Sinkronisasi</span>
                                    <span className="text-gray-400 dark:text-[#92c9a4] font-normal ml-1">pada Kartu Amex</span>
                                </div>
                            </div>
                        </div>

                        {/* Accounts List */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-gray-900 dark:text-white text-lg font-bold">Akun Terhubung</h3>
                                <button className="text-gray-500 dark:text-[#92c9a4] hover:text-primary text-sm font-medium flex items-center gap-1 transition-colors">
                                    <span className="material-symbols-outlined text-[18px]">filter_list</span>
                                    Filter
                                </button>
                            </div>

                            {/* Account Card 1: Chase */}
                            <div className="group bg-white dark:bg-[#112217] border border-gray-200 dark:border-[#23482f] rounded-xl p-5 transition-all hover:border-primary/50 hover:shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm dark:shadow-none">
                                <div className="flex items-start md:items-center gap-4">
                                    <div className="size-12 rounded-lg bg-white border border-gray-100 p-2 flex items-center justify-center shrink-0">
                                        <img className="w-full h-full object-contain object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM14ur2XmWWm_xT9XoM3bb78TULsdL-kjkqhRXogShmc7PPruS05w1vrK2uP9nFBRBcDBVISJB_maKMA3zNTxW0TSJDz1l1P2Sk_tM_Oom6kB7pnAKvHxgm1A6aFFkcE-k91J5I8X8ZiFEiVN1_RdpWA7TnMWPt-63IP0if-9PWc-yP3OwY3wqorA_UDFRtlgVZuKPNviRdXs7Mv46Z69I4svwZbkSRpahitYoSh1dO3HreLUmd3lDblSumkWQnGCoPuii-vKKxYw" alt="Chase" />
                                    </div>
                                    <div>
                                        <h4 className="text-gray-900 dark:text-white font-bold text-lg">Chase Business Checking</h4>
                                        <div className="flex items-center gap-2 text-gray-500 dark:text-[#92c9a4] text-sm">
                                            <span>Business Complete</span>
                                            <span className="size-1 bg-gray-400 dark:bg-[#92c9a4] rounded-full"></span>
                                            <span className="font-mono">•••• 8829</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8 lg:gap-12 pl-16 md:pl-0 border-t md:border-t-0 border-gray-100 dark:border-[#23482f] pt-4 md:pt-0">
                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                                            <span className="size-1.5 rounded-full bg-primary shadow-[0_0_5px_#2bee6c]"></span>
                                            <span className="text-primary-dark dark:text-primary text-xs font-bold uppercase tracking-wider">Aktif</span>
                                        </div>
                                        <span className="text-gray-400 dark:text-[#92c9a4] text-xs mt-1">Diperbarui 2m lalu</span>
                                    </div>
                                    <div className="text-right min-w-[120px]">
                                        <p className="text-gray-900 dark:text-white text-xl font-bold tracking-tight font-mono">$124,500.00</p>
                                        <p className="text-gray-500 dark:text-[#92c9a4] text-xs">Saldo Tersedia</p>
                                    </div>
                                    <div className="relative">
                                        <button aria-label="Account Options" title="Account Options" className="size-8 flex items-center justify-center text-gray-400 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#23482f] rounded-lg transition-colors">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Account Card 2: SVB */}
                            <div className="group bg-white dark:bg-[#112217] border border-gray-200 dark:border-[#23482f] rounded-xl p-5 transition-all hover:border-primary/50 hover:shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm dark:shadow-none">
                                <div className="flex items-start md:items-center gap-4">
                                    <div className="size-12 rounded-lg bg-white border border-gray-100 p-2 flex items-center justify-center shrink-0">
                                        <img className="w-full h-full object-contain object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5VfStHBCoV-K9uU3f7rUv8xsDFVfy07_upcBFmycXDZIpefa3uckHEqkez6s2PpmcRFgTPUG06ykT57WjlNAJBLybApT1e1Q710I6QKIBeDESVGoseFsJCoMABROoxF2TNq6NR7nZrl5UwfpRIozIR2kyqYyTMhBhUgAnAe65q-zK37PE7kJE_ZBXzNhdYs7fu54vtMdabSQezXnkjVEEedKAm90fYh8UDzXfVcPkvpChBIvQ2oiUxawRu-8W4zP87IUh_vwdPcI" alt="SVB" />
                                    </div>
                                    <div>
                                        <h4 className="text-gray-900 dark:text-white font-bold text-lg">Silicon Valley Bank</h4>
                                        <div className="flex items-center gap-2 text-gray-500 dark:text-[#92c9a4] text-sm">
                                            <span>High Yield Savings</span>
                                            <span className="size-1 bg-gray-400 dark:bg-[#92c9a4] rounded-full"></span>
                                            <span className="font-mono">•••• 1102</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8 lg:gap-12 pl-16 md:pl-0 border-t md:border-t-0 border-gray-100 dark:border-[#23482f] pt-4 md:pt-0">
                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                                            <span className="size-1.5 rounded-full bg-primary shadow-[0_0_5px_#2bee6c]"></span>
                                            <span className="text-primary-dark dark:text-primary text-xs font-bold uppercase tracking-wider">Aktif</span>
                                        </div>
                                        <span className="text-gray-400 dark:text-[#92c9a4] text-xs mt-1">Diperbarui 1j lalu</span>
                                    </div>
                                    <div className="text-right min-w-[120px]">
                                        <p className="text-gray-900 dark:text-white text-xl font-bold tracking-tight font-mono">$1,250,000.00</p>
                                        <p className="text-gray-500 dark:text-[#92c9a4] text-xs">Saldo Tersedia</p>
                                    </div>
                                    <div className="relative">
                                        <button aria-label="Account Options" title="Account Options" className="size-8 flex items-center justify-center text-gray-400 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#23482f] rounded-lg transition-colors">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                             {/* Account Card 3: Amex (Error State) */}
                             <div className="group bg-white dark:bg-[#112217] border border-red-200 dark:border-red-900/30 rounded-xl p-5 transition-all hover:border-red-400/50 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm dark:shadow-none">
                                <div className="flex items-start md:items-center gap-4">
                                    <div className="size-12 rounded-lg bg-[#006fcf] p-2 flex items-center justify-center shrink-0">
                                        <img className="w-full h-full object-contain object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHj0levIe_K1bQxo8JrbvVFlDQlWn7bGcwETxsmjjuZJhCcp0HcVjBIjVH4xJBMDYl5eNKxfGBLnDnSaDGJns2r-AjDaXG42VCekLGN4eOcbsd7OO055Qb8l_WxYsu8M7E8YydefzCj4-D9mpz-yadonRz2bpRq-UjDr_GdPI76eOWmKDTWVEGJl7usLyXgbJmLHKkUn19Y7nXE4zRzG4e7LjaRIcvA4FCMIhcOVJZgJ2zd11dQIUsemv9J9Jfv2Q1QemVsGf-Gaw" alt="Amex" />
                                    </div>
                                    <div>
                                        <h4 className="text-gray-900 dark:text-white font-bold text-lg">Amex Platinum Corporate</h4>
                                        <div className="flex items-center gap-2 text-gray-500 dark:text-[#92c9a4] text-sm">
                                            <span>Credit Card</span>
                                            <span className="size-1 bg-gray-400 dark:bg-[#92c9a4] rounded-full"></span>
                                            <span className="font-mono">•••• 4421</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8 lg:gap-12 pl-16 md:pl-0 border-t md:border-t-0 border-red-100 dark:border-[#23482f] pt-4 md:pt-0">
                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-200 dark:border-red-500/20">
                                            <span className="material-symbols-outlined text-[14px] text-red-500 dark:text-red-400">warning</span>
                                            <span className="text-red-500 dark:text-red-400 text-xs font-bold uppercase tracking-wider">Kesalahan Sinkronisasi</span>
                                        </div>
                                        <button className="text-primary text-xs mt-1 hover:underline">Autentikasi Ulang</button>
                                    </div>
                                    <div className="text-right min-w-[120px]">
                                        <p className="text-gray-900 dark:text-white text-xl font-bold tracking-tight font-mono">-$4,200.50</p>
                                        <p className="text-gray-500 dark:text-[#92c9a4] text-xs">Saldo Saat Ini</p>
                                    </div>
                                    <div className="relative">
                                        <button aria-label="Account Options" title="Account Options" className="size-8 flex items-center justify-center text-gray-400 dark:text-[#92c9a4] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#23482f] rounded-lg transition-colors">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BankAccounts;
