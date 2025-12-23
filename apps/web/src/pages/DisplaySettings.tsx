import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const DisplaySettings: React.FC = () => {
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-hidden">
            {/* Settings Sidebar */}
            <aside className="hidden lg:flex flex-col w-72 h-full border-r border-gray-200 dark:border-white/5 bg-white dark:bg-background-dark shrink-0">
                <div className="p-6 flex flex-col gap-1">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')} title="Kembali ke Dasbor">
                        <span className="material-symbols-outlined text-primary">arrow_back</span>
                        <h1 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">FinancePro</h1>
                    </div>
                    <p className="text-primary/80 text-xs font-medium uppercase tracking-wider pl-8">Portal Admin</p>
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
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group" href="/audit-log">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">history</span>
                        <span className="text-sm font-medium">Log Audit</span>
                    </a>
                    {/* Active Item */}
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary border-l-4 border-primary transition-all" href="#">
                        <span className="material-symbols-outlined text-[24px] fill-1">palette</span>
                        <span className="text-sm font-semibold">Tampilan</span>
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
            <main className="flex-1 flex flex-col p-4 md:p-8 lg:p-10 bg-background-light dark:bg-[#102216] text-slate-900 dark:text-white overflow-y-auto custom-scrollbar">
                {/* Mobile Header */}
                 <div className="lg:hidden flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <button className="text-gray-900 dark:text-white p-1" onClick={() => navigate('/settings')}>
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h1 className="text-gray-900 dark:text-white font-bold">Pengaturan Tampilan</h1>
                    </div>
                </div>

                {/* Header */}
                <div className="flex flex-col gap-2 mb-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Pengaturan Tampilan</h2>
                    <p className="text-slate-500 dark:text-[#92c9a4] text-base max-w-2xl">
                        Sesuaikan tampilan aplikasi di perangkat Anda. Pilih tema dan atur kepadatan teks agar sesuai dengan alur kerja Anda.
                    </p>
                </div>

                <div className="flex flex-col xl:flex-row gap-8">
                    {/* Settings Form */}
                    <div className="flex-1 flex flex-col gap-10 max-w-3xl">
                        {/* Theme Selection */}
                        <section>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                                <span className="material-symbols-outlined text-primary">contrast</span>
                                Tampilan
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/* Light Mode Option */}
                                <label className="cursor-pointer group relative">
                                    <input 
                                        className="peer sr-only radio-card" 
                                        name="theme" 
                                        type="radio" 
                                        value="light" 
                                        checked={theme === 'light'}
                                        onChange={() => setTheme('light')}
                                    />
                                    <div className="rounded-xl border-2 border-slate-200 dark:border-[#23482f] bg-white dark:bg-[#162d1f] p-4 flex flex-col gap-3 transition-all hover:border-slate-300 dark:hover:border-[#326744] peer-checked:border-primary peer-checked:bg-primary/5">
                                        <div className="w-full aspect-[4/3] rounded-lg bg-slate-100 border border-slate-200 overflow-hidden relative">
                                            <div className="absolute top-2 left-2 right-2 h-2 bg-slate-300 rounded-full w-1/3"></div>
                                            <div className="absolute top-6 left-2 right-2 bottom-2 bg-white rounded shadow-sm"></div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-slate-700 dark:text-white">Mode Terang</span>
                                            <span className="material-symbols-outlined text-primary opacity-0 peer-checked:opacity-100 transition-opacity">check_circle</span>
                                        </div>
                                    </div>
                                </label>
                                {/* Dark Mode Option */}
                                <label className="cursor-pointer group relative">
                                    <input 
                                        className="peer sr-only radio-card" 
                                        name="theme" 
                                        type="radio" 
                                        value="dark" 
                                        checked={theme === 'dark'}
                                        onChange={() => setTheme('dark')}
                                    />
                                    <div className="rounded-xl border-2 border-slate-200 dark:border-[#23482f] bg-white dark:bg-[#162d1f] p-4 flex flex-col gap-3 transition-all hover:border-slate-300 dark:hover:border-[#326744] peer-checked:border-primary peer-checked:bg-primary/5">
                                        <div className="w-full aspect-[4/3] rounded-lg bg-[#112217] border border-[#23482f] overflow-hidden relative">
                                            <div className="absolute top-2 left-2 right-2 h-2 bg-[#23482f] rounded-full w-1/3"></div>
                                            <div className="absolute top-6 left-2 right-2 bottom-2 bg-[#162d1f] rounded border border-[#23482f]"></div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-slate-700 dark:text-white">Mode Gelap</span>
                                            <span className="material-symbols-outlined text-primary opacity-0 peer-checked:opacity-100 transition-opacity">check_circle</span>
                                        </div>
                                    </div>
                                </label>
                                {/* System Default Option */}
                                <label className="cursor-pointer group relative">
                                    <input 
                                        className="peer sr-only radio-card" 
                                        name="theme" 
                                        type="radio" 
                                        value="system" 
                                        checked={theme === 'system'}
                                        onChange={() => setTheme('system')}
                                    />
                                    <div className="rounded-xl border-2 border-slate-200 dark:border-[#23482f] bg-white dark:bg-[#162d1f] p-4 flex flex-col gap-3 transition-all hover:border-slate-300 dark:hover:border-[#326744] peer-checked:border-primary peer-checked:bg-primary/5">
                                        <div className="w-full aspect-[4/3] rounded-lg bg-gradient-to-br from-slate-100 to-[#112217] border border-slate-200 dark:border-[#23482f] overflow-hidden relative">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-3xl text-slate-400 dark:text-slate-500">settings_brightness</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-slate-700 dark:text-white">Sistem</span>
                                            <span className="material-symbols-outlined text-primary opacity-0 peer-checked:opacity-100 transition-opacity">check_circle</span>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </section>

                        <div className="h-px bg-slate-200 dark:bg-[#23482f] w-full"></div>

                        {/* Layout & Accessibility */}
                        <section className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                                <span className="material-symbols-outlined text-primary">view_quilt</span>
                                Tata Letak & Kepadatan
                            </h3>
                            {/* Density Toggle */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#162d1f] border border-slate-200 dark:border-[#23482f]">
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-slate-900 dark:text-white">Kepadatan Tabel</span>
                                    <span className="text-sm text-slate-500 dark:text-[#92c9a4]">Sesuaikan spasi vertikal dalam tabel data.</span>
                                </div>
                                <div className="flex bg-slate-100 dark:bg-[#112217] p-1 rounded-lg border border-slate-200 dark:border-[#23482f]">
                                    <button className="px-4 py-1.5 rounded-md text-sm font-medium transition-all bg-white dark:bg-[#23482f] text-slate-900 dark:text-white shadow-sm">Nyaman</button>
                                    <button className="px-4 py-1.5 rounded-md text-sm font-medium transition-all text-slate-500 dark:text-[#92c9a4] hover:text-slate-900 dark:hover:text-white">Padat</button>
                                </div>
                            </div>
                            {/* Font Size Slider */}
                            <div className="flex flex-col gap-4 p-4 rounded-xl bg-white dark:bg-[#162d1f] border border-slate-200 dark:border-[#23482f]">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-slate-900 dark:text-white">Ukuran Font</span>
                                        <span className="text-sm text-slate-500 dark:text-[#92c9a4]">Atur ukuran teks dasar.</span>
                                    </div>
                                    <span className="text-sm font-bold text-primary">Sedang (Default)</span>
                                </div>
                                <div className="relative py-2 px-2">
                                    <input aria-label="Font Size" title="Font Size" className="w-full h-2 bg-slate-200 dark:bg-[#23482f] rounded-lg appearance-none cursor-pointer accent-primary" max="3" min="1" type="range" defaultValue="2" />
                                    <div className="flex justify-between text-xs text-slate-400 dark:text-[#92c9a4] mt-2 font-medium">
                                        <span>Kecil</span>
                                        <span>Sedang</span>
                                        <span>Besar</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="h-px bg-slate-200 dark:bg-[#23482f] w-full"></div>

                        {/* Regional Format */}
                        <section className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                                <span className="material-symbols-outlined text-primary">public</span>
                                Format Regional
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Number Format */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-[#92c9a4]">Format Angka</label>
                                    <div className="relative">
                                        <select aria-label="Number Format" title="Number Format" className="w-full appearance-none bg-white dark:bg-[#162d1f] border border-slate-200 dark:border-[#23482f] rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                                            <option>1,234.56</option>
                                            <option>1.234,56</option>
                                            <option>1 234,56</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-slate-500">expand_more</span>
                                    </div>
                                </div>
                                {/* Currency Display */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-[#92c9a4]">Tampilan Mata Uang</label>
                                    <div className="relative">
                                        <select aria-label="Currency Display" title="Currency Display" className="w-full appearance-none bg-white dark:bg-[#162d1f] border border-slate-200 dark:border-[#23482f] rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                                            <option>Simbol (Rp)</option>
                                            <option>Kode (IDR)</option>
                                            <option>Nama (Rupiah Indonesia)</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-slate-500">expand_more</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Save Action */}
                        <div className="flex justify-end pt-4 mb-10">
                            <button className="bg-primary hover:bg-[#22c55b] text-[#112217] font-bold py-2.5 px-6 rounded-lg transition-colors shadow-lg shadow-green-900/20">
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>

                    {/* Preview Panel (Right Side) */}
                    <div className="hidden xl:block w-[380px] shrink-0">
                        <div className="sticky top-8 flex flex-col gap-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-slate-500 dark:text-[#92c9a4] text-sm">visibility</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#92c9a4]">Pratinjau Langsung</span>
                            </div>
                            {/* Preview Card Container */}
                            <div className="bg-white dark:bg-[#162d1f] rounded-xl border border-slate-200 dark:border-[#23482f] shadow-xl p-5 flex flex-col gap-6 relative overflow-hidden">
                                {/* Decorative background blur */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                                {/* Mock Card Header */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-[#92c9a4] mb-1">Total Pendapatan</p>
                                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Rp 48.295.000</h4>
                                    </div>
                                    <span className="px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">trending_up</span>
                                        +12,5%
                                    </span>
                                </div>
                                {/* Mock Chart Area */}
                                <div className="h-24 flex items-end justify-between gap-1 px-1">
                                    <div className="w-full bg-slate-100 dark:bg-[#23482f] rounded-t-sm h-[40%]"></div>
                                    <div className="w-full bg-slate-100 dark:bg-[#23482f] rounded-t-sm h-[60%]"></div>
                                    <div className="w-full bg-slate-100 dark:bg-[#23482f] rounded-t-sm h-[35%]"></div>
                                    <div className="w-full bg-slate-100 dark:bg-[#23482f] rounded-t-sm h-[75%]"></div>
                                    <div className="w-full bg-primary/30 rounded-t-sm h-[50%]"></div>
                                    <div className="w-full bg-primary rounded-t-sm h-[85%] shadow-[0_0_10px_rgba(43,238,108,0.3)]"></div>
                                </div>
                                {/* Mock Table Rows */}
                                <div className="flex flex-col gap-0 border-t border-slate-200 dark:border-[#23482f]">
                                    <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-[#23482f]/50">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-full bg-slate-100 dark:bg-[#112217] flex items-center justify-center text-xs text-gray-700 dark:text-gray-300">NL</div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">Netflix</span>
                                                <span className="text-xs text-slate-500 dark:text-[#92c9a4]">Perangkat Lunak</span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">-Rp 15.990</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-[#23482f]/50">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-full bg-slate-100 dark:bg-[#112217] flex items-center justify-center text-xs text-gray-700 dark:text-gray-300">SP</div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">Spotify</span>
                                                <span className="text-xs text-slate-500 dark:text-[#92c9a4]">Hiburan</span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">-Rp 9.990</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-full bg-slate-100 dark:bg-[#112217] flex items-center justify-center text-xs text-gray-700 dark:text-gray-300">AS</div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">Adobe Inc.</span>
                                                <span className="text-xs text-slate-500 dark:text-[#92c9a4]">Bisnis</span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">-Rp 54.000</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs text-center text-slate-400 dark:text-[#23482f]">
                                Pratinjau diperbarui secara otomatis berdasarkan pilihan Anda.
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DisplaySettings;
