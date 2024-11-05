import { Typography, useTheme } from '@mui/material'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import type { ColorGradientLegendProps } from '@xyo-network/react-map-model'
import React from 'react'

const ColorGradientLegend: React.FC<ColorGradientLegendProps> = ({
  startColor, endColor, startLabel, endLabel, heading, textColor, ...props
}) => {
  const theme = useTheme()

  return (
    <FlexCol {...props}>
      <Typography mb={theme.spacing(0.25)} color={textColor} variant="caption" textAlign="center">
        {heading}
      </Typography>
      <FlexCol flexGrow={1} alignItems="stretch" paddingX={theme.spacing(1)} mb={theme.spacing(0.25)}>
        <FlexCol
          height={theme.spacing(0.75)}
          border={`1px solid ${textColor}`}
          sx={{ backgroundImage: `linear-gradient(to right, ${startColor},${endColor})` }}
        />
      </FlexCol>
      <FlexRow flexGrow={1} justifyContent="space-between">
        <Typography color={textColor} variant="caption">
          {startLabel}
        </Typography>
        <Typography color={textColor} variant="caption">
          {endLabel}
        </Typography>
      </FlexRow>
    </FlexCol>
  )
}

export { ColorGradientLegend }
