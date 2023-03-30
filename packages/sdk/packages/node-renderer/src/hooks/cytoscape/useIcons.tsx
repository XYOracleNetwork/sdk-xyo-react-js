import { useTheme } from '@mui/material'
import { useMemo } from 'react'

import { CyIconSet, CyNodeIcons, encodeSvg } from '../../lib'

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
