import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import api from '../utils/api.config.js'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const clearError = useCallback(() => setError(null), [])

    const login = useCallback(async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
            const error = 'Username and password are required'
            setError(error)
            return error
        }

        setIsLoading(true)
        setError(null)
        
        try {
            const response = await api.post('/auth/login', credentials)
            const userData = response.data
            setUser(userData)
            return null // Success
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.'
            console.error('Login failed:', error)
            setError(errorMessage)
            return errorMessage
        } finally {
            setIsLoading(false)
        }
    }, [])

    const register = useCallback(async (credentials) => {
        if (!credentials?.username || !credentials?.password || !credentials?.conf_password) {
            const error = 'All fields are required'
            setError(error)
            return error
        }
        
        if (credentials.password !== credentials.conf_password) {
            const error = 'Passwords do not match'
            setError(error)
            return error
        }

        if (credentials.password.length < 8) {
            const error = 'Password must be at least 8 characters long'
            setError(error)
            return error
        }

        setIsLoading(true)
        setError(null)

        try {
            const response = await api.post('/auth/register', credentials)
            const newUser = response.data
            setUser(newUser)
            return null // Success
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.'
            console.error('Registration failed:', error)
            setError(errorMessage)
            return errorMessage
        } finally {
            setIsLoading(false)
        }
    }, [])


    const logout = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        
        try {
            await api.post('/auth/logout', null)
            setUser(null)
        } catch (error) {
            console.error('Logout failed:', error)
            const errorMessage = 'Logout failed. Please try again.'
            setError(errorMessage)
            return errorMessage
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
        isAuthenticated: !!user
    }), [user, isLoading, error, login, register, logout, clearError])

    useEffect(() => {
        if (user) {
            console.log('User authenticated:', user.username || 'Unknown user')
        } else {
            console.log('User logged out')
        }
    }, [user])

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
