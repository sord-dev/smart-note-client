import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

test('submits form with correct data', () => {
    const submitForm = jest.fn((user) => user); // Create a mock submitForm function
    render(<AuthenticationForm type="login" submitForm={submitForm} />);

    const usernameInput = screen.getByRole('textbox', { name: /username/i });
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Assert that form submission logic is triggered
    expect(submitForm).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'testpassword',
    });
});

