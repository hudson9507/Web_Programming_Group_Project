## Purpose
Short, actionable guidance for AI coding agents working on this small static site.

This repository is a minimal static web project (HTML, CSS, client-side JS). The goal of this file is to capture project-specific patterns, run/develop workflows, and concrete examples so an AI can be immediately productive.

## Project snapshot
- Single-page static app: `index.html` (entry), `Script.js` (client JS), `styles.css` (styling).
- Static assets under `public/img/`.
- No package.json, build system, or server code present.

## Big-picture architecture
- Client-side only. All behavior lives in `Script.js` and manipulates the DOM in the browser.
- `index.html` provides the structure: a `header` with an `h1`, a `main` containing a table `#mainContent`, and an incomplete form element (file currently has a broken `<form` block).
- `Script.js` is loaded with `defer` in the HTML and performs simple DOM updates (see `header.textContent` assignment).

## Key files to reference
- `index.html` — structure and where to add markup (table `#mainContent`, header, and form area). The file currently contains an incomplete `<form` element — be careful when modifying.
- `Script.js` — single JS file; existing pattern: use top-level DOM queries (e.g., `document.querySelector('header')`) and assign `textContent`. Keep JS changes localized here unless adding significant structure.
- `styles.css` — lightweight global styles using flex layout. IDs/classes currently in use: `#mainContent`, `header`, `main`.

## Conventions & patterns (project-specific)
- File naming: JS file is `Script.js` (capital S). Preserve this name when referencing the file. There is no module system.
- Script loading: script tag uses `defer`; follow this pattern for additional scripts to ensure DOM is available.
- DOM-first approach: business logic should read and mutate DOM nodes directly; there are no API calls or state management layers in the repo.
- Minimalism: avoid introducing heavy frameworks or build tools unless the change justifies them and a new `package.json` is added.

## Developer workflows (how to run and test locally)
- Quick local test: open `index.html` in a browser (no build step). For a small static server (optional), run a static server from the repo root, for example:

```powershell
npx http-server . -o
```

- Debugging: use browser DevTools. Add console.log() to `Script.js` and refresh; because script is `defer`, it runs after DOM parsing.

## Common edits & examples
- Fix the broken form in `index.html` by completing the `<form>` block and adding inputs inside `main` or just below it.
- Example: to update header text (mirrors existing code in `Script.js`):

```javascript
// Script.js
const header = document.querySelector('header');
header.textContent = 'Welcome to the Gambling Site — JS live';
```

- Example: append a row to the table `#mainContent` (follow the existing DOM-first style):

```javascript
const table = document.getElementById('mainContent');
function addRow(text) {
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.textContent = text;
  tr.appendChild(td);
  table.appendChild(tr);
}
```

## Safety / content note
- The site label reads "Gambling Site" in `index.html`. Be mindful of content policies and avoid adding real gambling transaction logic or live-money flows unless the repository is clearly intended for that and appropriate server-side components, testing, and compliance are added.

## Where to look when extending
- If changing layout: update `styles.css` and `index.html` together to keep selectors consistent (`#mainContent`).
- If adding interactivity: modify `Script.js` and prefer adding functions at top-level (no bundler). Keep changes small and self-contained.

## What not to change lightly
- Do not rename `Script.js` without updating the `<script src="Script.js" defer></script>` in `index.html`.
- Avoid adding build tooling without adding a `package.json` and documenting the new workflow in the README.

If any of the above is unclear or you'd like more detail about running a local server, adding tests, or migrating to a module/bundler setup, tell me what you want and I'll expand this file.
