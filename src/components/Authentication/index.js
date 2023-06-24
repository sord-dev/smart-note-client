import React from 'react'

const FormTypes = ['login', 'register'];

export const AuthenticationForm = ({ type, submitForm }) => {
    if (!FormTypes.some(t => t == type.toLowerCase())) return 'Provide Valid Form Type';
    const computedType = type === 'login' ? 'Login' : 'Register';

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        submitForm(formValues);
    };

    return (
        <form onSubmit={handleSubmit} data-testid={`${computedType.toLowerCase()}-form`}>
            <h2>{computedType}</h2>
            {/* Display respective form fields based on type */}
            {type === 'login' && <LoginForm />}
            {type === 'register' && <RegisterForm />}
            <button role='button' type="submit">{computedType}</button>
        </form>
    );
};

const LoginForm = () => {
    return (
        <div>
            <label htmlFor="username">Username</label>
            <input type="username" name="username" id='username' />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id='password' />
        </div>
    )
}


const RegisterForm = () => {
    return (
        <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id='username' />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id='password' />

            <label htmlFor="conf_password">Confirm Password</label>
            <input type="password" name="conf_password" id='conf_password' />
        </div>
    )
}




