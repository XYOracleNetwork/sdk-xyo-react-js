import { useTheme } from '@mui/material'
import type { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

import { EdgeStyled, Node, NodeAsRoot, NodeWithName } from '../../Cytoscape/index.ts'
import { useIcons } from './useIcons.tsx'

export const useCytoscapeStyle = (hideLabels = false) => {
  const theme = useTheme()
  const icons = useIcons()

  const style: CytoscapeOptions['style'] = useMemo(
    () => [
      Node(icons, theme.palette.primary.main, hideLabels),
      NodeWithName(theme.palette.text.primary, theme.palette.getContrastText(theme.palette.text.primary)),
      NodeAsRoot(theme.palette.secondary.main),
      EdgeStyled(theme.palette.divider, theme.palette.divider),
    ],
    [icons, hideLabels, theme],
  )

  return style
}
