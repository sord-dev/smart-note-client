import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import axios from 'axios';

// Mock axios module
jest.mock('axios');

describe('AuthContext', () => {
    test('should login and update user data', async () => {
        // Mock the response data
        const userData = {
            username: 'testuser',
            createdAt: 'some random date',
        };

        // Mock the axios post method
        axios.post.mockResolvedValue({ data: userData });

        // Render the hook within the AuthProvider
        const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
        const { result } = renderHook(() => useAuth(), { wrapper });

        // Invoke the login function
        await act(async () => {
            await result.current.login({ username: 'testuser', password: 'password' });
        });
        // Assert that the user data has been updated
        expect(result.current.user).toEqual(userData);
    });

    test('should handle login error', async () => {
        // Mock the error response
        const error = { error: 'Invalid credentials' };

        // Mock the axios post method to throw an error
        axios.post.mockRejectedValue({ response: { data: error } });

        // Render the hook within the AuthProvider
        const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
        const { result } = renderHook(() => useAuth(), { wrapper });

        // Invoke the login function
        await act(async () => {
            await result.current.login({ username: 'testuser', password: 'password' });
        });

        // Assert that the user data is still null
        expect(result.current.user).toBeNull();
    });

    // Add similar tests for register and logout functions
});
