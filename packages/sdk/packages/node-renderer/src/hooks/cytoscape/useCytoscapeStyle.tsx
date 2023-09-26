import { useTheme } from '@mui/material'
import { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

import { EdgeStyled, NodeIdStyles, NodeStyled } from '../../Cytoscape'
import { useIcons } from './useIcons'

export const useCytoscapeStyle = (hideLabels = false) => {
  const theme = useTheme()
  const icons = useIcons()

  const style: CytoscapeOptions['style'] = useMemo(
    () => [
      NodeIdStyles(theme.palette.text.primary, theme.palette.getContrastText(theme.palette.text.primary)),
      NodeStyled(icons, theme.palette.primary.main, hideLabels),
      EdgeStyled(theme.palette.divider, theme.palette.divider),
    ],
    [icons, hideLabels, theme],
  )

  return style
}
