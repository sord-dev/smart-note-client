import React from 'react';
import dynamic from 'next/dynamic';
import { nodeClickInjectHandler, renderNode, DefaultGraphData } from './helpers';
import { useTabs } from '../../contexts/TabContext';
import { useFiles } from '../../contexts/FileContext';

const NodeGraph = dynamic(() => import('./graph'), { ssr: false }); // don't load NodeGraph component when we're server side 

export const GraphDisplay = () => {
    const { tabControls } = useTabs();
    const { files } = useFiles();
    const openFile = nodeClickInjectHandler(tabControls?.openMarkdown);

    const nodes = files.length ? files : DefaultGraphData.nodes;

    const graphData = { nodes, links: [] }

    return (
        <div data-testid='node-map' >
            <NodeGraph graphData={graphData}
                nodeCanvasObject={renderNode}
                nodeRelSize={35} // Increase the node size
                onNodeClick={openFile} // Set the onNodeClick event handler
                nodeAutoColorBy="group" />
        </div>
    )
}

export default class NodeMap {
    // Map tab implementation
    render() {
        return <GraphDisplay />;
    }
}