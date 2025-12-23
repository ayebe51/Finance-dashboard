import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import AddVendorModal from '../components/modals/AddVendorModal';

interface Vendor {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    type: 'VENDOR' | 'CLIENT';
    status: 'ACTIVE' | 'INACTIVE';
}

const Vendors: React.FC = () => {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadVendors = async () => {
        try {
            const data = await api.get('/vendors');
            setVendors(data);
        } catch (error) {
            console.error('Failed to load vendors', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadVendors();
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <AddVendorModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onSuccess={loadVendors}
            />
                        {/* Page Heading */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] text-gray-900 dark:text-white">Vendor & Klien</h1>
                                <p className="text-gray-600 dark:text-text-secondary text-base font-normal">Kelola hutang dan piutang Anda dengan efisien.</p>
                            </div>
                            <button 
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center gap-2 cursor-pointer justify-center rounded-lg h-12 px-6 bg-primary hover:bg-[#22bd56] text-[#0a160f] text-sm font-bold transition-all shadow-lg hover:shadow-primary/20"
                            >
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                <span>Tambah Kontak Baru</span>
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 dark:border-border-dark">
                            <div className="flex gap-8">
                                <a className="relative flex flex-col items-center justify-center pb-4 pt-2 group cursor-pointer" href="#">
                                    <p className="text-gray-900 dark:text-white text-sm font-bold tracking-wide">Semua Kontak</p>
                                    <div className="absolute bottom-0 w-full h-[3px] bg-primary rounded-t-full"></div>
                                </a>
                            </div>
                        </div>

                        {/* Main Data Table */}
                        <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark shadow-sm">
                            <div className="overflow-x-auto min-h-[300px]">
                                {loading ? (
                                    <div className="flex items-center justify-center h-48 text-gray-500">Memuat...</div>
                                ) : (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-card-dark border-b border-gray-200 dark:border-border-dark">
                                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-text-secondary">Nama</th>
                                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-text-secondary">Info Kontak</th>
                                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-text-secondary">Tipe</th>
                                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-text-secondary">Status</th>
                                            <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-text-secondary text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-200 dark:divide-border-dark">
                                        {vendors.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="p-8 text-center text-gray-500">Tidak ada kontak ditemukan. Klik "Tambah Kontak Baru" untuk membuat.</td>
                                            </tr>
                                        ) : (
                                            vendors.map(vendor => (
                                                <tr key={vendor.id} className="group hover:bg-gray-50 dark:hover:bg-card-dark transition-colors">
                                                    <td className="p-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                                                                {vendor.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <p className="text-gray-900 dark:text-white font-bold">{vendor.name}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-5">
                                                        <div className="flex flex-col">
                                                            <p className="text-gray-700 dark:text-white">{vendor.email || '-'}</p>
                                                            <p className="text-gray-500 dark:text-text-secondary text-xs">{vendor.phone || '-'}</p>
                                                        </div>
                                                    </td>
                                                    <td className="p-5">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                            vendor.type === 'VENDOR' 
                                                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                                        }`}>
                                                            {vendor.type === 'VENDOR' ? 'PEMASOK' : 'KLIEN'}
                                                        </span>
                                                    </td>
                                                    <td className="p-5">
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                                                            vendor.status === 'ACTIVE' 
                                                                ? 'bg-emerald-100 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-400/20'
                                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600'
                                                        }`}>
                                                            <span className="material-symbols-outlined text-[14px]">{vendor.status === 'ACTIVE' ? 'check' : 'close'}</span>
                                                            {vendor.status === 'ACTIVE' ? 'AKTIF' : 'TIDAK AKTIF'}
                                                        </span>
                                                    </td>
                                                    <td className="p-5">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button className="h-9 w-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-border-dark hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-white transition-colors">
                                                                <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                                )}
                            </div>
                    </div>
        </div>
    );
};

export default Vendors;
