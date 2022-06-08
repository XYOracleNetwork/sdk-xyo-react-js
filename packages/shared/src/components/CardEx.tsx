import { Card, CardProps } from '@mui/material'

import { useGradientStyles } from '../hooks'

export interface CardExProps extends CardProps {
  gradient?: 'border' | 'background'
}

export const CardEx: React.FC<CardExProps> = ({ style, gradient, ...props }) => {
  const { styles } = useGradientStyles()
  const gradientStyle = gradient === 'border' ? styles.border : gradient === 'background' ? styles.background : {}
  return <Card style={{ ...gradientStyle, ...style }} {...props} />
}
