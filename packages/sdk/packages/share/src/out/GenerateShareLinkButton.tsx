import type { ButtonProps } from '@mui/material'
import {
  Button, CircularProgress, styled,
} from '@mui/material'
import React from 'react'

export interface GenerateShareLinkButtonProps extends ButtonProps {
  loading?: boolean
}

export const GenerateShareLinkButton: React.FC<GenerateShareLinkButtonProps> = ({
  children = 'Generate My Share Link', loading, ...props
}) => {
  return (
    <Button
      variant="contained"
      startIcon={loading ? <StyledCircularProgress size="small" /> : null}
      {...props}
    >
      {children}
    </Button>
  )
}

const StyledCircularProgress = styled(CircularProgress, { name: 'StyledCircularProgress' })(({ theme }) => ({
  // ensure the color of the spinner is the same as the button color
  color: theme.palette.getContrastText(theme.palette.primary.main),
  height: '20px',
  opacity: '.87',
  width: '20px',
}))
