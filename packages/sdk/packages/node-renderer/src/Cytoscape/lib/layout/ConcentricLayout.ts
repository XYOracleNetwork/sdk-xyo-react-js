import { CytoscapeOptions } from 'cytoscape'

export const ConcentricLayout: CytoscapeOptions['layout'] = {
  concentric: function (node) {
    return node.degree()
  },
  levelWidth: function () {
    return 2
  },
  minNodeSpacing: 75,
  name: 'concentric',
}
