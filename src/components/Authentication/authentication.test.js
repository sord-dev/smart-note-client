import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthenticationForm } from '.';

test('renders login form', () => {
    render(<AuthenticationForm type="login" />);

    const loginForm = screen.getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    // Assert that all required elements are present
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
});

test('renders register form', () => {
    render(<AuthenticationForm type="register" />);

    const registerForm = screen.getByTestId('register-form');
    expect(registerForm).toBeInTheDocument();

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /register/i });

    // Assert that all required elements are present
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
});

