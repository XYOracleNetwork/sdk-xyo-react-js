import { styled, Typography, TypographyProps } from '@mui/material'

export const CardColumnTitle = styled(Typography, { name: 'CardColumnTitle' })(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
}))

export const CardColumnTitleH2: React.FC<TypographyProps> = props => <CardColumnTitle {...props} />
