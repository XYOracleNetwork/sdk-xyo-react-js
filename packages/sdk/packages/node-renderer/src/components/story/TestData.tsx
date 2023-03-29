import { CytoscapeOptions } from 'cytoscape'

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
    data: { id: 'ab', source: 'a', target: 'b' },
  },
  {
    // edge ac
    data: { id: 'ac', source: 'a', target: 'c' },
  },
]

export const options: CytoscapeOptions = {
  elements,
}
