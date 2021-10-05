import { CircularProgressProps, LinearProgressProps } from '@mui/material'

type MaterialUIThemeColor = 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
type BusyVariant = 'circular' | 'linear'

interface BusyProps {
  busy?: boolean
  busyOpacity?: string | number
  busyColor?: MaterialUIThemeColor
  busyVariant?: BusyVariant
  busyCircularProps?: CircularProgressProps
  busyLinearProps?: LinearProgressProps
  busySize?: number
}

export default BusyProps
