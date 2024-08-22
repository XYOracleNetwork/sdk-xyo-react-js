import type { IconButtonProps } from '@mui/material'
import { IconButton, styled } from '@mui/material'

export interface PaperAdornmentIconButton extends IconButtonProps {
  themePadding?: number
}

export const PaperAdornmentIconButton = styled(IconButton, { name: 'PaperAdornmentIconButton' })<PaperAdornmentIconButton>(
  ({ theme, themePadding = 1 }) => ({
    borderRadius: 0,
    padding: theme.spacing(themePadding),
  }),
)
