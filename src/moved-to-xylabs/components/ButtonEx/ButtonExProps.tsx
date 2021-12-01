/* eslint-disable @delagen/deprecation/deprecation */
import { ButtonProps } from '@mui/material'
import { NavigateOptions, To } from 'react-router-dom'

import BoxlikeComponentProps from '../../BoxlikeComponentProps'
import BusyProps from '../../BusyProps'

/** @deprecated Moved to @xylabs/sdk-react */
interface ButtonExProps extends ButtonProps, BoxlikeComponentProps, BusyProps {
  target?: string
  to?: To
  toOptions?: NavigateOptions
}

export default ButtonExProps
