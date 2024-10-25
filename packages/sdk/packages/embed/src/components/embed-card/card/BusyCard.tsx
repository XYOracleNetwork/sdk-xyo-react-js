import type { CardProps } from '@mui/material'
import { Card } from '@mui/material'
import { useBusyTiming } from '@xylabs/react-flexbox'
import type {
  BusyCircularProgressProps,
  BusyLinearProgressProps,
  BusyVariant,
} from '@xylabs/react-shared'
import {
  BusyCircularProgress,
  BusyLinearProgress,
} from '@xylabs/react-shared'
import type { PropsWithChildren } from 'react'
import React from 'react'

export interface BusyCardProps extends CardProps {
  busy?: boolean
  busyMinimum?: number
  busyVariant?: BusyVariant
  busyVariantProps?: BusyCircularProgressProps | BusyLinearProgressProps
}

export const BusyCard: React.FC<PropsWithChildren<BusyCardProps>> = ({
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
