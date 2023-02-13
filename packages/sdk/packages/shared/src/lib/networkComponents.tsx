import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded'
import CloudRoundedIcon from '@mui/icons-material/CloudRounded'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
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
  { icon: (props) => <BubbleChartRoundedIcon {...props} />, name: 'Sentinel', slug: 'sentinel' },
  { icon: (props) => <CloudRoundedIcon {...props} />, name: 'Bridge', slug: 'bridge' },
  { icon: (props) => <GridViewRoundedIcon {...props} />, name: 'Archivist', slug: 'archivist' },
  { icon: (props) => <VisibilityRoundedIcon {...props} />, name: 'Diviner', slug: 'diviner' },
  { icon: (props) => <XyoLogo {...props} />, name: 'Node', slug: 'node' },
]

export const findNetworkComponentIndex = (slug: string) => {
  return networkComponents.findIndex((info) => info.slug === slug)
}

export const findNetworkComponent = (slug: string) => {
  return networkComponents.find((info) => info.slug === slug)
}
