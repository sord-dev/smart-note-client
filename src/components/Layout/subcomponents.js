import React, { useState } from 'react';
import styles from './styles.module.css'
import useFileSearch from '@/hooks/useFileSearch';

export const EditNoteButton = ({ activeTab, onClick }) => {
    if (activeTab?.type != 'markdown') return;

    return (
        <div className={styles.editNoteButton}>
            <button className='btn sm' {...{ onClick }} >Edit Note</button>
        </div>
    )
}

export const FileList = ({ files, activeTab, openFile, createFile }) => {

    return (
        <>
            <h3>Files</h3>
            <button className='btn sm' onClick={createFile}>Create Note</button>
            <div className={styles.sidebarList}>
                {files ? files.map(f => {
                    const isActiveLink = activeTab.type == 'markdown' && activeTab.data.id == f.id;
                    return <FileTag key={f.id} isActiveLink={isActiveLink} file={f} openFile={openFile} />
                }) : 'No Files'}
            </div>
        </>
    )
}

export const FileSearch = ({ files, activeTab, openFile }) => {
    const [q, setQ] = useState('');
    const { result } = useFileSearch(files, q)

    return (
        <>
            <h3>Search</h3>
            <input type="text" name='search' onChange={e => setQ(e.target.value)} value={q} autoComplete='off' />

            <div className={styles.sidebarList}>
                {result.length ? result.map(f => {
                    const isActiveLink = activeTab.type == 'markdown' && activeTab.data.id == f.id;
                    return <FileTag key={f.id} isActiveLink={isActiveLink} file={f} openFile={openFile} />
                }) : 'Search for a file.'}
            </div>
        </>
    )
}

const FileTag = ({ isActiveLink, file, openFile }) => {
    return (<p className={isActiveLink ? `${styles.file} ${styles.active}` : styles.file} key={file.id} onClick={() => openFile(file)}>{file.title}</p>)
}