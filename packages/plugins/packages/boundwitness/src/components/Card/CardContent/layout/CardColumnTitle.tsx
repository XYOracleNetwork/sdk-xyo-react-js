import type { TypographyProps } from '@mui/material'
import { styled, Typography } from '@mui/material'
import React from 'react'

export const CardColumnTitle = styled(Typography, { name: 'CardColumnTitle' })(({ theme }) => ({
  color: theme.vars.palette.text.primary,
  fontWeight: 500,
}))

export const CardColumnTitleH2: React.FC<TypographyProps> = props => <CardColumnTitle {...props} />
