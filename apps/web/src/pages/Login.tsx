import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await api.post('/auth/login', { email, password });
            login(data.token, data.user);
            navigate('/');
        } catch (err: any) {
            console.error('Login failed', err);
            setError(err.response?.data?.error || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark p-4 font-display">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl dark:bg-card-dark border border-gray-100 dark:border-border-dark">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Masuk ke akun Anda</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-text-secondary">
                        Atau <Link to="/register" className="font-medium text-primary hover:text-primary-hover">buat akun baru</Link>
                    </p>
                    <p className="mt-1 text-xs text-gray-400">v1.2-beta (Debug Mode)</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded-md bg-red-50 p-4 text-sm text-red-500 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20">
                            {error}
                        </div>
                    )}
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Alamat Email</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-t-md border-0 py-3 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-surface-dark dark:text-white dark:ring-border-dark dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                                placeholder="Alamat Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Kata Sandi</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full rounded-b-md border-0 py-3 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-surface-dark dark:text-white dark:ring-border-dark dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                                placeholder="Kata Sandi"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative flex w-full justify-center rounded-lg bg-primary px-3 py-3 text-sm font-bold text-[#102216] hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Sedang masuk...' : 'Masuk'}
                        </button>
                    </div>
                </form>

                {/* Diagnostic Section */}
                <div className="mt-8 border-t pt-6 text-center">
                    <p className="text-xs text-gray-500 mb-2">Troubleshooting Tools</p>
                    <button
                        onClick={async () => {
                            try {
                                alert(`Checking API at: ${api.defaults.baseURL}`);
                                const res = await api.get('/health-db');
                                alert(`Success! DB Status: ${JSON.stringify(res)}`);
                            } catch (e: any) {
                                alert(`Error: ${e.response?.data?.message || e.message}`);
                            }
                        }}
                        type="button"
                        className="text-xs bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-gray-700"
                    >
                        Test Server & DB Connection
                    </button>
                    <p className="text-[10px] text-gray-400 mt-2">
                        API URL: {import.meta.env.VITE_API_URL || '(default)'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
