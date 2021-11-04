import { ButtonProps } from '@mui/material'
import { To } from 'react-router-dom'

import BoxlikeComponentProps from '../../BoxlikeComponentProps'
import BusyProps from '../../BusyProps'

interface ButtonExProps extends ButtonProps, BoxlikeComponentProps, BusyProps {
  target?: string
  to?: To
}

export default ButtonExProps
