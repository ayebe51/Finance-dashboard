import React, { useState } from 'react';
import { api } from '../../lib/api';

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState('EXPENSE');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [parentId, setParentId] = useState('');
    const [categories, setCategories] = useState<any[]>([]);

    React.useEffect(() => {
        if (isOpen) {
            loadParentCategories();
        }
    }, [isOpen]);

    const loadParentCategories = async () => {
        try {
            const data = await api.get('/categories');
            setCategories(data);
        } catch (error) {
            console.error('Failed to load categories', error);
        }
    };

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!name) {
            alert('Category name is required');
            return;
        }

        setLoading(true);
        try {
            await api.post('/categories', {
                name,
                type,
                icon: 'category', // Default icon for now
                color: 'slate',   // Default color
                parentId: parentId || null,
            });
            if (onSuccess) onSuccess();
            onClose();
            // Reset form
            setName('');
            setCode('');
            setDescription('');
            setType('EXPENSE');
            setParentId('');
        } catch (error) {
            console.error('Failed to create category', error);
            alert('Failed to create category');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
            {/* Modal Container */}
            <div className="relative w-full max-w-[640px] max-h-[90vh] flex flex-col rounded-xl bg-white dark:bg-card-dark shadow-2xl overflow-hidden border border-slate-200 dark:border-border-dark">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-border-dark">
                    <h3 className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Add New Category</h3>
                    <button 
                        onClick={onClose}
                        aria-label="Close modal" 
                        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-surface-dark text-slate-500 dark:text-text-secondary transition-colors"
                    >
                        <span className="material-symbols-outlined text-2xl">close</span>
                    </button>
                </div>
                
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-6 py-2">
                    {/* Section 1: Classification */}
                    <div className="py-4">
                        <div className="flex flex-col gap-5">
                            {/* Toggle */}
                            <div className="flex w-full">
                                <div className="flex h-12 w-full items-center justify-center rounded-lg bg-slate-100 dark:bg-surface-dark p-1">
                                    <label className={`group flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 ${type === 'EXPENSE' ? 'bg-white dark:bg-card-dark shadow-sm text-slate-900 dark:text-primary' : 'text-slate-500 dark:text-text-secondary'} text-sm font-bold transition-all`}>
                                        <span className="truncate">Expense</span>
                                        <input 
                                            className="invisible w-0" 
                                            name="category_type" 
                                            type="radio" 
                                            value="EXPENSE" 
                                            checked={type === 'EXPENSE'}
                                            onChange={(e) => setType(e.target.value)}
                                        />
                                    </label>
                                    <label className={`group flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 ${type === 'INCOME' ? 'bg-white dark:bg-card-dark shadow-sm text-slate-900 dark:text-primary' : 'text-slate-500 dark:text-text-secondary'} text-sm font-bold transition-all`}>
                                        <span className="truncate">Income</span>
                                        <input 
                                            className="invisible w-0" 
                                            name="category_type" 
                                            type="radio" 
                                            value="INCOME"
                                            checked={type === 'INCOME'}
                                            onChange={(e) => setType(e.target.value)}
                                        />
                                    </label>
                                </div>
                            </div>
                            
                            {/* Parent Category */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-white">Parent Category</label>
                                <div className="relative">
                                    <select 
                                        aria-label="Select Parent Category"
                                        title="Select Parent Category"
                                        className="appearance-none w-full h-12 rounded-lg border border-slate-300 dark:border-border-dark bg-white dark:bg-surface-dark px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                                        value={parentId}
                                        onChange={(e) => setParentId(e.target.value)}
                                    >
                                        <option className="text-slate-500" value="">None (Main Category)</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500 dark:text-text-secondary">
                                        <span className="material-symbols-outlined">expand_more</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full h-px bg-slate-100 dark:bg-border-dark my-2"></div>
                    
                    {/* Section 2: Details */}
                    <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-white">Category Name</label>
                            <input 
                                className="h-12 w-full rounded-lg border border-slate-300 dark:border-border-dark bg-white dark:bg-surface-dark px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                                placeholder="e.g. Office Supplies" 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        
                        {/* Code */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-white">Category Code</label>
                            <div className="flex w-full items-stretch rounded-lg">
                                <input 
                                    className="flex-1 min-w-0 h-12 rounded-l-lg border border-r-0 border-slate-300 dark:border-border-dark bg-white dark:bg-surface-dark px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent z-10" 
                                    placeholder="e.g. EXP-001" 
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                                <button className="flex items-center justify-center px-4 rounded-r-lg bg-slate-100 dark:bg-border-dark border border-l-0 border-slate-300 dark:border-border-dark hover:bg-slate-200 dark:hover:bg-surface-dark transition-colors text-slate-600 dark:text-text-secondary" title="Auto-generate Code">
                                    <span className="material-symbols-outlined text-[20px]">autorenew</span>
                                </button>
                            </div>
                        </div>
                        
                        {/* Description */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-white">Description <span className="font-normal text-slate-400 dark:text-text-secondary">(Optional)</span></label>
                            <textarea 
                                className="w-full rounded-lg border border-slate-300 dark:border-border-dark bg-white dark:bg-surface-dark px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[80px] resize-none" 
                                placeholder="Briefly explain what this category covers..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    
                    <div className="w-full h-px bg-slate-100 dark:bg-border-dark my-2"></div>
                    
                    {/* Section 3: Appearance */}
                    <div className="py-4 flex flex-col gap-5">
                        {/* Icon Picker */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-white">Icon</label>
                            <div className="flex flex-wrap gap-3">
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-slate-900 ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-background-dark">
                                    <span className="material-symbols-outlined text-[20px]">payments</span>
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-surface-dark text-slate-500 dark:text-text-secondary hover:bg-slate-200 dark:hover:bg-card-dark transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-surface-dark text-slate-500 dark:text-text-secondary hover:bg-slate-200 dark:hover:bg-card-dark transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">flight</span>
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-surface-dark text-slate-500 dark:text-text-secondary hover:bg-slate-200 dark:hover:bg-card-dark transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">restaurant</span>
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-surface-dark text-slate-500 dark:text-text-secondary hover:bg-slate-200 dark:hover:bg-card-dark transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">home</span>
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-surface-dark text-slate-500 dark:text-text-secondary hover:bg-slate-200 dark:hover:bg-card-dark transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                                </button>
                            </div>
                        </div>
                        
                        {/* Color Picker */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-white">Color Label</label>
                            <div className="flex flex-wrap gap-4">
                                {/* Selected Color */}
                                <button title="Green" className="w-8 h-8 rounded-full bg-[#2bee6c] ring-2 ring-offset-2 ring-slate-400 dark:ring-offset-background-dark"></button>
                                {/* Other Colors */}
                                <button title="Red" className="w-8 h-8 rounded-full bg-[#FF6B6B] hover:scale-110 transition-transform"></button>
                                <button title="Teal" className="w-8 h-8 rounded-full bg-[#4ECDC4] hover:scale-110 transition-transform"></button>
                                <button title="Yellow" className="w-8 h-8 rounded-full bg-[#FFE66D] hover:scale-110 transition-transform"></button>
                                <button title="Blue" className="w-8 h-8 rounded-full bg-[#1A535C] hover:scale-110 transition-transform"></button>
                                <button title="Orange" className="w-8 h-8 rounded-full bg-[#FF9F1C] hover:scale-110 transition-transform"></button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full h-px bg-slate-100 dark:bg-border-dark my-2"></div>
                    
                    {/* Section 4: Configuration */}
                    <div className="py-4 flex flex-col gap-4">
                        <label className="flex items-center justify-between cursor-pointer group">
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-slate-700 dark:text-white group-hover:text-primary transition-colors">Enable Budget Tracking</span>
                                <span className="text-xs text-slate-500 dark:text-text-secondary">Track spending limits for this category</span>
                            </div>
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input defaultChecked className="sr-only peer" type="checkbox" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-surface-dark peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            </div>
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-slate-700 dark:text-white group-hover:text-primary transition-colors">Mark as Tax Deductible</span>
                                <span className="text-xs text-slate-500 dark:text-text-secondary">Transactions will be flagged for tax reports</span>
                            </div>
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input className="sr-only peer" type="checkbox" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-surface-dark peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            </div>
                        </label>
                    </div>
                </div>
                
                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 px-6 py-5 border-t border-slate-100 dark:border-border-dark bg-slate-50 dark:bg-card-dark">
                    <button 
                        onClick={onClose}
                        className="w-full sm:w-auto px-6 h-12 rounded-lg border border-slate-300 dark:border-border-dark text-slate-700 dark:text-white font-bold text-sm hover:bg-slate-100 dark:hover:bg-surface-dark transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-text-secondary"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`w-full sm:w-auto px-6 h-12 rounded-lg bg-primary hover:bg-[#25d360] text-slate-900 font-bold text-sm transition-colors shadow-lg shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-background-dark ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Saving...' : 'Save Category'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryModal;
