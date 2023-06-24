import React from 'react';

export const GraphDisplay = () => {
    return (
        <div data-testid='node-map'>
            <h1>map</h1>
        </div>
    )
}

export default class NodeMap {
    // Map tab implementation
    render() {
        return <GraphDisplay />;
    }
}