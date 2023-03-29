import { useTheme } from '@mui/material'
import { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

import { CyNodeIcons, useIcons } from './useIcons'

export const useCytoscapeOptions = (elements: CytoscapeOptions['elements']) => {
  const theme = useTheme()
  const icons = useIcons()

  const options = useMemo<CytoscapeOptions>(
    () => ({
      elements,
      layout: {
        minNodeSpacing: 75,
        name: 'concentric',
      },
      style: [
        {
          selector: 'label',
          style: {
            color: theme.palette.text.primary,
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
            'line-opacity': 0.25,
            'target-arrow-color': theme.palette.divider,
            'target-arrow-shape': 'triangle',
            width: 3,
          },
        },
      ],
    }),
    [elements, icons, theme.palette.divider, theme.palette.primary.dark, theme.palette.text.primary],
  )

  return options
}
