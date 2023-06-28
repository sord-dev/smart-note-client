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