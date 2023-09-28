import { LayoutOptions } from 'cytoscape'

export const ConcentricLayout: LayoutOptions = {
  concentric: function (node) {
    return node.degree()
  },
  levelWidth: function () {
    return 2
  },
  minNodeSpacing: 75,
  name: 'concentric',
}
