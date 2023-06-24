import React from 'react';
import { useRouter } from 'next/router';
import { AuthenticationForm } from '@/components';
import { useAuth } from '@/contexts/AuthContext';

function AuthPage() {
    const { query } = useRouter();
    const { login, register } = useAuth();

    const type = query?.type === 'register' ? 'register' : 'login';

    const handleSubmit = async (credentials) => {
        let error = null;

        if (type === 'register') {
            error = await register(credentials);
        } else if (type === 'login') {
            error = await login(credentials);
        }

        if (error) {
            return error.error;
        }

    };

    return <AuthenticationForm type={type} submitForm={handleSubmit} />;
}

export default AuthPage;