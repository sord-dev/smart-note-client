import api from '@/utils/api.config';
import React, { createContext, useContext, useEffect, useState } from 'react';
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        if (!credentials.username || !credentials.password) return;

        try {
            const response = await api.post('/auth/login', credentials);

            const userData = response.data;
            setUser(userData);
        } catch (error) {
            console.error('Login failed:', error);
            return error.response?.data;
        }
    };

    const register = async (credentials) => {
        console.log(credentials.password != credentials.conf_pasword)
        if (!credentials.username || !credentials.password) return;
        if (credentials.password != credentials.conf_password) return;

        try {
            const response = await api.post('/auth/register', credentials);

            console.log(response)

            const newUser = response.data;
            setUser(newUser);
        } catch (error) {
            console.error('Registration failed:', error);
            return error.response?.data;
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout', null);
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
            return error.response.data;
        }
    };

    useEffect(() => {
        console.log('current user:', user);
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
