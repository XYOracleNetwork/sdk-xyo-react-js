import type { CytoscapeOptions } from 'cytoscape'

const elements: CytoscapeOptions['elements'] = [
  {
    // node a
    data: { id: 'a', name: 'element a' },
  },
  {
    // node b
    data: { id: 'b', name: 'element b' },
  },
  {
    // node c
    data: { id: 'c', name: 'element c' },
  },
  {
    // edge ab
    data: {
      id: 'ab', source: 'a', target: 'b',
    },
  },
  {
    // edge ac
    data: {
      id: 'ac', source: 'a', target: 'c',
    },
  },
]

const style: CytoscapeOptions['style'] = [
  {
    selector: 'node',
    style: { label: 'data(id)' },
  },

  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle',
      'width': 3,
    },
  },
]

export const options: CytoscapeOptions = {
  elements,
  style,
}
