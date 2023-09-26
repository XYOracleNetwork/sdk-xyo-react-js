import { Stylesheet } from 'cytoscape'

import { CyNodeModuleTypes } from './lib'

export const NodeIdStyles = (color?: string, outlineColor?: string): Stylesheet => ({
  selector: 'node[id]',
  style: {
    color,
    'font-family': 'Lexend Deca, Helvetica, sans-serif',
    'font-size': 12,
    'overlay-padding': '6px',
    'text-halign': 'center',
    'text-outline-color': outlineColor,
    'text-outline-opacity': 0.75,
    'text-outline-width': '1px',
    'text-valign': 'center',
  },
})

export const NodeStyled = (icons: Record<CyNodeModuleTypes, string>, bgColor?: string): Stylesheet => ({
  selector: 'node',
  style: {
    'background-color': bgColor,
    'background-height': '75%',
    'background-image': (elem) => icons[elem.data('type') as CyNodeModuleTypes],
    'background-image-opacity': 0.75,
    'background-image-smoothing': 'yes',
    'background-opacity': 0.25,
    'background-width': '75%',
    content: 'data(id)',
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
