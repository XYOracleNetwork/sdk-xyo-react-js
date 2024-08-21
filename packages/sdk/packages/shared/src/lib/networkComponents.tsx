import {
  BubbleChartRounded as BubbleChartRoundedIcon,
  HubRounded as HubRoundedIcon,
  InsertLinkRounded as InsertLinkRoundedIcon,
  Inventory2Rounded as Inventory2RoundedIcon,
  TimerRounded as TimerRoundedIcon,
  VisibilityRounded as VisibilityRoundedIcon,
} from '@mui/icons-material'
import type { SvgIconProps } from '@mui/material'
import type { ReactElement } from 'react'
import React from 'react'

export type NetworkComponentSlug = 'sentinel' | 'bridge' | 'archivist' | 'diviner' | 'node' | 'witness'

export interface NetworkComponentDetails {
  icon: (props?: SvgIconProps) => ReactElement
  name: string
  slug: NetworkComponentSlug
}

export const networkComponents: NetworkComponentDetails[] = [
  {
    icon: props => <HubRoundedIcon {...props} />, name: 'Node', slug: 'node',
  },
  {
    icon: props => <TimerRoundedIcon {...props} />, name: 'Sentinel', slug: 'sentinel',
  },
  {
    icon: props => <InsertLinkRoundedIcon {...props} />, name: 'Bridge', slug: 'bridge',
  },
  {
    icon: props => <Inventory2RoundedIcon {...props} />, name: 'Archivist', slug: 'archivist',
  },
  {
    icon: props => <BubbleChartRoundedIcon {...props} />, name: 'Diviner', slug: 'diviner',
  },
  {
    icon: props => <VisibilityRoundedIcon {...props} />, name: 'Witness', slug: 'witness',
  },
]

export const findNetworkComponentIndex = (slug: string) => {
  return networkComponents.findIndex(info => info.slug === slug)
}

export const findNetworkComponent = (slug: string) => {
  return networkComponents.find(info => info.slug === slug)
}
