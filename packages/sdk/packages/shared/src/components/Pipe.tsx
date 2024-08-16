import type { TypographyProps } from '@mui/material'
import { Typography } from '@mui/material'
import React from 'react'

export const Pipe: React.FC<TypographyProps> = (props) => {
  return (
    <Typography marginX={1} component="span" {...props}>
      |
    </Typography>
  )
}
