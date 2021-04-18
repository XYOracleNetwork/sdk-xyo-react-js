import { useTheme } from '@material-ui/core'
import numeral from 'numeral'
import React from 'react'

import { ButtonEx, ButtonExProps } from '../ButtonEx'
import { FlexCol, FlexGrowRow } from '../FlexBox'

interface NumberStatusProps extends ButtonExProps {
  autoWidth?: boolean
  children?: undefined
  error?: Error
  fontSize?: number
  shorten?: string | boolean
  title?: string
  value?: number | string
  width?: number
}

const NumberStatus: React.FC<NumberStatusProps> = (props) => {
  const theme = useTheme()
  const {
    error,
    width = 1,
    shorten = false,
    color = 'primary',
    title,
    value,
    size,
    fontSize,
    autoWidth = false,
    ...buttonProps
  } = props

  const bgColorTop =
    color === 'primary'
      ? theme.palette.primary.dark
      : color === 'secondary'
      ? theme.palette.secondary.dark
      : theme.palette.background.paper
  const bgColorBottom =
    color === 'primary'
      ? theme.palette.primary.main
      : color === 'secondary'
      ? theme.palette.secondary.main
      : theme.palette.background.default

  const sizePixels = size === 'large' ? 96 : size === 'medium' ? 80 : 64
  const numeralFormat = typeof shorten === 'string' ? shorten : '0[.]0a'

  let calcFontSize = fontSize ?? sizePixels * width * 0.5
  if (!fontSize) {
    if (!shorten) {
      if (value !== undefined) {
        if (parseInt(value.toString()) >= 100) {
          calcFontSize = calcFontSize * 0.7
        }
        if (parseInt(value.toString()) >= 1000) {
          calcFontSize = calcFontSize * 0.7
        }
        if (parseInt(value.toString()) >= 10000) {
          calcFontSize = calcFontSize * 0.7
        }
      }
    } else {
      calcFontSize = calcFontSize * 0.45
    }
  }

  return (
    <ButtonEx size={size} {...buttonProps} padding={0}>
      <FlexCol
        height={autoWidth ? 'auto' : sizePixels}
        width={autoWidth ? '100%' : sizePixels * width}
        overflow="hidden"
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
          {shorten ? numeral(value).format(numeralFormat) : value}
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
