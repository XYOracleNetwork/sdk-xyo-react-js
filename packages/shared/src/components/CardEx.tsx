import { Card, CardProps } from '@mui/material'
import { CSSProperties } from 'react'

import { useGradientStyles } from '../hooks'

export interface CardExProps extends CardProps {
  gradient?: 'border' | 'background'
  display?: CSSProperties['display']
  flexDirection?: CSSProperties['flexDirection']
  flexGrow?: CSSProperties['flexGrow']
  alignItems?: CSSProperties['alignItems']
  alignContent?: CSSProperties['alignContent']
  alignSelf?: CSSProperties['alignSelf']
  justifyItems?: CSSProperties['justifyItems']
  justifyContent?: CSSProperties['justifyContent']
  justifySelf?: CSSProperties['justifySelf']
}

export const CardEx: React.FC<CardExProps> = ({
  display,
  flexDirection = 'column',
  flexGrow,
  alignItems = 'stretch',
  alignContent,
  alignSelf,
  justifyItems = 'flex-start',
  justifyContent = 'flex-start',
  justifySelf,
  style,
  gradient,
  ...props
}) => {
  const { styles } = useGradientStyles()
  const gradientStyle = gradient === 'border' ? styles.border : gradient === 'background' ? styles.background : {}
  return (
    <Card style={{ ...gradientStyle, alignContent, alignItems, alignSelf, display, flexDirection, flexGrow, justifyContent, justifyItems, justifySelf, ...style }} {...props} />
  )
}
