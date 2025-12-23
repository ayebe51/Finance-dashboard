import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    transactionId: string;
    amount: number;
    description: string;
    onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, transactionId, amount, description, onSuccess }) => {
    const [step, setStep] = useState<'LOADING' | 'QRIS' | 'CHECKING' | 'SUCCESS'>('LOADING');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen && transactionId) {
            generateQR();
        } else {
            // Reset state on close
            setStep('LOADING');
            setError('');
        }
    }, [isOpen, transactionId]);

    const generateQR = async () => {
        setStep('LOADING');
        setError('');
        try {
            await api.post('/payments/qris/generate', { transactionId });
            setStep('QRIS');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Gagal membuat QRIS');
            setStep('QRIS'); // Stay on QRIS view but verify error handling
        }
    };

    const handleCheckStatus = async () => {
        setStep('CHECKING');
        try {
            const response = await api.post('/payments/qris/check', { transactionId });
            if (response.data.success) {
                setStep('SUCCESS');
                setTimeout(() => {
                    onSuccess();
                    onClose();
                }, 1500);
            } else {
                setError('Pembayaran belum diterima. Silakan coba lagi.');
                setStep('QRIS');
            }
        } catch (err: any) {
            setError('Gagal memeriksa status');
            setStep('QRIS');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-card-dark rounded-2xl w-full max-w-sm p-6 shadow-xl border border-gray-200 dark:border-border-dark flex flex-col items-center text-center">
                
                {/* Header */}
                <div className="w-full flex justify-between items-start mb-4">
                    <div className="text-left">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pembayaran QRIS</h2>
                        <p className="text-sm text-gray-500 dark:text-text-secondary">Scan untuk membayar tagihan</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Amount */}
                <div className="mb-6">
                    <p className="text-sm text-gray-500 dark:text-text-secondary mb-1">Total Tagihan</p>
                    <p className="text-3xl font-bold text-primary">Rp {amount.toLocaleString('id-ID')}</p>
                    <p className="text-xs text-gray-400 mt-1">{description}</p>
                </div>

                {/* Content based on Step */}
                <div className="w-full bg-white p-4 rounded-xl border-2 border-dashed border-gray-200 mb-6 flex items-center justify-center min-h-[250px]">
                    {step === 'LOADING' && (
                        <div className="flex flex-col items-center gap-3">
                            <span className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></span>
                            <p className="text-sm text-gray-500">Membuat Kode QRIS...</p>
                        </div>
                    )}

                    {step === 'QRIS' && !error && (
                        <div className="flex flex-col items-center">
                            <img 
                                src="/assets/qris_mock.png" 
                                alt="QRIS Code" 
                                className="w-48 h-48 object-contain mb-2"
                            />
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span className="material-symbols-outlined text-sm">timer</span>
                                Berlaku hingga 15 menit
                            </div>
                        </div>
                    )}

                    {step === 'CHECKING' && (
                        <div className="flex flex-col items-center gap-3">
                            <span className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></span>
                            <p className="text-sm text-gray-500">Memeriksa Pembayaran...</p>
                        </div>
                    )}
                     
                    {step === 'SUCCESS' && (
                         <div className="flex flex-col items-center gap-3 animate-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-4xl">check</span>
                            </div>
                            <p className="text-lg font-bold text-gray-900">Pembayaran Berhasil!</p>
                        </div>
                    )}

                    {error && (
                        <div className="flex flex-col items-center gap-2 text-red-500 px-4">
                             <span className="material-symbols-outlined text-3xl">error_outline</span>
                             <p className="text-sm font-medium">{error}</p>
                             <button onClick={generateQR} className="text-xs underline hover:text-red-700 mt-2">Coba Lagi</button>
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                {step === 'QRIS' && (
                    <button
                        onClick={handleCheckStatus}
                        className="w-full bg-primary hover:bg-primary-hover text-[#112217] font-bold py-3 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
                    >
                        Saya Sudah Bayar
                    </button>
                )}
                
                {step === 'LOADING' || step === 'CHECKING' ? (
                     <p className="text-xs text-gray-400">Mohon jangan tutup halaman ini</p>
                ) : null}

            </div>
        </div>
    );
};

export default PaymentModal;
