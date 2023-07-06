import React from "react"
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.css'

export const RenderMarkdown = ({ fileEdited, content, newContent }) => {

    return (
        <ReactMarkdown className={styles['markdown-content']}>
            {fileEdited.value ? newContent.value : content.value}
        </ReactMarkdown>
    )
}

export const FileMetaControls = ({ file, createdAt, fileStateControls, handleDeleteFile, fileFolder, folders = [] }) => {
    return (
        <div className={styles.meta}>
            <h4>{file.title}</h4>

            <p>Created@: {createdAt.toUTCString()}</p>

            <div className={styles.folder}>
                <h4>Folder: </h4>
                <select defaultValue={fileFolder || 'none'} onChange={(e) => setFileFolder(e.target.value)}>
                    <option value="none">None</option>
                    {folders?.map((folder, i) => (<option value={folder} key={`${folder}-${i}`}>{folder}</option>))}
                </select>
            </div>

            <div style={{ display: 'flex', gap: '4px', margin: '6px 0' }}>
                <button className="btn sm" onClick={() => fileStateControls.setEditFile()}>EDIT NOTE</button>
                <button className="btn sm" onClick={() => handleDeleteFile(file.id)}>DELETE NOTE</button>
            </div>
        </div>
    )
}