import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthenticationForm } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import Head from 'next/head';
import { useSEOConfig } from '@/contexts/SEOContext';

function AuthPage() {
    const { query, push } = useRouter();
    const { login, register } = useAuth();
    const { SEOConfig, configureSEO } = useSEOConfig();

    const type = query?.type === 'register' ? 'register' : 'login';

    const submitForm = async (credentials) => {
        if (!credentials) return;

        let error = false;

        if (type === 'register') {
            try {
                await register(credentials);
            } catch (error) {
                error = error;
            }
        } else {
            try {
                await login(credentials);
            } catch (error) {
                error = error;
            }
        }

        if (error) {
            return error?.message;
        } else {
            // Remove the setTimeout and use the useRouter().push() directly
            push('/'); // Redirect to the main page
        }
    };


    useEffect(() => {
        const capitalisedFormType = type[0].toUpperCase() + type.slice(1, type.length);
        configureSEO({ title: `SmartNote - ${capitalisedFormType}` });
    }, [type])

    return (
        <>
            <Head>
                <title>{SEOConfig?.title}</title>
            </Head>
            <AuthenticationForm {...{ type, submitForm }} />
        </>
    );
}

export default AuthPage;
