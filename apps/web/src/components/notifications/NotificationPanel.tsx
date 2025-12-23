import React from 'react';

interface NotificationPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-[90] transition-opacity duration-300"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}
            
            {/* Sidebar */}
            <div 
                className={`fixed inset-y-0 right-0 z-[100] w-full max-w-[420px] bg-background-dark border-l border-white/5 flex flex-col shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 shrink-0 bg-background-dark">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-white tracking-tight">Notifikasi</h2>
                        <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full border border-primary/10">3 Belum Dibaca</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors group" title="Mark all as read">
                            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">done_all</span>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors" title="Settings">
                            <span className="material-symbols-outlined text-[20px]">settings</span>
                        </button>
                        <button 
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors ml-1" 
                            title="Close"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    {/* Section Header: Today */}
                    <div className="px-6 pt-6 pb-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#92c9a4]/70">Hari Ini</h4>
                    </div>

                    {/* Notification Item: High Urgency (Overdue) */}
                    <div className="group relative flex gap-4 px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer border-l-4 border-red-500 bg-white/[0.02]">
                        <div className="flex-shrink-0 mt-1">
                            <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 ring-1 ring-red-500/20">
                                <span className="material-symbols-outlined text-[20px]">warning</span>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 gap-1">
                            <div className="flex justify-between items-start">
                                <p className="text-white text-sm font-bold leading-tight pr-2">Tagihan #204 Jatuh Tempo</p>
                                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-primary shadow-[0_0_8px_rgba(43,238,108,0.6)] mt-1.5"></span>
                            </div>
                            <p className="text-gray-400 text-xs line-clamp-2">Tagihan otomatis untuk Layanan Q3 memerlukan perhatian segera untuk menghindari denda.</p>
                            <p className="text-red-400/80 text-[11px] mt-1 font-medium">2m lalu • Urgensi Tinggi</p>
                            <div className="mt-3 flex gap-2">
                                <button className="flex items-center justify-center rounded-lg h-8 px-4 bg-primary hover:bg-primary/90 text-[#102216] text-xs font-bold transition-colors">
                                    Bayar Sekarang
                                </button>
                                <button className="flex items-center justify-center rounded-lg h-8 px-4 bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors border border-white/10">
                                    Detail
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Notification Item: Info (Report Ready) */}
                    <div className="group relative flex gap-4 px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer border-l-4 border-transparent hover:border-white/10">
                        <div className="flex-shrink-0 mt-1">
                            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 ring-1 ring-blue-500/20">
                                <span className="material-symbols-outlined text-[20px]">description</span>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 gap-1">
                            <div className="flex justify-between items-start">
                                <p className="text-white text-sm font-bold leading-tight pr-2">Laporan Keuangan Q3</p>
                                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-primary shadow-[0_0_8px_rgba(43,238,108,0.6)] mt-1.5"></span>
                            </div>
                            <p className="text-gray-400 text-xs">Analisis kuartalan Anda telah disusun dan siap untuk ditinjau.</p>
                            <p className="text-[#92c9a4] text-[11px] mt-1 font-medium">1j lalu • Info</p>
                            <div className="mt-3">
                                <button className="flex items-center justify-center gap-2 rounded-lg h-8 px-4 bg-[#23482f]/50 hover:bg-[#23482f] text-white text-xs font-medium transition-colors border border-primary/20 w-full sm:w-auto">
                                    <span className="material-symbols-outlined text-[16px]">download</span>
                                    Unduh PDF
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Notification Item: Warning (Budget) */}
                    <div className="group relative flex gap-4 px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer border-l-4 border-amber-500/50 bg-white/[0.02]">
                        <div className="flex-shrink-0 mt-1">
                            <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 ring-1 ring-amber-500/20">
                                <span className="material-symbols-outlined text-[20px]">pie_chart</span>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 gap-1">
                            <div className="flex justify-between items-start">
                                <p className="text-white text-sm font-bold leading-tight pr-2">Peringatan Kapasitas Anggaran</p>
                                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-primary shadow-[0_0_8px_rgba(43,238,108,0.6)] mt-1.5"></span>
                            </div>
                            <p className="text-gray-400 text-xs">Anggaran pemasaran telah mencapai 90% penggunaan bulan ini.</p>
                            <p className="text-amber-400/80 text-[11px] mt-1 font-medium">3j lalu • Peringatan</p>
                            <div className="mt-3">
                                <button className="flex items-center justify-center rounded-lg h-8 px-4 bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors border border-white/10">
                                    Tinjau Anggaran
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Section Header: Yesterday */}
                    <div className="px-6 pt-4 pb-2 mt-2 border-t border-white/5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#92c9a4]/70">Kemarin</h4>
                    </div>

                    {/* Notification Item: Success (Payment Received) */}
                    <div className="group relative flex gap-4 px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer border-l-4 border-transparent hover:border-white/10 opacity-75 hover:opacity-100">
                        <div className="flex-shrink-0 mt-1">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20">
                                <span className="material-symbols-outlined text-[20px]">payments</span>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 gap-1">
                            <div className="flex justify-between items-start">
                                <p className="text-gray-300 text-sm font-medium leading-tight">Pembayaran diterima dari Klien X</p>
                            </div>
                            <p className="text-gray-500 text-xs">$4,250.00 berhasil diproses ke akun Anda.</p>
                            <p className="text-gray-600 text-[11px] mt-1">Kemarin pukul 16:30</p>
                        </div>
                    </div>

                    {/* Notification Item: Generic (System) */}
                    <div className="group relative flex gap-4 px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer border-l-4 border-transparent hover:border-white/10 opacity-75 hover:opacity-100">
                        <div className="flex-shrink-0 mt-1">
                            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 ring-1 ring-white/10">
                                <span className="material-symbols-outlined text-[20px]">security_update</span>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 gap-1">
                            <p className="text-gray-300 text-sm font-medium leading-tight">System maintenance scheduled</p>
                            <p className="text-gray-500 text-xs">Scheduled for Oct 24th, 02:00 AM UTC. Expect downtime of 15m.</p>
                            <p className="text-gray-600 text-[11px] mt-1">Yesterday at 9:00 AM</p>
                        </div>
                    </div>

                    {/* Notification Item: Generic (Security) */}
                    <div className="group relative flex gap-4 px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer border-l-4 border-transparent hover:border-white/10 opacity-75 hover:opacity-100">
                        <div className="flex-shrink-0 mt-1">
                            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 ring-1 ring-white/10">
                                <span className="material-symbols-outlined text-[20px]">lock_clock</span>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 gap-1">
                            <p className="text-gray-300 text-sm font-medium leading-tight">Password expiration warning</p>
                            <p className="text-gray-500 text-xs">Your password will expire in 5 days. Please update it.</p>
                            <p className="text-gray-600 text-[11px] mt-1">Yesterday at 8:15 AM</p>
                        </div>
                    </div>
                </div>

                {/* Sticky Footer */}
                    <div className="p-4 border-t border-white/10 bg-background-dark/95 backdrop-blur-md shrink-0">
                    <button className="w-full flex items-center justify-center gap-2 rounded-xl h-10 px-4 bg-white/5 hover:bg-primary/20 text-primary text-sm font-bold transition-all border border-white/5 hover:border-primary/30 group">
                        Lihat Semua Notifikasi
                        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default NotificationPanel;
