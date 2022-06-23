import { Card, CardProps } from '@mui/material'
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
  const gradientStyle = gradient === 'border' ? styles.border : gradient === 'background' ? styles.background : {}
  return (
    <Card
      style={{
        ...gradientStyle,
        alignContent,
        alignItems,
        alignSelf,
        columnGap,
        display,
        flexDirection,
        flexGrow,
        gap,
        justifyContent,
        justifyItems,
        justifySelf,
        margin,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        padding,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        rowGap,
        ...style,
      }}
      {...props}
    />
  )
}
