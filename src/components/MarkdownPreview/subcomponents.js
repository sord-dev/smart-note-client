import React, { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.css'

export const RenderMarkdown = ({ fileEdited, content, newContent }) => {

    return (
        <ReactMarkdown className={styles['markdown-content']}>
            {fileEdited.value ? newContent.value : content.value}
        </ReactMarkdown>
    )
}

export const FileMetaControls = ({ file, createdAt, fileStateControls, handleDeleteFile, handleFolderChange, folders = [] }) => {
    const [hidden, setHidden] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(file?.folder || 'none')

    const handleHideMeta = () => {
        setHidden(prev => !prev);
    }

    useEffect(() => {
        setSelectedFolder(file?.folder || 'none')
    }, [file])

    return (
        <div>
            {hidden ? <button style={{ float: 'right', marginBottom: '12px', position: 'fixed', right: '25px' }} className={`btn sm ${styles['see-through']}`} onClick={handleHideMeta}>Show meta</button> : null}
            <div className={hidden ? `${styles.meta} ${styles.hidden}` : styles.meta}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4>{file.title}</h4>
                    <button className={`btn sm`} onClick={handleHideMeta}>X</button>
                </div>


                <p>Created@: {createdAt.toUTCString()}</p>

                <div className={styles.folder}>
                    <h4>Folder: </h4>
                    <select defaultValue={selectedFolder} onChange={(e) => handleFolderChange(e.target.value)}>
                        <option value="none">None</option>
                        {folders?.map((folder, i) => (<option value={folder} key={`${folder}-${i}`}>{folder}</option>))}
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '4px', margin: '6px 0' }}>
                    <button className="btn sm" onClick={() => fileStateControls.setEditFile()}>EDIT NOTE</button>
                    <button className="btn sm" onClick={() => handleDeleteFile(file.id)}>DELETE NOTE</button>
                </div>
            </div>

        </div>
    )
}