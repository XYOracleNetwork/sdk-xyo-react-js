import type { TypographyProps } from '@mui/material'
import { Typography } from '@mui/material'
import React from 'react'

import { useGradientStyles } from '../hooks/index.ts'

export interface TypographyExProps extends TypographyProps {
  gradient?: 'text'
}

export const TypographyEx: React.FC<TypographyExProps> = ({
  gradient, ...props
}) => {
  const { classes } = useGradientStyles()
  return <Typography className={gradient === 'text' ? classes().heading : undefined} {...props} />
}
