import { useTheme } from '@mui/material'
import { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

import { EdgeStyled, Node, NodeAsRoot, NodeWithName } from '../../Cytoscape'
import { useIcons } from './useIcons'

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
