import type { Stylesheet } from 'cytoscape'

import type { CyNodeModuleTypes } from './lib/index.ts'

export const NodeWithName = (color?: string, outlineColor?: string): Stylesheet => ({
  selector: 'node[name]',
  style: {
    color,
    'font-family': 'Lexend Deca, Helvetica, sans-serif',
    'font-size': 12,
    'overlay-padding': '6px',
    'text-halign': 'center',
    'text-outline-color': outlineColor,
    'text-outline-width': '1px',
    'text-valign': 'top',
  },
})

export const Node = (icons: Record<CyNodeModuleTypes, string>, bgColor?: string, hideLabels = false): Stylesheet => ({
  selector: 'node',
  style: {
    'background-color': bgColor,
    'background-height': '75%',
    'background-image': elem => icons[elem.data('type') as CyNodeModuleTypes],
    'background-width': '24',
    'label': hideLabels ? undefined : 'data(name)',
    'shape': 'round-rectangle',
  },
})

export const NodeAsRoot = (bgColor?: string) => ({
  selector: '.activeNode',
  style: { 'background-color': bgColor },
})

export const EdgeStyled = (lineColor?: string, targetArrowColor?: string) => ({
  selector: 'edge',
  style: {
    'curve-style': 'bezier',
    'line-color': lineColor,
    'line-opacity': 0.1,
    'target-arrow-color': targetArrowColor,
    'target-arrow-shape': 'triangle',
    'width': 3,
  },
})
