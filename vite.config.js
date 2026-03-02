import { defineConfig } from "vite";
import gleam from "vite-gleam";

export default defineConfig({
    plugins: [gleam()],
    server: {
        port: 8000
    },
    base: "/lustre_graph_generator/"
});
