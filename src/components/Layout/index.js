import React from 'react'
import styles from './styles.module.css'

export function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <h1>SmartNote</h1>
            </header>

            <aside className={styles.sidebar}>
                <h3>Files</h3>
            </aside>

            <main className={styles.main}>{children}</main>

            <footer className={styles.footer}>Made with ❤️ by <a href="http://github.com/sord-dev" target="_blank" rel="noopener noreferrer">stef</a></footer>
        </div>
    )
}