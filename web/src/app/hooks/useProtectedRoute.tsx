import { useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const useProtectedRoute = () => {
    const { loading, token } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !token) {
            router.push('/login');
        }
    }, [token, loading, router]);

    return token;
};

export default useProtectedRoute;
