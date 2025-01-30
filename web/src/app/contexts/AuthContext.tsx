'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, AuthContextType } from '@/app/interfaces/userInterface';
import Cookies from 'js-cookie';
import setupAxios from '@/app/lib/axios';

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => {},
    logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const api = setupAxios();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = Cookies.get('auth_token');

                if (token) {
                    api.defaults.headers.Authorization = `Bearer ${token}`;
                    const response = await api.get('/user');

                    setUser(response.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.log('Não autenticado');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
            fetchUser();
        }, []);


    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/login', { email, password });

            Cookies.set('auth_token', response.data.token)
            api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

            const responseUser = await api.get('/user');

            setUser(responseUser.data.user);

            router.push('/panel/products');

        } catch (error) {
            console.error('Erro ao tentar logar:', error);
            router.push('/login');
        }
    };

    const logout = () => {
        console.log('oi');
        Cookies.remove('auth_token');
        setUser(null);
        router.push('/login');
    };

return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
};
