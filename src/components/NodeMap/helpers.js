const nodeClickInjectHandler = (fn) => (node) => { // on first call get the onclick handler
    if (node.type == 'folder') return console.log('folder filter');
    fn(node) // and then on second call run that function on the node
};

const renderNode = (node, ctx, globalScale) => {
    const label = node.title; // Modify this to display a different property as the label
    const radius = 20 / globalScale; // Adjust the radius based on scale

    // Draw a larger circle shape that encompasses the label
    const circleRadius = radius + 1; // Increase the radius to expand the clickable area
    ctx.beginPath();
    ctx.arc(node.x, node.y, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = node.type == 'folder' ? `rgba(0, 0, 0, 1)` : `rgba(0, 0, 0, 0.4)`; // Make the shape semi-transparent
    ctx.fill();

    // Draw the label text below the circle
    const textY = node.y + circleRadius + 5 / globalScale; // Position the text below the circle
    ctx.font = `${14 / globalScale}px Inter`; // Adjust font size based on scale
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Adjust label color to white for better visibility
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top'; // Align text to the top of the textY position
    ctx.fillText(label, node.x, textY); // Display label below the circle
};


export { renderNode, nodeClickInjectHandler }