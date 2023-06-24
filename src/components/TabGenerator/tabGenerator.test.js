import React from 'react'
import { render, screen } from '@testing-library/react';
import { TabGeneratorComponent } from '.';
import { TabProvider } from '../contexts/TabContext';

describe('TabGeneratorComponent', () => {
    test('should render the activeTab type correctly', () => {
        render(
            <TabProvider>
                <TabGeneratorComponent />
            </TabProvider>
        );

        const activeTabElement = screen.getByText('map');

        expect(activeTabElement).toBeInTheDocument();
    });

    test('should render error message when activeTab data is invalid', () => {
        render(
            <TabProvider>
                <TabGeneratorComponent />
            </TabProvider>
        );

        const errorMessage = screen.getByText('Invalid tab data');

        expect(errorMessage).toBeInTheDocument();
    });
});
