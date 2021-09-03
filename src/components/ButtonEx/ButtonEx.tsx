import { Button, useTheme } from '@material-ui/core'
import React, { MouseEvent } from 'react'
import { useHistory } from 'react-router-dom'

import mergeBoxlikeStyles from '../../mergeBoxlikeStyles'
import BusyCircularProgress from '../BusyCircularProgress'
import BusyLinearProgress from '../BusyLinearProgress'
import ButtonExProps from './ButtonExProps'

const ButtonEx: React.FC<ButtonExProps> = (props) => {
  const theme = useTheme()
  const {
    to,
    busy,
    busyVariant = 'linear',
    busyOpacity,
    onClick,
    children,
    ...rootProps
  } = mergeBoxlikeStyles<ButtonExProps>(theme, props)
  const history = useHistory()

  const localOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (to) {
      history.push(to)
    }
  }

  return (
    <Button onClick={localOnClick} {...rootProps}>
      {busy && busyVariant === 'linear' ? <BusyLinearProgress opacity={busyOpacity} /> : null}
      {busy && busyVariant === 'circular' ? <BusyCircularProgress opacity={busyOpacity} /> : null}
      {children}
    </Button>
  )
}

export default ButtonEx
