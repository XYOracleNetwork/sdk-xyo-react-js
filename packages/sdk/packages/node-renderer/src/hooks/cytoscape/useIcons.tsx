import { useTheme } from '@mui/material'
import React, { useMemo } from 'react'

import { CyIconSet, CyNodeModuleTypes, encodeSvg, generateIconMap } from '../../Cytoscape/index.ts'

export const useIcons = () => {
  const theme = useTheme()
  const icons = useMemo(() => {
    const iconMap = generateIconMap()
    // eslint-disable-next-line unicorn/no-array-reduce
    return Object.entries(CyIconSet).reduce((acc, [name, IconComponent]) => {
      const icon = <IconComponent fontSize="small" />
      acc[name as CyNodeModuleTypes] = encodeSvg(icon, theme.palette.getContrastText(theme.palette.text.primary))
      return acc
    }, iconMap)
  }, [theme.palette])

  return icons
}
