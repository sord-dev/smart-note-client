import React, { useEffect, useState } from 'react'


const DefaultGraphData = {
    nodes: [
        { title: 'Node 1', content: '# Test 1' },
        { title: 'Node 2', content: '# Test 2' },
        { title: 'Node 3', content: '# Test 3' },
    ],
    links: [],
};

function useRenderNodes({ folders, files }) {
    const [graphData, setGraphData] = useState(DefaultGraphData)

    const calculateGraph = (folders, files) => {
        const linkedFiles = folders.map((f) => ({ source: f, targets: files.filter(file => file.folder === f) }))
        const processedLinks = [...linkedFiles.map(link => {
            const source = link.source;
            const targets = [];

            link.targets.forEach(t => targets.push({ target: t.id, source }))

            return targets;
        })].flat()

        const nodes = files.length ? [...files, ...folders.map(f => ({ id: f, title: f, type: 'folder' }))] : DefaultGraphData.nodes;
        const links = folders?.length ? processedLinks : DefaultGraphData.links;

        return { nodes, links }
    }

    useEffect(() => {
        const graphData = calculateGraph(folders, files)
        setGraphData(graphData)
    }, [folders, files])

    return graphData
}

export default useRenderNodes