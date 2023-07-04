import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { nodeClickInjectHandler, renderNode } from './helpers';
import { useTabs } from '../../contexts/TabContext';
import { useFiles } from '../../contexts/FileContext';
import useRenderNodes from '../../hooks/useRenderNodes';

const NodeGraph = dynamic(() => import('./graph'), { ssr: false }); // don't load NodeGraph component when we're server side 

export const GraphDisplay = () => {
    const { tabControls } = useTabs();
    const { files, folders } = useFiles();
    const [hoveredNode, setHoveredNode] = useState(null);


    const openFile = nodeClickInjectHandler(tabControls?.openMarkdown);
    const graphData = useRenderNodes({ files, folders })

    return (
        <div data-testid='node-map' >
            <NodeGraph graphData={graphData}
                nodeCanvasObject={renderNode}
                nodeRelSize={10} // Increase the node size
                onNodeClick={openFile} // Set the onNodeClick event handler
                linkWidth={3}
            />
        </div>
    )
}

export default class NodeMap {
    // Map tab implementation
    render() {
        return <GraphDisplay />;
    }
}