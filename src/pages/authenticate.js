import React from 'react';
import { useRouter } from 'next/router';
import { AuthenticationForm } from '@/components';
import { useAuth } from '@/contexts/AuthContext';

function AuthPage() {
    const { query, push } = useRouter();
    const { login, register } = useAuth();

    const type = query?.type === 'register' ? 'register' : 'login';

    const submitForm = async (credentials) => {
        if (!credentials) return;

        let error = false;

        if (type === 'register') {
            error = await register(credentials);
        } else {
            error = await login(credentials);
        }

        if (error) {
            return error.message;
        } else {
            setTimeout(() => push('/'), 800); // Timeout because cookie needs time to set
        }
    };

    return <AuthenticationForm {...{ type, submitForm }} />;
}

export default AuthPage;
