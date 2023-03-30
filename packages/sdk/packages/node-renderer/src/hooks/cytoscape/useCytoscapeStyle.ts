import { useTheme } from '@mui/material'
import { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

import { CyNodeIcons, useIcons } from './useIcons'

export const useCytoscapeStyle = () => {
  const theme = useTheme()
  const icons = useIcons()

  const style: CytoscapeOptions['style'] = useMemo(
    () => [
      {
        selector: 'node[id]',
        style: {
          color: theme.palette.text.primary,
          'font-family': 'Lexend Deca, Helvetica, sans-serif',
          'font-size': 14,
          'text-margin-y': -5,
        },
      },
      {
        selector: 'node',
        style: {
          'background-color': theme.palette.primary.main,
          'background-height': '75%',
          // TODO - make dynamic
          'background-image': (elem) => icons[elem.data('type') as CyNodeIcons],
          'background-image-smoothing': 'yes',
          'background-width': '75%',
          label: 'data(id)',
        },
      },
      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'line-color': theme.palette.divider,
          'line-opacity': 0.1,
          'target-arrow-color': theme.palette.divider,
          'target-arrow-shape': 'triangle',
          width: 3,
        },
      },
    ],
    [icons, theme.palette.divider, theme.palette.primary.main, theme.palette.text.primary],
  )

  return style
}
