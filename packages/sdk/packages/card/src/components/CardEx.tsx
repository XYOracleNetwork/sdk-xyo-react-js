import { Card, CardProps } from '@mui/material'
import { useGradientStyles } from '@xyo-network/react-shared'
import { forwardRef } from 'react'

export type CardExProps = CardProps & {
  gradient?: 'border' | 'background'
}

export const CardExWithRef: React.FC<CardExProps> = forwardRef(({ style, gradient, ...props }, ref) => {
  const { styles } = useGradientStyles()
  const gradientStyle = gradient === 'border' ? styles.border : gradient === 'background' ? styles.background : {}
  return (
    <Card
      style={{
        ...gradientStyle,
        ...style,
      }}
      ref={ref}
      {...props}
    />
  )
})

CardExWithRef.displayName = 'CardEx'

export const CardEx = CardExWithRef
