import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { TabProvider, useTabs } from '../contexts/TabContext';
import { FileProvider } from '../contexts/FileContext';

describe('TabContext', () => {
    test('should provide initial activeTab value', () => {
        const { result } = renderHook(() => useTabs(), {
            wrapper: ({ children }) => (
                <FileProvider>
                    <TabProvider>{children}</TabProvider>
                </FileProvider>
            ),
        });

        expect(result.current.activeTab).toEqual({ type: 'map', data: '' });
    });

    test('should update activeTab when opening a Markdown file', () => {
        const { result } = renderHook(() => useTabs(), {
            wrapper: ({ children }) => (
                <FileProvider>
                    <TabProvider>{children}</TabProvider>
                </FileProvider>
            ),
        });

        act(() => {
            const { openMarkdown } = result.current.tabControls;

            openMarkdown({ id: 1, title: 'Sample Markdown', content: '# Sample Content' });
        });

        expect(result.current.activeTab).toEqual({
            type: 'markdown',
            data: { id: 1, title: 'Sample Markdown', content: '# Sample Content' },
        });
    });

    test('should update activeTab when opening the Map', () => {
        const { result } = renderHook(() => useTabs(), {
            wrapper: ({ children }) => (
                <FileProvider>
                    <TabProvider>{children}</TabProvider>
                </FileProvider>
            ),
        });

        act(() => {
            const { openMap } = result.current.tabControls;

            openMap();
        });

        expect(result.current.activeTab).toEqual({ type: 'map', data: '' });
    });

    test('should handle error gracefully when opening a tab with missing data', () => {
        const { result } = renderHook(() => useTabs(), {
            wrapper: ({ children }) => (
                <FileProvider>
                    <TabProvider>{children}</TabProvider>
                </FileProvider>
            ),
        });

        act(() => {
            const { openMarkdown } = result.current.tabControls;

            openMarkdown({ id: 1, title: 'Missing Content' });
        });

        expect(result.current.activeTab).toEqual({
            type: 'markdown',
            data: { title: 'Error', content: '# Oops, file not found or is invalid.' },
        });
    });
});
