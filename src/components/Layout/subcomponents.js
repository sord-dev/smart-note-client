import React from 'react';
import styles from './styles.module.css'

export const EditNoteButton = ({ activeTab }) => {
    if (activeTab?.type != 'markdown') return;

    return (
        <div className={styles.editNoteButton}>
            <button>Edit Note</button>
        </div>
    )
}

export const FileList = ({ files, activeTab, openFile }) => {

    return (
        <>
            <h3>Files</h3>
            <div className={styles.sidebarList}>
                {files ? files.map(f => {
                    const isActiveLink = activeTab.type == 'markdown' && activeTab.data.id == f.id;
                    return <p className={isActiveLink ? `${styles.file} ${styles.active}` : styles.file} key={f.id} onClick={() => openFile(f)}>{f.title}</p>
                }) : 'No Files'}
            </div>
        </>
    )
}