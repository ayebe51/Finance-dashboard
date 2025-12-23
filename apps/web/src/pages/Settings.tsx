
import React from 'react';
import { useNavigate } from 'react-router-dom';

// ... (imports)

const Settings: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-hidden">
            {/* Settings Sidebar - Specific to this page as per HTML */}
            <aside className="hidden lg:flex flex-col w-72 h-full border-r border-gray-200 dark:border-white/5 bg-white dark:bg-background-dark shrink-0">
                <div className="p-6 flex flex-col gap-1">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')} title="Kembali ke Dasbor">
                        <span className="material-symbols-outlined text-primary">arrow_back</span>
                        <h1 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">FinancePro</h1>
                    </div>
                    <p className="text-primary/80 text-xs font-medium uppercase tracking-wider pl-8">Portal Admin</p>
                </div>
                <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
                    {/* Active Item */}
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary border-l-4 border-primary transition-all" href="#">
                        <span className="material-symbols-outlined text-[24px]">domain</span>
                        <span className="text-sm font-semibold">Profil Perusahaan</span>
                    </a>
                    {/* Inactive Items */}
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group" href="/chart-of-accounts">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">bar_chart</span>
                        <span className="text-sm font-medium">Bagan Akun</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group" href="/bank-accounts">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">account_balance</span>
                        <span className="text-sm font-medium">Rekening Bank</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group" href="/users-and-roles">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">group</span>
                        <span className="text-sm font-medium">Pengguna & Peran</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group" href="/notifications">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">notifications</span>
                        <span className="text-sm font-medium">Notifikasi</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group" href="#">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">description</span>
                        <span className="text-sm font-medium">Log Audit</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group" href="#">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">desktop_windows</span>
                        <span className="text-sm font-medium">Tampilan</span>
                    </a>
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-white/5">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-emerald-800" title="Avatar Pengguna"></div>
                        <div className="flex flex-col">
                            <p className="text-gray-900 dark:text-white text-sm font-semibold">Jane Doe</p>
                            <p className="text-gray-500 dark:text-slate-400 text-xs">Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-light dark:bg-[#121c16]">
                {/* Mobile Header (Visible only on small screens) */}
                <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-white/5">
                    <div className="flex items-center gap-2">
                         <button className="text-gray-900 dark:text-white p-1" onClick={() => navigate('/')}>
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h1 className="text-gray-900 dark:text-white font-bold">FinancePro</h1>
                    </div>
                    <button className="text-gray-900 dark:text-white p-2">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto w-full">
                    <div className="max-w-[1000px] mx-auto p-6 md:p-10 flex flex-col gap-8 pb-32">
                        {/* Breadcrumbs & Heading */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-sm">
                                <a className="text-gray-500 dark:text-slate-400 hover:text-primary font-medium transition-colors cursor-pointer" onClick={() => navigate('/')}>Pengaturan</a>
                                <span className="text-gray-400 dark:text-slate-600">/</span>
                                <span className="text-primary font-medium">Profil Perusahaan</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Profil Perusahaan</h2>
                                <p className="text-gray-500 dark:text-slate-400 text-base max-w-2xl">Kelola identitas, lokasi, dan preferensi fiskal perusahaan Anda. Pengaturan ini mempengaruhi bagaimana laporan dan faktur Anda dibuat.</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full bg-gray-200 dark:bg-white/10"></div>

                        {/* Logo Section */}
                        <section className="flex flex-col md:flex-row gap-6 items-start md:items-center p-6 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none">
                            <div className="relative group cursor-pointer w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-black/40 ring-1 ring-gray-200 dark:ring-white/10">
                                {/* Placeholder Image */}
                                <img className="absolute inset-0 w-full h-full object-cover text-slate-500 opacity-50" src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=300&auto=format&fit=crop" alt="Logo Perusahaan" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-white">edit</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Logo Perusahaan</h3>
                                <p className="text-gray-500 dark:text-slate-400 text-sm">Perbarui logo perusahaan Anda untuk faktur dan laporan. <br className="hidden sm:block" />Ukuran yang disarankan: 500x500px. JPG atau PNG, maks 2MB.</p>
                            </div>
                            <button className="px-4 py-2 bg-gray-100 dark:bg-surface-dark border border-gray-200 dark:border-white/10 hover:border-primary/50 text-gray-900 dark:text-white text-sm font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-white/5 transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">upload</span>
                                Unggah Baru
                            </button>
                        </section>

                        {/* Identity Form */}
                        <section className="flex flex-col gap-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Identitas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Nama Perusahaan</span>
                                    <input aria-label="Nama Perusahaan" title="Nama Perusahaan" className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-lg h-12 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-gray-500 dark:placeholder-slate-500 transition-all shadow-sm dark:shadow-none" placeholder="cth. PT Maju Bersama" type="text" defaultValue="FinancePro Solutions Ltd." />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">ID Pajak / NPWP</span>
                                    <input aria-label="ID Pajak atau NPWP" title="ID Pajak atau NPWP" className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-lg h-12 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-gray-500 dark:placeholder-slate-500 transition-all shadow-sm dark:shadow-none" placeholder="cth. 12.345.678.9-000.000" type="text" />
                                </label>
                            </div>
                        </section>

                        {/* Location Form */}
                        <section className="flex flex-col gap-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Lokasi</h3>
                            <div className="flex flex-col gap-6">
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Alamat Baris 1</span>
                                    <input aria-label="Alamat Baris 1" title="Alamat Baris 1" className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-lg h-12 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-gray-500 dark:placeholder-slate-500 transition-all shadow-sm dark:shadow-none" placeholder="Nama jalan, Nomor" type="text" />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Alamat Baris 2 <span className="text-gray-500 dark:text-slate-500 font-normal">(Opsional)</span></span>
                                    <input aria-label="Alamat Baris 2" title="Alamat Baris 2" className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-lg h-12 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-gray-500 dark:placeholder-slate-500 transition-all shadow-sm dark:shadow-none" placeholder="Apartemen, unit, dll." type="text" />
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <label className="flex flex-col gap-2">
                                        <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Kota</span>
                                        <input aria-label="Kota" title="Kota" className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-lg h-12 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-gray-500 dark:placeholder-slate-500 transition-all shadow-sm dark:shadow-none" type="text" />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Provinsi</span>
                                        <input aria-label="Provinsi" title="Provinsi" className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-lg h-12 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-gray-500 dark:placeholder-slate-500 transition-all shadow-sm dark:shadow-none" type="text" />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Kode Pos</span>
                                        <input aria-label="Kode Pos" title="Kode Pos" className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-lg h-12 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-gray-500 dark:placeholder-slate-500 transition-all shadow-sm dark:shadow-none" type="text" />
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Financial Settings Form */}
                        <section className="flex flex-col gap-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Preferensi Fiskal</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Mata Uang Default</span>
                                    <div className="relative">
                                        <select aria-label="Mata Uang Default" title="Mata Uang Default" className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-lg h-12 px-4 pr-10 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer shadow-sm dark:shadow-none">
                                            <option value="IDR">IDR - Rupiah Indonesia</option>
                                            <option value="USD">USD - Dolar AS</option>
                                            <option value="EUR">EUR - Euro</option>
                                            <option value="SGD">SGD - Dolar Singapura</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-slate-400 material-symbols-outlined">expand_more</span>
                                    </div>
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Awal Tahun Fiskal</span>
                                    <div className="relative">
                                        <select aria-label="Awal Tahun Fiskal" title="Awal Tahun Fiskal" className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-lg h-12 px-4 pr-10 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer shadow-sm dark:shadow-none">
                                            <option value="1">Januari</option>
                                            <option value="4">April</option>
                                            <option value="7">Juli</option>
                                            <option value="10">Oktober</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-slate-400 material-symbols-outlined">expand_more</span>
                                    </div>
                                </label>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Sticky Footer Action Bar */}
                <div className="absolute bottom-0 left-0 w-full p-4 md:px-10 md:py-6 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-t border-gray-200 dark:border-white/10 flex items-center justify-end gap-4 z-10">
                    <button className="px-6 h-12 rounded-lg text-gray-500 dark:text-slate-300 font-semibold hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" onClick={() => navigate('/')}>
                        Batalkan
                    </button>
                    <button className="px-8 h-12 rounded-lg bg-primary text-[#0a160f] font-bold shadow-lg hover:bg-[#25d660] hover:shadow-primary/30 transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">save</span>
                        Simpan Perubahan
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Settings;
