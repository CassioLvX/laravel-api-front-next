'use client';

import { createContext, useContext, useState} from 'react';
import { useRouter } from 'next/navigation';
import { User, AuthContextType } from '@/app/interfaces/userInterface';
import Cookies from 'js-cookie';
import setupAxios from '@/app/lib/axios';

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    loading: true,
    login: async () => {},
    logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const api = setupAxios();


    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/login', { email, password });

            Cookies.set('auth_token', response.data.token);
            setToken(response.data.token);
            setUser(response.data.user);

            api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
            router.push('/panel/products');

        } catch (error) {
            console.error('Erro ao tentar logar:', error);
            router.push('/login');
        }
    };

    const logout = () => {
        Cookies.remove('auth_token');
        setUser(null);
        router.push('/login');
    };

return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
};
