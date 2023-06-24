import React from 'react';
import ReactMarkdown from 'react-markdown/react-markdown.min';

export const FileDisplay = ({ file }) => {
    if (!file) return <h1>No file provided.</h1>;

    return (
        <div data-testid='markdown-preview'>
            <ReactMarkdown>{file?.content}</ReactMarkdown>
        </div>
    )
}

export default class MarkdownPreview {
    // Markdown tab implementation
    render({ data }) {
        const file = { content: data.content, id: data.id, title: data.title, folder: data?.folder }
        return <FileDisplay file={file} />;
    }
}