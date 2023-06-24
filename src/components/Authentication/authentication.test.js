import React from 'react';
import { render, screen } from '@testing-library/react';
import { Authentication } from '.';

test('renders authentication page', () => {
    render(<Authentication />);
    const headingElement = screen.getByRole('heading', { name: /authentication/i });
    expect(headingElement).toBeInTheDocument();
});
