import { Card, CardProps } from '@mui/material'
import { useBusyTiming } from '@xylabs/react-flexbox'
import {
  BusyCircularProgress,
  BusyCircularProgressProps,
  BusyLinearProgress,
  BusyLinearProgressProps,
  BusyVariant,
  WithChildren,
} from '@xylabs/react-shared'

export interface BusyCardProps extends CardProps {
  busy?: boolean
  busyMinimum?: number
  busyVariant?: BusyVariant
  busyVariantProps?: BusyCircularProgressProps | BusyLinearProgressProps
}

export const BusyCard: React.FC<WithChildren<BusyCardProps>> = ({
  busy,
  busyMinimum = 500,
  busyVariant = 'circular',
  busyVariantProps,
  children,
  ...props
}) => {
  const internalBusy = useBusyTiming(busy, busyMinimum)
  return (
    <Card {...props}>
      {children}
      {busyVariant === 'circular' && internalBusy
        ? <BusyCircularProgress {...(busyVariantProps as BusyCircularProgressProps)} />
        : null}
      {busyVariant === 'linear' && internalBusy
        ? <BusyLinearProgress {...(busyVariantProps as BusyLinearProgressProps)} />
        : null}
    </Card>
  )
}
