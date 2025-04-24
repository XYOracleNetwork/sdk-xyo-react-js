import { useTheme } from '@mui/material'
import React, { useMemo } from 'react'

import type { CyNodeModuleTypes } from '../../Cytoscape/index.ts'
import {
  CyIconSet, encodeSvg, generateIconMap,
} from '../../Cytoscape/index.ts'

export const useIcons = () => {
  const theme = useTheme()
  const icons = useMemo(() => {
    const iconMap = generateIconMap()
    // eslint-disable-next-line unicorn/no-array-reduce
    return Object.entries(CyIconSet).reduce((acc, [name, IconComponent]) => {
      const icon = <IconComponent fontSize="small" />
      acc[name as CyNodeModuleTypes] = encodeSvg(icon, theme.vars.palette.primary.contrastText)
      return acc
    }, iconMap)
  }, [theme.palette])

  return icons
}
