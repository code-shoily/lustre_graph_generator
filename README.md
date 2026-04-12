# YOG GRAPH PLAYGROUND

An interactive graph generator and visualizer built with [Gleam](https://gleam.run/), [Lustre](https://lustre.build/), and [Yog v6](https://github.com/mafinar/yog).

[![Package Version](https://img.shields.io/hexpm/v/lustre_graph_generator)](https://hex.pm/packages/lustre_graph_generator)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/lustre_graph_generator/)

## Features

- **40+ Graph Generators** powered by Yog v6:
  - **Classic**: Complete, Cycle, Path, Star, Wheel, Bipartite, Grid 2D, Binary Tree, K-Ary Tree, Hypercube, Ladder, Petersen, Platonic solids, and more.
  - **Random**: Erdos-Renyi (Gnp/Gnm), Barabasi-Albert, Watts-Strogatz, Random Regular, SBM, Random Geometric.
  - **Maze**: Binary Tree, Recursive Backtracker, Wilson, Kruskal, Prim True, Eller. Mazes render as ASCII art with proper walls and passages.
  - **Input**: Weighted Matrix and CSV graph importers with shortest-path and topological-sort analysis.
- **Multi-Mode Visualization**:
  - **Cytoscape.js**: Interactive force-directed graph rendering.
  - **Mermaid.js**: Live SVG diagram generation.
  - **Graphviz (DOT)**: Professional SVG rendering with green-on-black styling.
  - **ASCII Art**: Terminal-style maze rendering for all maze generators.
- **Parameter Validation**: Upper limits on all generators to prevent browser overload.
- **One-Click Copy & Export**: Copy generated code or download visualizations as PNG, SVG, or text.

## Installation

```sh
gleam add lustre_graph_generator
```

## Running the Application

This is a Vite-powered Gleam/Lustre frontend.

1. **Install JavaScript dependencies**:
   ```sh
   npm install
   ```

2. **Run the local development server**:
   ```sh
   npm run dev
   ```

3. **Open in Browser**: Navigate to [http://localhost:8000](http://localhost:8000).

## Deployment

This is a statically built application. Host it on **GitHub Pages**, **Vercel**, or **Netlify**.

### Building for Production

```sh
npm run build
```

The optimized bundle is output to the `dist/` directory.

### Deploying to GitHub Pages

Create `.github/workflows/deploy.yml`:

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
