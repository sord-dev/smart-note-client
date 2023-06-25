import React from 'react'
import { render, screen } from '@testing-library/react';
import { TabGeneratorComponent } from '.';
import { TabProvider } from '../../contexts/TabContext';
import { FileProvider } from '../../contexts/FileContext';

describe('TabGeneratorComponent', () => {
    test('should render the activeTab type correctly', () => {
        render(
            <TabProvider>
                <TabGeneratorComponent tabType='markdown' />
            </TabProvider>
        );

        const activeTabElement = screen.getByTestId('markdown-preview');

        expect(activeTabElement).toBeInTheDocument();
    });

    test('should render node map when activeTab data is invalid', () => {
        render(
            <FileProvider>
                <TabProvider>
                    <TabGeneratorComponent />
                </TabProvider>
            </FileProvider>
        );

        const activeTabElement = screen.getByTestId('node-map');

        expect(activeTabElement).toBeInTheDocument();
    });
});
