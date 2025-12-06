import React, { useState, useCallback, useId } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'

const FormTypes = ['login', 'register']

export const AuthenticationForm = ({ type, submitForm }) => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const formId = useId()
    
    const handleSubmit = useCallback(async (event) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null)
        
        const form = event.target
        const formData = new FormData(form)
        const formValues = Object.fromEntries(formData.entries())
        
        try {
            const error = await submitForm(formValues)
            if (error) {
                setError(error)
                console.error('Form submission error:', error)
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.')
            console.error('Unexpected error:', err)
        } finally {
            setIsLoading(false)
        }
    }, [submitForm])
    
    if (!FormTypes.includes(type.toLowerCase())) {
        return (
            <div className={styles.error} role="alert">
                Invalid form type provided. Please use &apos;login&apos; or &apos;register&apos;.
            </div>
        )
    }
    
    const computedType = type === 'login' ? 'Login' : 'Register'

    return (
        <form 
            className={styles.form} 
            onSubmit={handleSubmit} 
            data-testid={`${computedType.toLowerCase()}-form`}
            aria-labelledby={`${formId}-title`}
            noValidate
        >
            <h2 
                id={`${formId}-title`} 
                className={styles.title}
            >
                {computedType}
            </h2>
            
            {/* Display respective form fields based on type */}
            {type === 'login' && <LoginForm formId={formId} />}
            {type === 'register' && <RegisterForm formId={formId} />}
            
            {error && (
                <div 
                    className={styles.error} 
                    role="alert" 
                    aria-live="polite"
                >
                    {error}
                </div>
            )}
            
            <button 
                className={`${styles.button} ${isLoading ? styles.buttonLoading : ''}`}
                type="submit"
                disabled={isLoading}
                aria-describedby={error ? `${formId}-error` : undefined}
            >
                {isLoading ? 'Please wait...' : computedType}
            </button>
        </form>
    )
}

const LoginForm = ({ formId }) => {
    return (
        <>
            <div className={styles.fields}>
                <label htmlFor={`${formId}-username`} className={styles.label}>
                    Username *
                </label>
                <input 
                    className={styles.input} 
                    type="text" 
                    name="username" 
                    id={`${formId}-username`}
                    required
                    autoComplete="username"
                    aria-describedby={`${formId}-username-help`}
                />
                <div id={`${formId}-username-help`} className={styles.fieldHelp}>
                    Enter your username
                </div>
                
                <label htmlFor={`${formId}-password`} className={styles.label}>
                    Password *
                </label>
                <input 
                    className={styles.input} 
                    type="password" 
                    name="password" 
                    id={`${formId}-password`}
                    required
                    autoComplete="current-password"
                    aria-describedby={`${formId}-password-help`}
                />
                <div id={`${formId}-password-help`} className={styles.fieldHelp}>
                    Enter your password
                </div>
            </div>
            
            <p className={styles.switchForm}>
                Don&apos;t have an account?{' '}
                <Link href="/authenticate?type=register" className={styles.link}>
                    Sign up here!
                </Link>
            </p>
        </>
    )
}

const RegisterForm = ({ formId }) => {
    return (
        <>
            <div className={styles.fields}>
                <label htmlFor={`${formId}-reg-username`} className={styles.label}>
                    Username *
                </label>
                <input 
                    className={styles.input} 
                    type="text" 
                    name="username" 
                    id={`${formId}-reg-username`}
                    required
                    autoComplete="username"
                    aria-describedby={`${formId}-reg-username-help`}
                    minLength="3"
                    maxLength="50"
                />
                <div id={`${formId}-reg-username-help`} className={styles.fieldHelp}>
                    Choose a username (3-50 characters)
                </div>

                <label htmlFor={`${formId}-reg-password`} className={styles.label}>
                    Password *
                </label>
                <input 
                    className={styles.input} 
                    type="password" 
                    name="password" 
                    id={`${formId}-reg-password`}
                    required
                    autoComplete="new-password"
                    aria-describedby={`${formId}-reg-password-help`}
                    minLength="8"
                />
                <div id={`${formId}-reg-password-help`} className={styles.fieldHelp}>
                    Password must be at least 8 characters long
                </div>

                <label htmlFor={`${formId}-reg-conf-password`} className={styles.label}>
                    Confirm Password *
                </label>
                <input 
                    className={styles.input} 
                    type="password" 
                    name="conf_password" 
                    id={`${formId}-reg-conf-password`}
                    required
                    autoComplete="new-password"
                    aria-describedby={`${formId}-reg-conf-password-help`}
                />
                <div id={`${formId}-reg-conf-password-help`} className={styles.fieldHelp}>
                    Re-enter your password to confirm
                </div>
            </div>
            
            <p className={styles.switchForm}>
                Already have an account?{' '}
                <Link href="/authenticate?type=login" className={styles.link}>
                    Login here!
                </Link>
            </p>
        </>
    )
}




