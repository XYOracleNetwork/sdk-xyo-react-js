import type { StylesheetCSS } from 'cytoscape'

import type { CyNodeModuleTypes } from './lib/index.ts'

export const NodeWithName = (color?: string, outlineColor?: string): StylesheetCSS => ({
  selector: 'node[name]',
  css: {
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

export const Node = (icons: Record<CyNodeModuleTypes, string>, bgColor?: string, hideLabels = false): StylesheetCSS => ({
  selector: 'node',
  css: {
    'background-color': bgColor,
    'background-height': '75%',
    'background-image': elem => icons[elem.data('type') as CyNodeModuleTypes],
    'background-width': '24',
    'label': hideLabels ? undefined : 'data(name)',
    'shape': 'round-rectangle',
  },
})

export const NodeAsRoot = (bgColor?: string): StylesheetCSS => ({
  selector: '.activeNode',
  css: { 'background-color': bgColor },
})

export const EdgeStyled = (lineColor?: string, targetArrowColor?: string): StylesheetCSS => ({
  selector: 'edge',
  css: {
    'curve-style': 'bezier',
    'line-color': lineColor,
    'line-opacity': 0.1,
    'target-arrow-color': targetArrowColor,
    'target-arrow-shape': 'triangle',
    'width': 3,
  },
})
