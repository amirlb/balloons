# Balloons App - Developer Guide

## Run Commands
- Open `index.html` in browser to run locally
- Use `python -m http.server` or `npx serve` to run with a local server
- Deploy to any static web host for production

## Code Style Guidelines
- Indentation: 2 spaces
- Naming: camelCase for variables and functions
- HTML: semantic elements, accessibility attributes
- CSS: descriptive class names, mobile-first approach
- JavaScript: 
  - Function declarations for reusable components
  - Avoid global variables when possible
  - Use const/let instead of var
  - Add comments for complex logic
  - Handle errors with try/catch for critical operations

## App Structure
- `index.html`: Main entry point and HTML structure
- `styles.css`: All styling and animations
- `script.js`: Game logic and interactions
- `sw.js`: Service worker for PWA functionality
- `manifest.json`: PWA configuration
- `assets/`: Sound effects and images