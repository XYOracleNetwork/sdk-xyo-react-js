import { Typography, TypographyProps } from '@mui/material'

export const Ampersand: React.FC<TypographyProps> = (props) => {
  return (
    <Typography marginX={1} component="span" {...props}>
      &amp;
    </Typography>
  )
}
