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
            'background-color': '#0ea5e9', /* Cyan 500 */
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
            'line-color': '#334155', /* Slate 700 */
            'target-arrow-color': '#334155',
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
        name: 'cose',
        animate: true,
        animationDuration: 500,
        padding: 50,
        randomize: false,
        nodeRepulsion: 4000,
        idealEdgeLength: 50
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

export function renderMermaid(code) {
  const container = document.getElementById('mermaid-graph');
  if (!container) return;

  if (!code) {
    container.innerHTML = "";
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

  try {
    mermaid.render(id, code).then(({ svg }) => {
      container.innerHTML = svg;
    }).catch(err => {
      console.error("Mermaid render error:", err);
      container.innerHTML = `<p style="color: #ef4444; padding: 1rem;">Mermaid Error: ${err.message || 'Check syntax'}</p>`;
    });
  } catch (e) {
    console.error("Mermaid catch error:", e);
    container.innerHTML = `<p style="color: #ef4444; padding: 1rem;">Mermaid Error: ${e.message}</p>`;
  }
}
