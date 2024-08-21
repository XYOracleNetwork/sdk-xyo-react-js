import type { CardProps } from '@mui/material'
import { Card } from '@mui/material'
import { useGradientStyles } from '@xyo-network/react-shared'
import React, { forwardRef } from 'react'

export interface CardExProps extends CardProps {
  gradient?: 'border' | 'background'
}

export const CardExWithRef = forwardRef<HTMLDivElement, CardExProps>(({
  style, gradient, ...props
}, ref) => {
  const { styles } = useGradientStyles()
  const gradientStyle
    = gradient === 'border'
      ? styles.border
      : gradient === 'background'
        ? styles.background
        : {}
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
