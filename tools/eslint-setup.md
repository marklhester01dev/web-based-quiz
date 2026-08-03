# ESLint Setup

This document describes how ESLint is configured for this project. ESLint is a
dev-only tool - it does not introduce a build step, bundler, or runtime
dependency. It only lints `.js` files before they are committed.

## Why Use ESLint Here

The project is vanilla HTML, CSS, and JavaScript with no framework and no
bundler (see `tech-stack.md`). ESLint fits this setup because it runs
directly against `js/` files with no compilation step, and helps catch bugs
early - unused variables, undeclared globals, accidental reassignment of
custom element lifecycle methods, etc. It has no effect on the shipped code and the browser still loads a `js/script.js` and any other scripts as-is.

## Prerequisites

Node.js and npm installed locally (used only for linting, not for running
the app).

## Installation

Run this once, from the project root:

`npm init -y`
`npm install --save-dev eslint`

This creates a `package.json` and `node_modules/`, which are both dev-only. Neither is referenced by `index.html` or shipped to the browser.

- `eslint` - the linter itself

## Config File

This is the actual `eslint.config.mjs` committed to the project root:

import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
{
files: ["**/*.{js,mjs,cjs}"],
plugins: { js },
extends: ["js/recommended"],
languageOptions: { globals: globals.browser }
},
]);

Notes on the config:

- `files: ["**/*.{js,mjs,cjs}"]` - lints any `.js`, `.mjs`, or `.cjs`
  files anywhere in the project, not just `js/`. It will also catch any script files added elsewhere later without needing the config updated.
- `extends: ["js/recommended"]` - pulls in ESLint's full recommended
  rule set (unused vars, unreachable code, duplicate keys, etc.) in one
  line instead of listing rules individually. Kept up to date by the
  `@eslint/js` package itself.
- `languageOptions: { globals: globals.browser }` - registers the
  entire standard browser global list (`window`, `document`,
  `localStorage`, `customElements`, `HTMLElement`, `console`, and the
  rest) instead of listing them one by one.
- `sourceType` is not set explicitly, so it defaults to `"module"` in
  flat config. If any `.js`, `.mjs`, or `.cjs` file does not use `import`/`export` it will not caused parsing issues in practice. If unexpected parsing errors show up later the setting `languageOptions.sourceType: "script"` is the first thing to check.
- `defineConfig` (from `eslint/config`) is a helper that gives config
  objects type-checking/autocomplete in editors.

## package.json Script

Add a lint script so it can be run with one command:

"scripts": {
"lint": "eslint ."
}

Run it with:

`npm run lint`

## What This Does Not Change

- No build step is introduced - `index.html` still loads
  any js files directly via a plain `<script>` tag
- No bundler, transpiler, or module system is added
- `node_modules/` is a dev tooling only and should be
  added to `.gitignore` so they are not committed
  alongside the app source.

## When to Run It

- Before each commit as a quick sanity check.
- After finishing a roadmap increment alongside the manual QA pass
  described in `testing.md`.

## Related Docs

- `tech-stack.md` - confirms no bundler/build step is part of the stack and
  this setup does not change that.
- `testing.md` - manual QA test cases which ESLint is a supplement to this and
  not a replacement.
