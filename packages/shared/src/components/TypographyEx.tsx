import { Typography, TypographyProps } from '@mui/material'

import { useGradientStyles } from '../hooks'

export interface TypographyExProps extends TypographyProps {
  gradient?: 'text'
}

export const TypographyEx: React.FC<TypographyExProps> = ({ style, gradient, ...props }) => {
  const { classes } = useGradientStyles()
  return <Typography className={gradient === 'text' ? classes.typography : undefined} {...props} />
}
