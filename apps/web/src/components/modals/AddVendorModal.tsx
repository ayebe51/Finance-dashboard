import React, { useState } from 'react';
import { api } from '../../lib/api';

interface AddVendorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddVendorModal: React.FC<AddVendorModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('VENDOR');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/vendors', {
                name,
                email,
                phone,
                type
            });
            onSuccess();
            onClose();
            // Reset form
            setName('');
            setEmail('');
            setPhone('');
            setType('VENDOR');
        } catch (error) {
            console.error('Failed to create vendor', error);
            alert('Failed to create vendor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-card-dark rounded-xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-border-dark overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-border-dark">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add New Contact</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-surface-dark text-gray-500 dark:text-text-secondary transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                    {/* Type Selection */}
                    <div className="flex p-1 bg-gray-100 dark:bg-surface-dark rounded-lg">
                        <button
                            type="button"
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${type === 'VENDOR' ? 'bg-white dark:bg-primary text-gray-900 dark:text-[#102216] shadow-sm' : 'text-gray-500 dark:text-text-secondary'}`}
                            onClick={() => setType('VENDOR')}
                        >
                            Vendor (Hutang)
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${type === 'CLIENT' ? 'bg-white dark:bg-primary text-gray-900 dark:text-[#102216] shadow-sm' : 'text-gray-500 dark:text-text-secondary'}`}
                            onClick={() => setType('CLIENT')}
                        >
                            Client (Piutang)
                        </button>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold uppercase text-gray-500 dark:text-text-secondary">Name</label>
                        <input 
                            required
                            className="w-full h-10 px-3 rounded-lg bg-gray-50 dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors"
                            placeholder="Company or Person Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold uppercase text-gray-500 dark:text-text-secondary">Email</label>
                        <input 
                            type="email"
                            className="w-full h-10 px-3 rounded-lg bg-gray-50 dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors"
                            placeholder="contact@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold uppercase text-gray-500 dark:text-text-secondary">Phone</label>
                        <input 
                            type="tel"
                            className="w-full h-10 px-3 rounded-lg bg-gray-50 dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors"
                            placeholder="+62..."
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg text-sm font-bold text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="px-4 py-2 rounded-lg text-sm font-bold bg-primary text-[#102216] hover:bg-primary-hover hover:shadow-lg transition-all disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Contact'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVendorModal;
