export const options = {
  elements: [
    {
      // node a
      data: { id: 'a' },
    },
    {
      // node b
      data: { id: 'b' },
    },
    {
      // edge ab
      data: { id: 'ab', source: 'a', target: 'b' },
    },
  ],
  layout: {
    name: 'grid',
    rows: 1,
  },
  style: [
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        label: 'data(id)',
      },
    },

    {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle',
        width: 3,
      },
    },
  ],
}
