# Yog Graph Generator 🎨✨

An interactive, premium graph data structure generator and visualizer built with [Gleam](https://gleam.run/), [Lustre](https://lustre.build/), and the [Yog](https://github.com/mafinar/yog) graph library.

[![Package Version](https://img.shields.io/hexpm/v/lustre_graph_generator)](https://hex.pm/packages/lustre_graph_generator)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/lustre_graph_generator/)

## 🚀 Features

- **💡 15+ Graph Generators**: Full integration with `yog`, including Complete, Cycle, Star, Wheel, Random (Gnp/Gnm), Barabasi-Albert, Watts-Strogatz, and more.
- **🎨 Premium UI**: Modern glassmorphism aesthetic built with **Tailwind CSS**.
- **📈 Dual Visualization**:
    - **Cytoscape.js**: Interactive graph rendering for JSON output.
    - **Mermaid.js**: Live SVG rendering for Mermaid diagram definitions.
- **🛡️ Parameter Validation**: Smart constraints (e.g., Binary Tree depth limit) to prevent browser overload.
- **📋 One-Click Copy**: Easily copy generated JSON or Mermaid code to your clipboard.

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

---
Built with ❤️ by [mafinar](https://github.com/mafinar)
