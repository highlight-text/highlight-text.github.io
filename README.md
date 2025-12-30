# [https://highlight-text.github.io](https://highlight-text.github.io/)

`<highlight-text>` Web Component using the CSS Custom Highlight API

## Features

- ✨ Uses the modern CSS Custom Highlight API for efficient text highlighting
- 🎨 Support for multiple colors (yellow, red, green, blue, orange, pink, purple, cyan)
- 📝 Configure highlights via `<highlight-word>` elements in lightDOM
- 🔧 Programmatic API with `highlightWord(word, color)` method
- 🔄 Automatic updates via MutationObserver when new `<highlight-word>` elements are added
- 🔤 Case-insensitive highlighting by default
- 🌐 Shadow DOM encapsulation

## Installation

Include the script in your HTML:

```html
<script src="highlight-text.js"></script>
```

## Usage

### Basic Usage with LightDOM Configuration

```html
<highlight-text>
  <highlight-word color="yellow">JavaScript</highlight-word>
  <highlight-word color="red">Web Components</highlight-word>
  <highlight-word color="green">CSS</highlight-word>
  
  The modern web is built with JavaScript, HTML, and CSS. 
  Web Components are a powerful feature that allows developers to create 
  reusable custom elements.
</highlight-text>
```

### Programmatic Usage

```javascript
const element = document.querySelector('highlight-text');

// Add a new highlight
element.highlightWord('dolor', 'yellow');
element.highlightWord('ipsum', 'orange');
```

### Available Colors

- `yellow` (default)
- `red`
- `green`
- `blue`
- `orange`
- `pink`
- `purple`
- `cyan`

## API

### `highlightWord(word, color)`

Programmatically add a word to highlight.

**Parameters:**
- `word` (string): The word to highlight
- `color` (string): The color name (default: 'yellow')

**Example:**
```javascript
const highlightText = document.getElementById('myHighlight');
highlightText.highlightWord('important', 'red');
```

## Architecture

- **LightDOM**: Contains the text content and `<highlight-word>` configuration elements
- **ShadowDOM**: Renders the text with highlights applied via CSS Custom Highlight API
- **MutationObserver**: Watches for new `<highlight-word>` elements and updates highlights automatically
- **CSS Custom Highlight API**: Efficiently highlights text without modifying the DOM structure

## Demo

Open `index.html` in a modern browser to see the component in action with various examples.

## Browser Support

This component requires support for:
- CSS Custom Highlight API
- Web Components (Custom Elements, Shadow DOM)
- MutationObserver

Modern browsers (Chrome 105+, Edge 105+, Safari 17.2+) support these features.
