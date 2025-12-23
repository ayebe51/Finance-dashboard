import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

interface Category {
    id: string;
    name: string;
    children?: Category[];
}

const AddTransaction: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // const [categories, setCategories] = useState<Category[]>([]); // Squelching unused variable warning
    
    // Form State
    const [type, setType] = useState('EXPENSE');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [categoryId, setCategoryId] = useState('');
    const [account, setAccount] = useState('');
    const [merchant, setMerchant] = useState('');
    const [description, setDescription] = useState('');

    // Recurring State
    const [isRecurring, setIsRecurring] = useState(false);
    const [interval, setInterval] = useState('MONTHLY');

    // ... (existing helper functions)
    const flattenCategories = (cats: Category[], prefix = ''): { id: string, name: string }[] => {
        let result: { id: string, name: string }[] = [];
        cats.forEach(cat => {
            result.push({ id: cat.id, name: prefix + cat.name });
            if (cat.children && cat.children.length > 0) {
                result = result.concat(flattenCategories(cat.children, prefix + cat.name + ' > '));
            }
        });
        return result;
    };

    const [flatCategories, setFlatCategories] = useState<{ id: string, name: string }[]>([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await api.get('/categories');
                // setCategories(data);
                setFlatCategories(flattenCategories(data));
            } catch (error) {
                console.error('Failed to load categories', error);
            }
        };
        loadCategories();
    }, []);

    const handleClose = () => {
        navigate(-1);
    };

    const handleSubmit = async () => {
        if (!amount || !categoryId || !account) {
            alert('Harap isi semua bidang yang wajib diisi');
            return;
        }

        setLoading(true);
        try {
            const data: any = {
                date: new Date(date).toISOString(),
                description,
                amount: parseFloat(amount),
                type,
                categoryId,
                account,
                merchant
            };

            if (isRecurring) {
                // Create Recurring Profile
                await api.post('/recurring', {
                    ...data,
                    interval,
                    nextRun: date // First run is the selected date
                });
                alert('Transaksi berulang berhasil diatur!');
            } else {
                // Create One-time Transaction
                await api.post('/transactions', {
                    ...data,
                    status: 'COMPLETED'
                });
            }
            
            navigate('/transactions');
        } catch (error) {
            console.error('Failed to create transaction', error);
            alert('Gagal menyimpan transaksi');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-white overflow-hidden h-screen w-full relative">
            {/* Main App Background Simulation */}
            <div className="relative h-full w-full flex items-center justify-center p-4">
                {/* Abstract Background Image */}
                <img 
                    className="absolute inset-0 z-0 w-full h-full object-cover opacity-30" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPMkxyXzpDFSUMWo3uUdTLoVKPoab444JpgBu93i7wMme6k4fhmdsouKIzi4IWpmT09m8XeWBVvJtWmhmhILHUzUqaB8lJC9wt0Uv6y5XOtI7o0aAYB-0NfuGjO3EcYBZ7sh3RgNXI_QF0jPAZ-t8kHBSKa7Vbo5pC2LTOqsSWPwIF3CX_e64_natOHd6jMPvDoHhWbhCDxPGOdEM4t6H7ZTVQb8CNxlvVXLafzRFc1qq92lmvBKyeWpZvAboeHlqmpoLTp8iCj7o"
                    alt="Background"
                />
                <div className="absolute inset-0 z-0 bg-[#102216]/80 backdrop-blur-sm"></div>
                
                {/* Modal Container */}
                <div className="relative z-10 w-full max-w-[800px] flex flex-col bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-border-dark shadow-2xl max-h-[90vh] animate-fade-in-up">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-border-dark shrink-0">
                        <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-tight">Tambah Transaksi Baru</h2>
                        <button 
                            onClick={handleClose}
                            className="text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-white transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-surface-dark"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto flex-1">
                        <div className="p-6 space-y-8">
                            {/* Segmented Control (Type) & Amount Section */}
                            <div className="flex flex-col gap-6">
                                {/* Type Switcher */}
                                <div className="flex justify-center">
                                    <div className="flex h-12 w-full max-w-[320px] items-center justify-center rounded-lg bg-gray-100 dark:bg-surface-dark p-1 border border-gray-200 dark:border-border-dark">
                                        <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 ${type === 'EXPENSE' ? 'bg-white dark:bg-primary text-primary dark:text-[#102216] shadow-sm' : 'text-gray-500 dark:text-text-secondary'} transition-all duration-200 hover:text-gray-900 dark:hover:text-white`}>
                                            <span className="text-sm font-bold truncate">Pengeluaran</span>
                                            <input 
                                                className="invisible w-0" 
                                                name="transaction_type" 
                                                type="radio" 
                                                value="EXPENSE" 
                                                checked={type === 'EXPENSE'} 
                                                onChange={(e) => setType(e.target.value)} 
                                            />
                                        </label>
                                        <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 ${type === 'INCOME' ? 'bg-white dark:bg-primary text-primary dark:text-[#102216] shadow-sm' : 'text-gray-500 dark:text-text-secondary'} transition-all duration-200 hover:text-gray-900 dark:hover:text-white`}>
                                            <span className="text-sm font-bold truncate">Pemasukan</span>
                                            <input 
                                                className="invisible w-0" 
                                                name="transaction_type" 
                                                type="radio" 
                                                value="INCOME" 
                                                checked={type === 'INCOME'}
                                                onChange={(e) => setType(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                </div>
                                {/* Amount Input (Hero) */}
                                <div className="flex flex-col items-center justify-center">
                                    <label className="text-gray-500 dark:text-text-secondary text-xs font-semibold uppercase tracking-wider mb-2">Total Jumlah</label>
                                    <div className="relative w-full max-w-[300px] group">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-medium text-gray-400 dark:text-[#5c8a6b] group-focus-within:text-primary transition-colors">Rp</span>
                                        <input 
                                            className="w-full bg-transparent border-b-2 border-gray-200 dark:border-border-dark text-center text-5xl font-bold text-gray-900 dark:text-white focus:border-primary focus:ring-0 focus:outline-none placeholder:text-gray-300 dark:placeholder:text-[#326744] py-2 pl-8 transition-colors caret-primary" 
                                            placeholder="0" 
                                            type="number"
                                            value={amount}
                                            title="Masukkan Jumlah"
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Form Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Date */}
                                <label className="flex flex-col gap-2">
                                    <span className="text-gray-700 dark:text-white text-sm font-medium">Tanggal</span>
                                    <div className="relative group">
                                        <input 
                                            className="w-full bg-gray-50 dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-lg text-gray-900 dark:text-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-[52px] transition-all placeholder-shown:text-gray-400 dark:placeholder-shown:text-text-secondary" 
                                            type="date" 
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-text-secondary pointer-events-none group-focus-within:text-primary transition-colors">calendar_today</span>
                                    </div>
                                </label>
                                {/* Category */}
                                <label className="flex flex-col gap-2">
                                    <span className="text-gray-700 dark:text-white text-sm font-medium">Kategori</span>
                                    <div className="relative group">
                                        <select 
                                            className="w-full bg-gray-50 dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-lg text-gray-900 dark:text-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-[52px] appearance-none cursor-pointer transition-all" 
                                            value={categoryId}
                                            onChange={(e) => setCategoryId(e.target.value)}
                                        >
                                            <option value="">Pilih kategori...</option>
                                            {flatCategories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-text-secondary pointer-events-none group-focus-within:text-primary transition-colors">expand_more</span>
                                    </div>
                                </label>
                                {/* Payment Account */}
                                <label className="flex flex-col gap-2">
                                    <span className="text-gray-700 dark:text-white text-sm font-medium">Akun Pembayaran</span>
                                    <div className="relative group">
                                        <select 
                                            className="w-full bg-gray-50 dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-lg text-gray-900 dark:text-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-[52px] appearance-none cursor-pointer transition-all" 
                                            value={account}
                                            onChange={(e) => setAccount(e.target.value)}
                                        >
                                            <option value="">Pilih akun...</option>
                                            <option value="Chase Checking">Chase Checking (...4421)</option>
                                            <option value="Amex Business">Amex Business (...9921)</option>
                                            <option value="Petty Cash">Petty Cash</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-text-secondary pointer-events-none group-focus-within:text-primary transition-colors">account_balance_wallet</span>
                                    </div>
                                </label>
                                {/* Vendor */}
                                <label className="flex flex-col gap-2">
                                    <span className="text-gray-700 dark:text-white text-sm font-medium">Penyedia / Penerima</span>
                                    <div className="relative group">
                                        <input 
                                            className="w-full bg-gray-50 dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-lg text-gray-900 dark:text-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 dark:placeholder:text-[#5c8a6b] h-[52px] transition-all" 
                                            placeholder="Masukkan nama..." 
                                            type="text" 
                                            value={merchant}
                                            onChange={(e) => setMerchant(e.target.value)}
                                        />
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-text-secondary pointer-events-none group-focus-within:text-primary transition-colors">storefront</span>
                                    </div>
                                </label>
                            </div>

                            {/* Description */}
                            <label className="flex flex-col gap-2">
                                <span className="text-gray-700 dark:text-white text-sm font-medium">Deskripsi</span>
                                <textarea 
                                    className="w-full bg-gray-50 dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-lg text-gray-900 dark:text-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 dark:placeholder:text-[#5c8a6b] resize-none transition-all" 
                                    placeholder="Tambahkan catatan tentang transaksi ini..." 
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </label>

                            {/* Attachments Dropzone */}
                            <div>
                                <span className="text-gray-700 dark:text-white text-sm font-medium mb-2 block">Lampiran</span>
                                <div className="border-2 border-dashed border-gray-300 dark:border-border-dark rounded-lg bg-gray-50 dark:bg-surface-dark/30 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-surface-dark/80 hover:border-primary/50 transition-all group">
                                    <div className="bg-gray-200 dark:bg-border-dark p-3 rounded-full mb-3 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                                        <span className="material-symbols-outlined text-gray-500 dark:text-primary text-2xl">upload_file</span>
                                    </div>
                                    <p className="text-gray-500 dark:text-text-secondary text-sm mb-1 group-hover:text-gray-900 dark:group-hover:text-white transition-colors font-medium">Klik untuk unggah atau seret dan lepas</p>
                                    <p className="text-gray-400 dark:text-[#5c8a6b] text-xs">SVG, PNG, JPG atau PDF (maks. 5MB)</p>
                                </div>
                            </div>

                            {/* Recurring Toggle */}
                            <div className="flex flex-col gap-4 py-2 px-1">
                                <div className="flex items-center gap-3">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            aria-label="Toggle Recurring Transaction" 
                                            title="Toggle Recurring Transaction" 
                                            className="sr-only peer" 
                                            type="checkbox" 
                                            checked={isRecurring}
                                            onChange={(e) => setIsRecurring(e.target.checked)}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 dark:bg-surface-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-gray-200 dark:border-border-dark"></div>
                                    </label>
                                    <span className="text-sm font-medium text-gray-700 dark:text-white cursor-pointer" onClick={() => setIsRecurring(!isRecurring)}>Buat transaksi ini berulang</span>
                                </div>

                                {isRecurring && (
                                    <div className="animate-fade-in-down pl-14">
                                        <label className="flex flex-col gap-2">
                                            <span className="text-gray-700 dark:text-white text-sm font-medium">Interval Pengulangan</span>
                                            <div className="relative group max-w-[200px]">
                                                <select 
                                                    className="w-full bg-gray-50 dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-lg text-gray-900 dark:text-white px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer transition-all"
                                                    value={interval}
                                                    onChange={(e) => setInterval(e.target.value)}
                                                >
                                                    <option value="DAILY">Harian</option>
                                                    <option value="WEEKLY">Mingguan</option>
                                                    <option value="MONTHLY">Bulanan</option>
                                                    <option value="YEARLY">Tahunan</option>
                                                </select>
                                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-text-secondary pointer-events-none text-lg">expand_more</span>
                                            </div>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 dark:border-border-dark p-6 bg-gray-50 dark:bg-background-dark flex justify-end gap-3 shrink-0 z-20 rounded-b-xl">
                        <button 
                            onClick={handleClose}
                            className="px-6 py-3 rounded-lg border border-gray-200 dark:border-border-dark text-gray-700 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-surface-dark hover:text-gray-900 dark:hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                            disabled={loading}
                        >
                            Batal
                        </button>
                        <button 
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`px-8 py-3 rounded-lg bg-primary text-[#102216] font-bold hover:bg-primary-hover hover:shadow-[0_0_15px_rgba(43,238,108,0.3)] transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-white dark:focus:ring-offset-background-dark ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Menyimpan...' : 'Simpan Transaksi'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTransaction;
