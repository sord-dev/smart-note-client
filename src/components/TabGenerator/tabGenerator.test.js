import React from 'react'
import { render, screen } from '@testing-library/react';
import { TabGeneratorComponent } from '.';

describe('TabGeneratorComponent', () => {
    it('renders the NodeMap tab', () => {
        render(<TabGeneratorComponent tabType="map" />);

        // Assert that the NodeMap component is rendered
        expect(screen.getByTestId('node-map')).toBeInTheDocument();
    });

    it('renders the MarkdownPreview tab', () => {
        render(<TabGeneratorComponent tabType="markdown" data="# Title" />);

        // Assert that the MarkdownPreview component is rendered with the provided data
        expect(screen.getByTestId('markdown-preview')).toBeInTheDocument();
    });

    it('renders the ErrorTab for unknown tab type', () => {
        render(<TabGeneratorComponent tabType="unknown" />);

        // Assert that the ErrorTab component is rendered
        expect(screen.getByRole('error-message')).toBeInTheDocument();
    });
});
