import { FlexBoxProps } from '@xylabs/react-flexbox'
import { CytoscapeOptions } from 'cytoscape'
import { PropsWithChildren, ReactNode } from 'react'

export interface NodeRelationalGraphProps extends PropsWithChildren<FlexBoxProps> {
  actions?: ReactNode
  detail?: ReactNode
  fcose?: boolean
  options?: CytoscapeOptions
  showDetails?: boolean
}
