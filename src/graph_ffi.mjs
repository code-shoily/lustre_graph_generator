let cy = null;
let mermaidInitialized = false;

export function renderGraph(jsonString) {
  if (!jsonString) return;

  if (typeof cytoscape === 'undefined') {
    console.error('Cytoscape library not loaded');
    return;
  }

  const container = document.getElementById('cy');
  if (!container) {
    console.error('Container #cy not found');
    return;
  }

  try {
    const data = JSON.parse(jsonString);

    // Transform JSON to Cytoscape format
    const elements = {
      nodes: data.nodes.map(n => ({
        data: {
          id: String(n.id),
          label: n.label === "node" ? "" : n.label
        }
      })),
      edges: data.edges.map(e => ({
        data: {
          id: `${e.source}-${e.target}`,
          source: String(e.source),
          target: String(e.target),
          weight: e.weight
        }
      }))
    };

    const isGrid = data.nodes.some(n => n.label && n.label.startsWith("Grid"));

    if (cy && typeof cy.destroy === 'function') {
      cy.destroy();
    }

    cy = cytoscape({
      container: container,
      elements: elements,
      boxSelectionEnabled: false,
      autounselectify: true,
      style: [
        {
          selector: 'node',
          style: {
            'height': 8,
            'width': 8,
            'background-color': '#22c55e', /* Green 500 */
            'border-width': 0,
            'opacity': 0.9,
            'transition-property': 'background-color, opacity',
            'transition-duration': '0.3s'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 1,
            'line-color': '#14532d', /* Green 900 */
            'target-arrow-color': '#14532d',
            'target-arrow-shape': 'triangle',
            'arrow-scale': 0.5,
            'curve-style': 'bezier',
            'opacity': 0.4
          }
        }
      ],
      layout: isGrid ? {
        name: 'grid',
        rows: Math.max(...data.nodes.map(n => parseInt(n.label?.split(':')[1] || 0))) + 1,
        cols: Math.max(...data.nodes.map(n => parseInt(n.label?.split(':')[0]?.split(' ')[1] || 0))) + 1,
        padding: 50
      } : {
        name: 'fcose',
        animate: data.nodes.length < 100,
        animationDuration: 500,
        padding: 50,
        randomize: true,
        nodeRepulsion: 4500,
        idealEdgeLength: 50,
        sampleSize: 100,
        nodeDimensionsIncludeLabels: true,
        uniformNodeDimensions: true
      }
    });

  } catch (error) {
    console.error('Error rendering graph:', error);
  }
}

export function copyToClipboard(text) {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    console.log('JSON copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

export function formatJSON(jsonString) {
  try {
    return JSON.stringify(JSON.parse(jsonString), null, 2);
  } catch (e) {
    return jsonString;
  }
}

export function renderAscii(asciiCode) {
  const container = document.getElementById('ascii-graph');
  if (!container) return;
  container.textContent = asciiCode;
}

export function renderMermaid(code) {
  const container = document.getElementById('mermaid-graph');
  if (!container) return;

  if (!code) {
    container.innerHTML = "";
    return;
  }

  if (typeof mermaid === 'undefined') {
    container.innerHTML = `<p style="color: #ef4444; padding: 1rem; font-family: sans-serif;">Mermaid library not loaded</p>`;
    return;
  }

  if (!mermaidInitialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'loose',
    });
    mermaidInitialized = true;
  }

  const id = 'mermaid-svg-' + Math.random().toString(36).substr(2, 9);

  // Pre-parse to catch syntax errors explicitly
  try {
    mermaid.parse(code);
  } catch (parseErr) {
    console.error("Mermaid parse error:", parseErr);
    const msg = parseErr?.str || parseErr?.message || String(parseErr) || 'Invalid Mermaid syntax';
    container.innerHTML = `<div style="color: #f87171; background: #0a0a0a; border: 1px solid #7f1d1d; border-radius: 0.375rem; padding: 1rem; font-family: monospace; font-size: 0.875rem; white-space: pre-wrap;"><strong style="color:#ef4444;">Mermaid Syntax Error</strong><br/>${escapeHtml(msg)}</div>`;
    return;
  }

  // Render with timeout guard
  let resolved = false;
  const timeoutId = setTimeout(() => {
    if (!resolved) {
      container.innerHTML = `<p style="color: #f87171; background: #0a0a0a; border: 1px solid #7f1d1d; border-radius: 0.375rem; padding: 1rem; font-family: sans-serif;">Mermaid render timed out. The diagram may be too large.</p>`;
    }
  }, 5000);

  try {
    mermaid.render(id, code).then(({ svg }) => {
      resolved = true;
      clearTimeout(timeoutId);
      container.innerHTML = svg;
    }).catch(err => {
      resolved = true;
      clearTimeout(timeoutId);
      console.error("Mermaid render error:", err);
      const msg = err?.str || err?.message || String(err) || 'Check syntax';
      container.innerHTML = `<div style="color: #f87171; background: #0a0a0a; border: 1px solid #7f1d1d; border-radius: 0.375rem; padding: 1rem; font-family: monospace; font-size: 0.875rem; white-space: pre-wrap;"><strong style="color:#ef4444;">Mermaid Render Error</strong><br/>${escapeHtml(msg)}</div>`;
    });
  } catch (e) {
    resolved = true;
    clearTimeout(timeoutId);
    console.error("Mermaid catch error:", e);
    const msg = e?.message || String(e) || 'Unknown error';
    container.innerHTML = `<div style="color: #b91c1c; background: #fef2f2; border: 1px solid #fecaca; border-radius: 0.375rem; padding: 1rem; font-family: monospace; font-size: 0.875rem; white-space: pre-wrap;"><strong>Mermaid Error</strong><br/>${escapeHtml(msg)}</div>`;
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

let graphvizInstance = null;

export async function renderDot(code) {
  const container = document.getElementById('dot-graph');
  if (!container) return;

  if (!code) {
    container.innerHTML = "";
    return;
  }

  try {
    if (!graphvizInstance) {
      console.log('Loading Graphviz WASM module...');
      const hpcc = await import("https://cdn.jsdelivr.net/npm/@hpcc-js/wasm/dist/graphviz.js");
      graphvizInstance = await hpcc.Graphviz.load();
      console.log('Graphviz WASM module loaded');
    }

    const svg = graphvizInstance.layout(code, "svg", "dot");
    container.innerHTML = svg;

    const svgElement = container.querySelector('svg');
    if (svgElement) {
      svgElement.style.width = "100%";
      svgElement.style.height = "auto";
      svgElement.style.maxWidth = "100%";
    }
  } catch (err) {
    console.error("DOT render error:", err);
    container.innerHTML = `<div style="color: #f87171; background: #0a0a0a; border: 1px solid #7f1d1d; border-radius: 0.375rem; padding: 1rem; font-family: monospace; font-size: 0.875rem;"><strong style="color:#ef4444;">DOT Error</strong><br/>${escapeHtml(err.message || 'Check syntax')}</div>`;
  }
}

export function downloadImage(tabType) {
  const isJson = tabType.constructor.name === 'Json';
  const isMermaid = tabType.constructor.name === 'Mermaid';
  const isDot = tabType.constructor.name === 'Dot';
  const isAscii = tabType.constructor.name === 'Ascii';

  if (isJson) {
    if (!cy) return;
    try {
      // Export Cytoscape as PNG
      const b64 = cy.png({ full: true, bg: '#0f172a', scale: 2 });
      const link = document.createElement('a');
      link.href = b64;
      link.download = 'graph.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("PNG export error:", err);
    }
  } else if (isAscii) {
    const asciiText = document.getElementById('ascii-graph')?.textContent || '';
    if (!asciiText) return;
    const blob = new Blob([asciiText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'maze-ascii.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  } else if (isMermaid || isDot) {
    const containerId = isMermaid ? 'mermaid-graph' : 'dot-graph';
    const svg = document.querySelector(`#${containerId} svg`);

    if (!svg) {
      console.error('SVG not found for export');
      return;
    }

    try {
      // Export SVG for Mermaid/DOT
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(svg);

      // Ensure namespaces are present
      if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      if (!source.match(/^<svg[^>]+xmlns\:xlink="http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
      }

      const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `graph-${isMermaid ? 'mermaid' : 'dot'}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (err) {
      console.error("SVG export error:", err);
    }
  }
}
