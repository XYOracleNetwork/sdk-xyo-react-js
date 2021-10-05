import { ButtonProps } from '@mui/material'
import type { LocationDescriptor, LocationState } from 'history'

import BoxlikeComponentProps from '../../BoxlikeComponentProps'
import BusyProps from '../../BusyProps'

interface ButtonExProps extends ButtonProps, BoxlikeComponentProps, BusyProps {
  target?: string
  to?: LocationDescriptor<LocationState>
}

export default ButtonExProps
