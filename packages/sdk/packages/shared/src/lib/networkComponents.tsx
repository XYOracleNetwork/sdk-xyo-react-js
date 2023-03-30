import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded'
import CloudRoundedIcon from '@mui/icons-material/CloudRounded'
import HubRoundedIcon from '@mui/icons-material/HubRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import TimerRoundedIcon from '@mui/icons-material/TimerRounded'
import { SvgIconProps } from '@mui/material'
import { ReactElement } from 'react'

export type NetworkComponentSlug = 'sentinel' | 'bridge' | 'archivist' | 'diviner' | 'node'

export interface NetworkComponentDetails {
  icon: (props?: SvgIconProps) => ReactElement
  name: string
  slug: NetworkComponentSlug
}

export const networkComponents: NetworkComponentDetails[] = [
  { icon: (props) => <HubRoundedIcon {...props} />, name: 'Node', slug: 'node' },
  { icon: (props) => <TimerRoundedIcon {...props} />, name: 'Sentinel', slug: 'sentinel' },
  { icon: (props) => <CloudRoundedIcon {...props} />, name: 'Bridge', slug: 'bridge' },
  { icon: (props) => <Inventory2RoundedIcon {...props} />, name: 'Archivist', slug: 'archivist' },
  { icon: (props) => <BubbleChartRoundedIcon {...props} />, name: 'Diviner', slug: 'diviner' },
]

export const findNetworkComponentIndex = (slug: string) => {
  return networkComponents.findIndex((info) => info.slug === slug)
}

export const findNetworkComponent = (slug: string) => {
  return networkComponents.find((info) => info.slug === slug)
}
