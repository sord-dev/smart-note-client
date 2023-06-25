import React from 'react';
import dynamic from 'next/dynamic';
import styles from './styles.module.css'
import { nodeClickInjectHandler, renderNode } from './helpers';
import { useTabs } from '../../contexts/TabContext';
import { useFiles } from '../../contexts/FileContext';

const NodeGraph = dynamic(() => import('./graph'), { ssr: false });


const GraphData = {
    nodes: [
        { title: 'Node 1', content: '# Test 1' },
        { title: 'Node 2', content: '# Test 2' },
        { title: 'Node 3', content: '# Test 3' },
        // Add more nodes as needed
    ],
    links: [],
};

export const GraphDisplay = () => {
    const { tabControls } = useTabs();
    const { files } = useFiles();
    const openFile = nodeClickInjectHandler(tabControls?.openMarkdown);

    const nodes = files.length ? files : GraphData.nodes;

    const graphData = { nodes, links: [] }

    return (
        <div data-testid='node-map' className={styles.nodeMap}>
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