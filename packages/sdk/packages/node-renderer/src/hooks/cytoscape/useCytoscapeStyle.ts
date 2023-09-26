import { useTheme } from '@mui/material'
import { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

import { EdgeStyled, NodeIdStyles, NodeStyled } from '../../Cytoscape'
import { useIcons } from './useIcons'

export const useCytoscapeStyle = () => {
  const theme = useTheme()
  const icons = useIcons()

  const style: CytoscapeOptions['style'] = useMemo(
    () => [
      NodeIdStyles(theme.palette.text.primary, theme.palette.getContrastText(theme.palette.text.primary)),
      NodeStyled(icons, theme.palette.primary.main),
      EdgeStyled(theme.palette.divider, theme.palette.divider),
    ],
    [icons, theme.palette.divider, theme.palette.primary.main, theme.palette.text.primary],
  )

  return style
}
