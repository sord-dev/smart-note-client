import React, { useState } from 'react'
import styles from './styles.module.css'

const FormTypes = ['login', 'register'];

export const AuthenticationForm = ({ type, submitForm }) => {
    const [error, setError] = useState(null);
    if (!FormTypes.some((t) => t === type.toLowerCase())) return 'Provide Valid Form Type';
    const computedType = type === 'login' ? 'Login' : 'Register';

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        const error = await submitForm(formValues);

        console.log(error)
        if (error) {
            setError(error)
        }
    };



    return (
        <form className={styles.form} onSubmit={handleSubmit} data-testid={`${computedType.toLowerCase()}-form`}>
            <h2 className={styles.title}>{computedType}</h2>
            {/* Display respective form fields based on type */}
            {type === 'login' && <LoginForm />}
            {type === 'register' && <RegisterForm />}
            {error ? <p>{error}</p> : null}
            <button className={styles.button} role="button" type="submit">
                {computedType}
            </button>
        </form>
    );
};

const LoginForm = () => {
    return (
        <div className={styles.fields}>
            <label htmlFor="username">Username</label>
            <input className={styles.input} type="username" name="username" id="username" />
            <label htmlFor="password">Password</label>
            <input className={styles.input} type="password" name="password" id="password" />
        </div>
    );
};

const RegisterForm = () => {
    return (
        <div className={styles.fields}>
            <label htmlFor="username">Username</label>
            <input className={styles.input} type="text" name="username" id="username" />

            <label htmlFor="password">Password</label>
            <input className={styles.input} type="password" name="password" id="password" />

            <label htmlFor="conf_password">Confirm Password</label>
            <input className={styles.input} type="password" name="conf_password" id="conf_password" />
        </div>
    );
};




