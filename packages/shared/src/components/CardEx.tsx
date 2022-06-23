import { Card, CardProps, useTheme } from '@mui/material'
import { CSSProperties } from 'react'

import { useGradientStyles } from '../hooks'

export type CardExProps = CardProps &
  CSSProperties & {
    gradient?: 'border' | 'background'
  }

export const CardEx: React.FC<CardExProps> = ({
  display = 'flex',
  flexDirection = 'column',
  flexGrow,
  alignItems = 'stretch',
  alignContent,
  alignSelf,
  justifyItems = 'flex-start',
  justifyContent = 'flex-start',
  justifySelf,
  style,
  gap,
  rowGap,
  columnGap,
  padding,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  gradient,
  ...props
}) => {
  const { styles } = useGradientStyles()
  const theme = useTheme()
  const applySpacing = (value?: number | string) => {
    return value === undefined ? value : typeof value === 'string' ? value : theme.spacing(value)
  }
  const gradientStyle = gradient === 'border' ? styles.border : gradient === 'background' ? styles.background : {}
  return (
    <Card
      style={{
        ...gradientStyle,
        alignContent,
        alignItems,
        alignSelf,
        columnGap: applySpacing(columnGap),
        display,
        flexDirection,
        flexGrow,
        gap: applySpacing(gap),
        justifyContent,
        justifyItems,
        justifySelf,
        margin: applySpacing(margin),
        marginBottom: applySpacing(marginBottom),
        marginLeft: applySpacing(marginLeft),
        marginRight: applySpacing(marginRight),
        marginTop: applySpacing(marginTop),
        padding: applySpacing(padding),
        paddingBottom: applySpacing(paddingBottom),
        paddingLeft: applySpacing(paddingLeft),
        paddingRight: applySpacing(paddingRight),
        paddingTop: applySpacing(paddingTop),
        rowGap: applySpacing(rowGap),
        ...style,
      }}
      {...props}
    />
  )
}
