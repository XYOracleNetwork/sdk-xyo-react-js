import { Button, useTheme } from '@mui/material'
import { MouseEvent } from 'react'

import mergeBoxlikeStyles from '../../mergeBoxlikeStyles'
import BusyCircularProgress from '../BusyCircularProgress'
import BusyLinearProgress from '../BusyLinearProgress'
import ButtonExProps from './ButtonExProps'

const ButtonEx: React.FC<ButtonExProps> = (props) => {
  const theme = useTheme()
  const {
    busy,
    busyVariant = 'linear',
    busyOpacity,
    onClick,
    children,
    ...rootProps
  } = mergeBoxlikeStyles<ButtonExProps>(theme, props)

  const localOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!busy) {
      onClick?.(event)
    }
  }

  return (
    <Button onClick={localOnClick} {...rootProps}>
      {busy && busyVariant === 'linear' ? <BusyLinearProgress rounded opacity={busyOpacity ?? 0} /> : null}
      {busy && busyVariant === 'circular' ? (
        <BusyCircularProgress rounded size={24} opacity={busyOpacity ?? 0.5} />
      ) : null}
      {children}
    </Button>
  )
}

export default ButtonEx
