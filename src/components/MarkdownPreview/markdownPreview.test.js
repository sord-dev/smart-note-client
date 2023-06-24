import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FileDisplay } from '.';

describe('FileDisplay Component', () => {
    test('renders the file content', () => {
        const file = {
            content: '# Test Markdown',
            id: '1',
            title: 'Test File',
            folder: 'General',
        };

        const { getByTestId } = render(<FileDisplay file={file} />);
        const markdownPreview = getByTestId('markdown-preview');

        expect(markdownPreview).toBeInTheDocument();
        expect(markdownPreview).toHaveTextContent('Test Markdown');
    });

    test('renders "No file provided" when no file is passed', () => {
        const { getByText } = render(<FileDisplay file={null} />);
        const noFileProvided = getByText('No file provided.');

        expect(noFileProvided).toBeInTheDocument();
    });

    test('enters edit mode when clicking the edit button', () => {
        const file = {
            content: '# Test Markdown',
            id: '1',
            title: 'Test File',
            folder: 'General',
        };

        const { getByTestId, getByText } = render(<FileDisplay file={file} />);
        const editButton = getByText('Edit');
        fireEvent.click(editButton);

        const markdownPreview = getByTestId('markdown-preview');
        const form = getByTestId('edit-form');

        expect(markdownPreview).not.toBeInTheDocument();
        expect(form).toBeInTheDocument();
    });

    test('exits edit mode and saves changes when clicking the save button', () => {
        const file = {
            content: '# Test Markdown',
            id: '1',
            title: 'Test File',
            folder: 'General',
        };

        const { getByTestId, getByText } = render(<FileDisplay file={file} />);
        const editButton = getByText('Edit');
        fireEvent.click(editButton);

        const saveButton = getByText('Save');
        fireEvent.click(saveButton);

        const markdownPreview = getByTestId('markdown-preview');
        const form = getByTestId('edit-form');

        expect(markdownPreview).toBeInTheDocument();
        expect(form).not.toBeInTheDocument();
    });
});
