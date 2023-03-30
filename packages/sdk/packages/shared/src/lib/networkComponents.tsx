import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded'
import CallMergeRoundedIcon from '@mui/icons-material/CallMergeRounded'
import CloudRoundedIcon from '@mui/icons-material/CloudRounded'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import { SvgIconProps } from '@mui/material'
import { ReactElement } from 'react'

import { XyoLogo } from './xyo'

export type NetworkComponentSlug = 'sentinel' | 'bridge' | 'archivist' | 'diviner' | 'node'

export interface NetworkComponentDetails {
  icon: (props?: SvgIconProps) => ReactElement
  name: string
  slug: NetworkComponentSlug
}

export const networkComponents: NetworkComponentDetails[] = [
  { icon: (props) => <XyoLogo {...props} />, name: 'Node', slug: 'node' },
  { icon: (props) => <BubbleChartRoundedIcon {...props} />, name: 'Sentinel', slug: 'sentinel' },
  { icon: (props) => <CloudRoundedIcon {...props} />, name: 'Bridge', slug: 'bridge' },
  { icon: (props) => <GridViewRoundedIcon {...props} />, name: 'Archivist', slug: 'archivist' },
  { icon: (props) => <CallMergeRoundedIcon {...props} />, name: 'Diviner', slug: 'diviner' },
]

export const findNetworkComponentIndex = (slug: string) => {
  return networkComponents.findIndex((info) => info.slug === slug)
}

export const findNetworkComponent = (slug: string) => {
  return networkComponents.find((info) => info.slug === slug)
}
