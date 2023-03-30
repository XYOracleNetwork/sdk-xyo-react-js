import CallMergeRoundedIcon from '@mui/icons-material/CallMergeRounded'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import HubIcon from '@mui/icons-material/Hub'
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { SvgIconTypeMap, useTheme } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { useMemo } from 'react'

import { encodeSvg } from '../../lib'

export type CyNodeIcons = 'archivist' | 'diviner' | 'module' | 'node' | 'witness'

// eslint-disable-next-line @typescript-eslint/ban-types
const CyIconSet: Record<CyNodeIcons, OverridableComponent<SvgIconTypeMap<{}, 'svg'>>> = {
  archivist: GridViewRoundedIcon,
  diviner: CallMergeRoundedIcon,
  module: QuestionMarkRoundedIcon,
  node: HubIcon,
  witness: VisibilityRoundedIcon,
}

export const useIcons = () => {
  const theme = useTheme()
  const icons = useMemo(() => {
    const iconMap: Record<CyNodeIcons, string> = { archivist: '', diviner: '', module: '', node: '', witness: '' }
    return Object.entries(CyIconSet).reduce((acc, [name, IconComponent]) => {
      const icon = <IconComponent fontSize="small" />
      acc[name as CyNodeIcons] = encodeSvg(icon, theme.palette.getContrastText(theme.palette.text.primary))
      return acc
    }, iconMap)
  }, [theme.palette])

  return icons
}
