import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/api.config.js';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        if (!credentials.username || !credentials.password) return;

        try {
            const response = await api.post('/auth/login', credentials);

            const userData = response.data.user; // Update this line to extract the user data
            setUser(userData);

            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error(error.response?.data || error?.message);
        }
    };

    const register = async (credentials) => {
        if (!credentials.username || !credentials.password || !credentials.conf_password) return;
        if (credentials.password !== credentials.conf_password) return;

        try {
            const response = await api.post('/auth/register', credentials);

            const newUser = response.data.user; // Update this line to extract the user data
            setUser(newUser);
        } catch (error) {
            console.error('Registration failed:', error);
            throw new Error(error.response?.data || error?.message);
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
