import React from 'react';
import { useNavigate } from 'react-router-dom';

const Notifications: React.FC = () => {
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
                     <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group" href="/users-and-roles">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">group</span>
                        <span className="text-sm font-medium">Pengguna & Peran</span>
                    </a>
                    {/* Active Item */}
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary border-l-4 border-primary transition-all" href="#">
                        <span className="material-symbols-outlined text-[24px]">notifications</span>
                        <span className="text-sm font-semibold">Notifikasi</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group" href="/audit-log">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">history</span>
                        <span className="text-sm font-medium">Log Audit</span>
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
                    <div className="max-w-[1000px] mx-auto p-6 md:p-8 flex flex-col gap-8">
                        {/* Page Heading */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-gray-200 dark:border-[#23482f]">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-gray-900 dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Preferensi Notifikasi</h1>
                                <p className="text-gray-500 dark:text-[#92c9a4] text-base font-normal leading-normal max-w-2xl">Kelola bagaimana dan kapan Anda menerima peringatan untuk transaksi, anggaran, dan pembaruan sistem untuk mencegah kelelahan notifikasi.</p>
                            </div>
                            <button className="flex items-center justify-center gap-2 px-4 h-10 rounded-lg border border-gray-200 dark:border-[#23482f] bg-white dark:bg-[#162b1e] text-sm font-bold text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-[#23482f] transition-all shadow-sm">
                                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                                <span className="whitespace-nowrap">Atur Ulang ke Default</span>
                            </button>
                        </div>

                        {/* Section 1: General Updates */}
                        <section className="flex flex-col gap-4">
                            <h3 className="text-gray-900 dark:text-white text-lg font-bold">Pembaruan Umum</h3>
                            <div className="grid gap-4">
                                {/* Card Item */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl border border-gray-200 dark:border-[#23482f] bg-white dark:bg-[#162b1e] shadow-sm">
                                    <div className="flex gap-4">
                                        <div className="hidden sm:flex items-center justify-center size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                            <span className="material-symbols-outlined">campaign</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-gray-900 dark:text-white text-base font-bold">Pengumuman Produk</p>
                                            <p className="text-gray-500 dark:text-[#92c9a4] text-sm">Terima berita tentang fitur baru, webinar, dan pembaruan melalui email.</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" aria-label="Toggle Product Announcements" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                                {/* Card Item */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl border border-gray-200 dark:border-[#23482f] bg-white dark:bg-[#162b1e] shadow-sm opacity-75">
                                    <div className="flex gap-4">
                                        <div className="hidden sm:flex items-center justify-center size-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                                            <span className="material-symbols-outlined">security</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-gray-900 dark:text-white text-base font-bold flex items-center gap-2">
                                                Peringatan Keamanan
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 dark:bg-[#23482f] text-gray-500 uppercase tracking-wide">Wajib</span>
                                            </p>
                                            <p className="text-gray-500 dark:text-[#92c9a4] text-sm">Peringatan kritis mengenai upaya masuk dan perubahan kata sandi.</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-not-allowed">
                                        <input type="checkbox" aria-label="Toggle Security Alerts" className="sr-only peer" disabled defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 dark:border-gray-600 peer-checked:bg-primary/50"></div>
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Approvals & Workflow */}
                        <section className="flex flex-col gap-4">
                            <h3 className="text-gray-900 dark:text-white text-lg font-bold">Persetujuan & Alur Kerja</h3>
                            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-[#23482f] bg-white dark:bg-[#162b1e] shadow-sm">
                                <table className="w-full text-left text-sm text-gray-500 dark:text-[#92c9a4]">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#23482f] dark:text-white">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 font-bold">Tipe Peringatan</th>
                                            <th scope="col" className="px-6 py-4 text-center w-24">Email</th>
                                            <th scope="col" className="px-6 py-4 text-center w-24">In-App</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-[#23482f]">
                                        <tr className="bg-white dark:bg-[#162b1e] hover:bg-gray-50 dark:hover:bg-opacity-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-gray-400">receipt_long</span>
                                                    <div>
                                                        <p className="font-bold">Laporan Pengeluaran Baru</p>
                                                        <p className="text-xs font-normal text-gray-500 dark:text-[#92c9a4] mt-0.5">Saat anggota tim mengajukan pengeluaran baru</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <input aria-label="In-App Notification" title="In-App Notification" type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800" defaultChecked />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <input aria-label="Email Notification" title="Email Notification" type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800" defaultChecked />
                                            </td>
                                        </tr>
                                        <tr className="bg-white dark:bg-[#162b1e] hover:bg-gray-50 dark:hover:bg-opacity-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-gray-400">approval</span>
                                                    <div>
                                                        <p className="font-bold">Persetujuan Faktur</p>
                                                        <p className="text-xs font-normal text-gray-500 dark:text-[#92c9a4] mt-0.5">Saat faktur memerlukan persetujuan Anda</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <input aria-label="In-App Notification" title="In-App Notification" type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800" defaultChecked />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <input aria-label="Email Notification" title="Email Notification" type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Section 3: Budgets & Thresholds */}
                        <section className="flex flex-col gap-4">
                            <h3 className="text-gray-900 dark:text-white text-lg font-bold">Anggaran & Ambang Batas</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Budget Card */}
                                <div className="flex flex-col justify-between p-5 rounded-xl border border-gray-200 dark:border-[#23482f] bg-white dark:bg-[#162b1e] shadow-sm h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-3">
                                            <span className="material-symbols-outlined text-red-500 bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">pie_chart</span>
                                            <div>
                                                <p className="text-gray-900 dark:text-white font-bold">Batas Anggaran</p>
                                                <p className="text-xs text-gray-500 dark:text-[#92c9a4]">Beri tahu saat pemanfaatan anggaran tinggi</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" aria-label="Toggle Budget Limits" className="sr-only peer" defaultChecked />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                    <div className="mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                                        <label className="text-xs font-semibold text-gray-500 dark:text-[#92c9a4] uppercase tracking-wider mb-2 block">Picu pada Pemanfaatan</label>
                                        <div className="relative flex items-center">
                                            <input title="Trigger Amount" aria-label="Trigger Amount" type="number" className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-background-dark text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2.5 pr-8" defaultValue="75" />
                                            <span className="absolute right-3 text-gray-500 font-bold">%</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Transaction Card */}
                                <div className="flex flex-col justify-between p-5 rounded-xl border border-gray-200 dark:border-[#23482f] bg-white dark:bg-[#162b1e] shadow-sm h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-3">
                                            <span className="material-symbols-outlined text-purple-500 bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">payments</span>
                                            <div>
                                                <p className="text-gray-900 dark:text-white font-bold">Transaksi Besar</p>
                                                <p className="text-xs text-gray-500 dark:text-[#92c9a4]">Peringatan tentang pengeluaran tinggi yang tidak biasa</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" aria-label="Toggle Large Transactions" className="sr-only peer" defaultChecked />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                    <div className="mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                                        <label className="text-xs font-semibold text-gray-500 dark:text-[#92c9a4] uppercase tracking-wider mb-2 block">Jumlah Pemicu</label>
                                        <div className="relative flex items-center">
                                            <span className="absolute left-3 text-gray-500 font-bold">Rp</span>
                                            <input type="number" aria-label="Trigger Amount Value" className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-background-dark text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2.5 pl-10" defaultValue="1000000" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 4: Accounts Receivable */}
                        <section className="flex flex-col gap-4">
                            <h3 className="text-gray-900 dark:text-white text-lg font-bold">Piutang Usaha</h3>
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-xl border border-gray-200 dark:border-[#23482f] bg-white dark:bg-[#162b1e] shadow-sm">
                                <div className="flex gap-4">
                                    <div className="flex items-center justify-center size-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                                        <span className="material-symbols-outlined">warning</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-900 dark:text-white text-base font-bold">Pengingat Pembayaran Jatuh Tempo</p>
                                        <p className="text-gray-500 dark:text-[#92c9a4] text-sm">Dapatkan notifikasi tentang faktur klien yang belum dibayar.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 w-full md:w-auto mt-2 md:mt-0">
                                    <select aria-label="Notification Frequency" title="Notification Frequency" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-background-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary min-w-[140px]">
                                        <option>Harian</option>
                                        <option selected>Ringkasan Mingguan</option>
                                        <option>Peringatan Instan</option>
                                    </select>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" aria-label="Toggle Payment Reminders" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Action Footer */}
                        <div className="sticky bottom-4 z-40 mt-4">
                            <div className="bg-white/80 dark:bg-[#162b1e]/90 backdrop-blur-md border border-gray-200 dark:border-[#23482f] rounded-xl p-4 flex items-center justify-between shadow-lg">
                                <p className="text-sm text-gray-500 dark:text-[#92c9a4] hidden sm:block">
                                    Perubahan disimpan otomatis saat Anda mengedit.
                                </p>
                                <div className="flex gap-3 w-full sm:w-auto justify-end">
                                    <button className="px-5 py-2 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#23482f] transition-colors">Batal</button>
                                    <button className="px-6 py-2 rounded-lg text-sm font-bold bg-primary text-[#0a160f] hover:bg-[#25d05f] transition-colors shadow-lg shadow-green-900/20">Simpan Preferensi</button>
                                </div>
                            </div>
                        </div>
                        <div className="h-10"></div> {/* Spacer for scrolling */}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Notifications;
