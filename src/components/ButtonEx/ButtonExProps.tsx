import { ButtonProps } from '@material-ui/core'
import type { LocationDescriptor, LocationState } from 'history'

import BoxlikeComponentProps from '../../BoxlikeComponentProps'

interface ButtonExProps extends ButtonProps, BoxlikeComponentProps {
  target?: string
  to?: LocationDescriptor<LocationState>
}

export default ButtonExProps
