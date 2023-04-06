import { Stylesheet } from 'cytoscape'

import { CyNodeModuleTypes } from './lib'

export const NodeIdStyles = (color?: string): Stylesheet => ({
  selector: 'node[id]',
  style: {
    color,
    'font-family': 'Lexend Deca, Helvetica, sans-serif',
    'font-size': 14,
    'text-margin-y': -5,
  },
})

export const NodeStyled = (icons: Record<CyNodeModuleTypes, string>, bgColor?: string): Stylesheet => ({
  selector: 'node',
  style: {
    'background-color': bgColor,
    'background-height': '75%',
    // TODO - make dynamic
    'background-image': (elem) => icons[elem.data('type') as CyNodeModuleTypes],
    'background-image-smoothing': 'yes',
    'background-width': '75%',
    label: 'data(id)',
  },
})

export const EdgeStyled = (lineColor?: string, targetArrowColor?: string) => ({
  selector: 'edge',
  style: {
    'curve-style': 'bezier',
    'line-color': lineColor,
    'line-opacity': 0.1,
    'target-arrow-color': targetArrowColor,
    'target-arrow-shape': 'triangle',
    width: 3,
  },
})
