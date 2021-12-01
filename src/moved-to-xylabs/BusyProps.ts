/* eslint-disable @delagen/deprecation/deprecation */
import { CircularProgressProps, LinearProgressProps } from '@mui/material'

/** @deprecated Moved to @xylabs/sdk-react */
type MaterialUIThemeColor = 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
/** @deprecated Moved to @xylabs/sdk-react */
type BusyVariant = 'circular' | 'linear'

/** @deprecated Moved to @xylabs/sdk-react */
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
