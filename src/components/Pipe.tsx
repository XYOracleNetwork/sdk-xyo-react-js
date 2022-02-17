import { Typography, TypographyProps } from '@mui/material'

export const Pipe: React.FC<TypographyProps> = (props) => {
  return (
    <Typography marginX={1} component="span" {...props}>
      |
    </Typography>
  )
}
