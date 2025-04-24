import { useTheme } from '@mui/material'
import { useIsDark } from '@xylabs/react-theme'
import type { CytoscapeOptions } from 'cytoscape'
import { useMemo } from 'react'

import {
  EdgeStyled, Node, NodeAsRoot, NodeWithName,
} from '../../Cytoscape/index.ts'
import { useIcons } from './useIcons.tsx'

export const useCytoscapeStyle = (hideLabels = false) => {
  const theme = useTheme()
  const dark = useIsDark()
  const icons = useIcons()

  const style: CytoscapeOptions['style'] = useMemo(
    // eslint-disable-next-line complexity
    () => [
      Node(icons, dark ? theme.colorSchemes.dark?.palette.primary.main : theme.colorSchemes.light?.palette.primary.main, hideLabels),
      NodeWithName(
        dark ? theme.colorSchemes.dark?.palette.primary.contrastText : theme.colorSchemes.light?.palette.primary.contrastText,
        dark ? theme.colorSchemes.dark?.palette.text.primary : theme.colorSchemes.light?.palette.text.primary,
      ),
      NodeAsRoot(dark ? theme.colorSchemes.dark?.palette.secondary.main : theme.colorSchemes.light?.palette.secondary.main),
      EdgeStyled(
        dark ? theme.colorSchemes.dark?.palette.divider : theme.colorSchemes.light?.palette.divider,
        dark ? theme.colorSchemes.dark?.palette.divider : theme.colorSchemes.light?.palette.divider,
      ),
    ],
    [icons, hideLabels, theme],
  )

  return style
}
