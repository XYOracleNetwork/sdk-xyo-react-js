import { useTheme } from '@mui/material'

export const useChartColors = () => {
  const theme = useTheme()
  const dark = theme.palette.mode === 'dark'
  return {
    dataSetColorPrimary: theme.palette.primary.light,
    dataSetColorSecondary: theme.palette.secondary.light,
    gridColor: dark ? theme.palette.grey[800] : theme.palette.grey[300],
  }
}
