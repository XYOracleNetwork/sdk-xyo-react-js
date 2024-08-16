import { useMediaQuery, useTheme } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'

import type { ColorGradientLegendProps } from '../Colors/index.ts'
import { ColorGradientLegend } from './Legends/index.ts'

const AnimatedHeatMapLegend: React.FC<ColorGradientLegendProps> = ({ ...legendProps }) => {
  const { startColor, endColor, startLabel, endLabel, heading, textColor } = legendProps
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <FlexCol position="absolute" bottom={0} right={0}>
      <ColorGradientLegend
        startColor={startColor}
        endColor={endColor}
        startLabel={startLabel}
        endLabel={endLabel}
        heading={heading}
        textColor={textColor}
        {...{
          alignItems: 'stretch',
          marginBottom: theme.spacing(4),
          marginLeft: isSmall ? theme.spacing(3) : 0,
          marginRight: isSmall ? theme.spacing(2) : theme.spacing(3),
          width: isSmall ? '40vw' : theme.spacing(18),
        }}
      />
    </FlexCol>
  )
}

export { AnimatedHeatMapLegend }
