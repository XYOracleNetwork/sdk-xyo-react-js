import { Button, useTheme } from '@material-ui/core'
import { MouseEvent } from 'react'
import { useHistory } from 'react-router-dom'

import mergeBoxlikeStyles from '../../mergeBoxlikeStyles'
import ButtonExProps from './ButtonExProps'

const ButtonEx: React.FC<ButtonExProps> = (props) => {
  const theme = useTheme()
  const { to, onClick, ...rootProps } = mergeBoxlikeStyles<ButtonExProps>(theme, props)
  const history = useHistory()

  const localOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (to) {
      history.push(to)
    }
  }

  return <Button onClick={localOnClick} {...rootProps} />
}

export default ButtonEx
