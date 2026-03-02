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

This is a **Lustre web application**. You can run it locally using several methods:

### Method A: Lustre Dev Tools (Recommended)
You can use the built-in development server provided by `lustre_dev_tools`:

```sh
gleam run -m lustre/dev start
```

### Method B: Simple Static Server
If you're having environment issues with `rebar3` or prefer a simple setup:

1. **Build the project**:
   ```sh
   gleam build
   ```

2. **Serve from a local server**:
   ```sh
   # Using Python
   python3 -m http.server 8000
   
   # Or using Node.js
   npx serve .
   ```

3. **Open in Browser**: Navigate to [http://localhost:8000](http://localhost:8000).

## 🌐 Deployment

Since this is a static Lustre application, you can easily host it on **GitHub Pages**, **Vercel**, or **Netlify**.

### Deploying to GitHub Pages

1. **Build the production bundle**:
   ```sh
   gleam build
   ```

2. **Structure**: Ensure your `index.html` is at the root and the `build/` directory is included in your repository (or generated via GitHub Actions).

3. **GitHub Actions (Recommended)**:
   Create `.github/workflows/deploy.yml` to automate the build and deployment:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: erlef/setup-beam@v1
           with:
             otp-version: '27.2'
             gleam-version: '1.7.0'
         - run: gleam build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: .
   ```

---
Built with ❤️ by [mafinar](https://github.com/mafinar)
