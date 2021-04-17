import { ButtonProps } from '@material-ui/core'

import BoxlikeComponentProps from '../../BoxlikeComponentProps'

interface ButtonExProps extends ButtonProps, BoxlikeComponentProps {
  to?: string
}

export default ButtonExProps
