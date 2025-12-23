import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

interface User {
    id: string;
    email: string;
    name?: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    // We need to set the header for this request manually or rely on the interceptor if we set it there
                    // But since api.ts might not have the token yet if we don't store it globally, 
                    // let's assume api.ts will have a way to inject it or we pass it.
                    // Actually, a better pattern is to set the default header in api.ts whenever token changes.
                    // For now, let's verify the token validity by fetching user
                    
                    // Temporary hack: we might need to configure axios to use this token immediately
                    // But for this 'me' endpoint, let's try calling it.
                    // The api.ts interceptor needs to read from localStorage or this context.
                    // Since api.ts is separate, reading from localStorage is safest there.
                    
                    const userData = await api.get('/auth/me');
                    setUser(userData);
                } catch (error) {
                    console.error('Failed to load user', error);
                    logout();
                }
            }
            setLoading(false);
        };

        loadUser();
    }, [token]);

    const login = (newToken: string, newUser: User) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
