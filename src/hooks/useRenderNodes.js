import React, { useEffect, useState } from 'react'


const DefaultGraphData = {
    nodes: [
        { 
            id: 'tutorial-001',
            title: '📚 SmartNote Tutorial', 
            content: `# 🎉 Welcome to SmartNote!

Congratulations on discovering your new favorite note-taking app! Here's everything you need to know to get started.

## 🚀 Quick Start Guide

### Creating Notes
- Click the **"Create Note"** button in the sidebar to add a new note
- Double-click any note title to rename it
- Use the **Edit** button to modify note content

### Navigation
- **Map View**: 🗺️ Click the "Map" button to see your notes as an interactive mind map
- **File List**: Browse all your notes in the left sidebar
- **Search**: Use the search box to quickly find specific notes

### Organizing Your Notes
- **Folders**: Organize notes by assigning them to folders
- **Tags**: Use hashtags in your content for easy categorization
- **Links**: Reference other notes to create connections

## ✍️ Markdown Support

SmartNote supports full Markdown formatting:

### Text Formatting
- **Bold text** with \`**bold**\`
- *Italic text* with \`*italic*\`
- \`Inline code\` with backticks
- ~~Strikethrough~~ with \`~~text~~\`

### Lists
- Create bullet lists with \`-\` or \`*\`
- Number lists with \`1.\`, \`2.\`, etc.
- Nested lists with indentation

### Headers
\`\`\`
# Main Header
## Section Header  
### Sub-section
\`\`\`

### Code Blocks
\`\`\`javascript
function hello() {
    console.log("Hello, SmartNote!");
}
\`\`\`

### Links & References
- External links: \`[Google](https://google.com)\`
- Internal references: \`[[Other Note Title]]\`

## 🛠️ Advanced Features

### File Operations
- **Edit Mode**: Double-click any note to enter edit mode
- **Save**: Changes auto-save when you exit edit mode
- **Delete**: Use the delete button (⚠️ be careful!)

### Keyboard Shortcuts
- \`Ctrl/Cmd + S\`: Save current note
- \`Ctrl/Cmd + N\`: Create new note
- \`Escape\`: Exit edit mode

### Mind Map Features
- **Visual Overview**: See connections between your notes
- **Quick Navigation**: Click any node to open that note
- **Folder Filtering**: Click folder tags to filter by category

## 💡 Pro Tips

1. **Use Descriptive Titles**: Make your notes easy to find
2. **Organize with Folders**: Group related notes together
3. **Link Related Ideas**: Create connections between concepts
4. **Regular Reviews**: Use the mind map to review your knowledge
5. **Search Everything**: The search function looks through all content

## 🎯 Getting Started Tasks

- [ ] Create your first personal note
- [ ] Try organizing notes into folders
- [ ] Experiment with the mind map view
- [ ] Practice Markdown formatting
- [ ] Set up a knowledge system that works for you

## 🆘 Need Help?

If you encounter any issues:
1. Check this tutorial for common solutions
2. Try refreshing the application
3. Ensure you have a stable internet connection
4. Contact support if problems persist

---

**Happy note-taking! 🎉**

*You can safely delete this tutorial note once you're comfortable with the app.*`,
            folder: 'Getting Started',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ],
    links: []
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