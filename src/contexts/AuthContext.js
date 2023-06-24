import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const BASE_URL = 'http://localhost:3001';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        if (!credentials.username || !credentials.password) return;
        try {
            const response = await axios.post(BASE_URL + '/auth/login', credentials, {
                withCredentials: true, // Enable sending cookies with the request
            });

            const userData = response.data;
            setUser(userData);
            console.log(userData)
        } catch (error) {
            console.error('Login failed:', error);

        }
    };

    const register = async (credentials) => {
        console.log(credentials)
        console.log(credentials.password != credentials.conf_pasword)
        if (!credentials.username || !credentials.password) return;
        if (credentials.password != credentials.conf_password) return;

        try {
            const response = await axios.post(BASE_URL + '/auth/register', credentials, {
                withCredentials: true, // Enable sending cookies with the request
            });

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
            await axios.post(BASE_URL + '/api/logout', null, {
                withCredentials: true, // Enable sending cookies with the request
            });
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
