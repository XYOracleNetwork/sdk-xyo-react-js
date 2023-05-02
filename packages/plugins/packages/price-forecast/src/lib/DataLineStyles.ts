import { alpha } from '@mui/material'

export const DataLineStyles = (color?: string) => ({
  backgroundColor: color ? alpha(color, 0.5) : undefined,
  borderColor: color,
})
