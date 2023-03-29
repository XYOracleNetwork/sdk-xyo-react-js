import HubIcon from '@mui/icons-material/Hub'
import { CytoscapeOptions } from 'cytoscape'

import { encodeSvg } from '../lib'

const icon = <HubIcon fontSize="small" />
const url = encodeSvg(icon)

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

const layout: CytoscapeOptions['layout'] = {
  name: 'cose',
  nodeDimensionsIncludeLabels: true,
}

const style: CytoscapeOptions['style'] = [
  {
    selector: 'node',
    style: {
      'background-height': '75%',
      'background-image': url,
      'background-image-smoothing': 'yes',
      'background-width': '75%',
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
]

export const options: CytoscapeOptions = {
  elements,
  layout,
  style,
}
