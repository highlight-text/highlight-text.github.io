class HighlightText extends HTMLElement {
  constructor() {
    super();
    
    // Attach shadow DOM and set up structure
    this.attachShadow({ mode: "open" }).append(
      this.createStyleElement(),
      this.createSlot()
    );
    
    // Store highlights map: word -> color
    this.highlights = new Map();
    
    // Set up MutationObserver to watch for new <highlight-word> elements
    this.observer = new MutationObserver((mutations) => {
      this.updateHighlights();
    });
  }
  
  connectedCallback() {
    // Start observing lightDOM for changes
    this.observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true
    });
    
    // Initial highlight setup
    this.updateHighlights();
  }
  
  disconnectedCallback() {
    // Clean up observer
    this.observer.disconnect();
  }
  
  createStyleElement() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
      }
      ::highlight(highlight-yellow) {
        background-color: yellow;
        color: black;
      }
      ::highlight(highlight-red) {
        background-color: red;
        color: white;
      }
      ::highlight(highlight-green) {
        background-color: green;
        color: white;
      }
      ::highlight(highlight-blue) {
        background-color: blue;
        color: white;
      }
      ::highlight(highlight-orange) {
        background-color: orange;
        color: black;
      }
      ::highlight(highlight-pink) {
        background-color: pink;
        color: black;
      }
      ::highlight(highlight-purple) {
        background-color: purple;
        color: white;
      }
      ::highlight(highlight-cyan) {
        background-color: cyan;
        color: black;
      }
    `;
    return style;
  }
  
  createSlot() {
    const slot = document.createElement('slot');
    return slot;
  }
  
  updateHighlights() {
    // Clear existing highlights
    this.highlights.clear();
    
    // Parse <highlight-word> elements from lightDOM
    const highlightWords = this.querySelectorAll('highlight-word');
    highlightWords.forEach(element => {
      const word = element.textContent.trim();
      const color = element.getAttribute('color') || 'yellow';
      if (word) {
        this.highlights.set(word, color);
      }
    });
    
    // Apply highlights using CSS Custom Highlight API
    this.applyHighlights();
  }
  
  applyHighlights() {
    // Get all text content from lightDOM (excluding highlight-word elements)
    const textNodes = this.getTextNodes(this);
    
    // Clear existing CSS highlights
    CSS.highlights.clear();
    
    // Apply each highlight
    this.highlights.forEach((color, word) => {
      const ranges = [];
      
      textNodes.forEach(node => {
        const text = node.textContent;
        const regex = new RegExp(this.escapeRegExp(word), 'gi');
        let match;
        
        while ((match = regex.exec(text)) !== null) {
          const range = new Range();
          range.setStart(node, match.index);
          range.setEnd(node, match.index + match[0].length);
          ranges.push(range);
        }
      });
      
      if (ranges.length > 0) {
        const highlight = new Highlight(...ranges);
        CSS.highlights.set(`highlight-${color}`, highlight);
      }
    });
  }
  
  getTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip text nodes inside <highlight-word> elements
          if (node.parentElement && node.parentElement.tagName === 'HIGHLIGHT-WORD') {
            return NodeFilter.FILTER_REJECT;
          }
          // Skip empty text nodes
          if (!node.textContent.trim()) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );
    
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }
    
    return textNodes;
  }
  
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  /**
   * Public method to highlight a word programmatically
   * @param {string} word - The word to highlight
   * @param {string} color - The color name (e.g., 'yellow', 'red', 'green')
   */
  highlightWord(word, color = 'yellow') {
    // Create a new <highlight-word> element
    const highlightElement = document.createElement('highlight-word');
    highlightElement.setAttribute('color', color);
    highlightElement.textContent = word;
    highlightElement.style.display = 'none'; // Hide the configuration element
    
    // Append to lightDOM
    this.appendChild(highlightElement);
    
    // The MutationObserver will automatically trigger updateHighlights()
  }
}

// Define the custom element
customElements.define('highlight-text', HighlightText);

// Also define highlight-word as a custom element (for proper parsing)
class HighlightWord extends HTMLElement {
  connectedCallback() {
    // Hide by default as it's a configuration element
    this.style.display = 'none';
  }
}

customElements.define('highlight-word', HighlightWord);
