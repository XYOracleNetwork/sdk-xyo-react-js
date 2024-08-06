import { ArrowBackRounded } from '@mui/icons-material'
import { IconButtonProps } from '@mui/material'
import React from 'react'

import { PaperAdornmentIconButton } from './PaperAdornmentIconButton.tsx'

type BackPaperAdornmentProps = IconButtonProps

export const BackPaperAdornment: React.FC<BackPaperAdornmentProps> = props => (
  <PaperAdornmentIconButton {...props}>
    <ArrowBackRounded />
  </PaperAdornmentIconButton>
)
