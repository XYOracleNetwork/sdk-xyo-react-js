import { styled, Typography } from '@mui/material'

export const StyledChipLabel = styled(Typography, { name: 'StyledChipLabel' })(({ theme }) => ({
  display: 'block',
  lineHeight: 1,
  overflow: 'hidden',
  paddingRight: theme.spacing(0.95),
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))
