# Yog Graph Playground 🎨✨

An interactive, premium graph data structure playground and visualizer built with [Gleam](https://gleam.run/), [Lustre](https://lustre.build/), and the [Yog](https://github.com/mafinar/yog) graph library.

[![Package Version](https://img.shields.io/hexpm/v/lustre_graph_generator)](https://hex.pm/packages/lustre_graph_generator)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/lustre_graph_generator/)

## 🚀 Features

- **💡 16+ Graph Generators**: Full integration with `yog`, including Complete, Cycle, Star, Wheel, Random (Gnp/Gnm), Barabasi-Albert, WattsStrogatz, **CSV**, and more.
- **🎨 Premium UI**: Modern glassmorphism aesthetic built with **Tailwind CSS**.
- **📈 Triple Visualization**:
    - **Cytoscape.js**: Interactive graph rendering for JSON output using the high-performance `fcose` layout.
    - **Mermaid.js**: Live SVG rendering for Mermaid diagram definitions.
    - **Graphviz (DOT)**: Professional SVG rendering for DOT graph definitions via `@hpcc-js/wasm`.
- **🛡️ Parameter Validation**: Smart constraints (e.g., Binary Tree depth limit) to prevent browser overload.
- **📋 One-Click Copy & Export**: Easily copy generated code or download visualizations as PNG (for Cytoscape) or SVG (for Mermaid/DOT).

## 🛠️ Installation

```sh
gleam add lustre_graph_generator
```

## 🏃 Running the Application

This is a modern Vite application powering a Gleam/Lustre frontend. 

1. **Install JavaScript dependencies (Vite, Tailwind CLI, etc.)**:
   ```sh
   npm install
   ```

2. **Run the local development server**:
   ```sh
   npm run dev
   ```

3. **Open in Browser**: Navigate to [http://localhost:8000](http://localhost:8000). The development server provides instant Hot Module Replacement (HMR) for both your Gleam code and Tailwind CSS.

## 🌐 Deployment

Since this is a statically built application, you can easily host it on **GitHub Pages**, **Vercel**, or **Netlify**.

### Building for Production

1. **Build the production bundle**:
   ```sh
   npm run build
   ```

2. **Structure**: The build process will output highly optimized, minified HTML, CSS, and JS into the `dist/` directory.

### Deploying to GitHub Pages

1. **GitHub Actions (Recommended)**:
   Create `.github/workflows/deploy.yml` to automate the build and deployment:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   permissions:
     contents: write
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: erlef/setup-beam@v1
           with:
             otp-version: '27.2'
             gleam-version: '1.14.0'
             rebar3-version: '3.24.0'
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

---

