/* eslint-disable @delagen/deprecation/deprecation */
import { useTheme } from '@mui/material'
import numeral from 'numeral'
import React from 'react'

import { ButtonEx } from '../ButtonEx'
import { FlexCol, FlexGrowRow } from '../FlexBox'
import NumberStatusProps from './NumberStatusProps'

/** @deprecated Moved to @xylabs/sdk-react */
const NumberStatus: React.FC<NumberStatusProps> = ({
  error,
  format = '0[.]0a',
  color = 'primary',
  title,
  value,
  size,
  fontSize,
  rounded = false,
  autoWidth = false,
  style,
  ...props
}) => {
  const theme = useTheme()
  const palette = color === 'inherit' ? undefined : theme.palette[color]

  const bgColorTop = palette?.dark ?? theme.palette.background.paper
  const bgColorBottom = palette?.main ?? theme.palette.background.default

  const sizePixels = size === 'large' ? 96 : size === 'small' ? 64 : 80

  const calcFontSize = fontSize ?? sizePixels * 0.2

  return (
    <ButtonEx
      size={size}
      padding={0}
      style={{
        borderRadius: rounded ? theme.shape.borderRadius : 0,
        overflow: rounded ? 'hidden' : undefined,
        ...style,
      }}
      {...props}
    >
      <FlexCol
        alignItems="stretch"
        height={sizePixels}
        width={autoWidth ? '100%' : sizePixels}
        busy={value === undefined && !error}
      >
        <FlexGrowRow
          bgcolor={bgColorTop}
          color={theme.palette.getContrastText(bgColorTop)}
          fontSize={calcFontSize}
          fontFamily="Source Code Pro,monospace"
          alignItems="center"
          height={sizePixels * 0.75}
        >
          {numeral(value).format(format)}
        </FlexGrowRow>
        <FlexGrowRow
          bgcolor={bgColorBottom}
          borderTop="1px"
          color={theme.palette.getContrastText(bgColorBottom)}
          fontSize={sizePixels * 0.12}
          fontFamily={theme.typography.fontFamily}
          height={sizePixels * 0.25}
        >
          {title}
        </FlexGrowRow>
      </FlexCol>
    </ButtonEx>
  )
}

export default NumberStatus
