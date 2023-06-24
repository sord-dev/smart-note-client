import MarkdownPreview from "../MarkdownPreview";
import NodeMap from "../NodeMap";

export class TabGenerator {
  createTab(type) {
    switch (type) {
      case 'map':
        return new NodeMap();
      case 'markdown':
        return new MarkdownPreview();

      default:
        return new NodeMap();
    }
  }
}
