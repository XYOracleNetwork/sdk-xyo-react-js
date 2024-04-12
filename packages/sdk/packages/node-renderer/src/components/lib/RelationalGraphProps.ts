import { FlexBoxProps } from '@xylabs/react-flexbox'
import { CytoscapeOptions } from 'cytoscape'
import { PropsWithChildren, ReactNode } from 'react'

export interface NodeRelationalGraphProps extends PropsWithChildren<FlexBoxProps> {
  actions?: ReactNode
  detail?: ReactNode
  layout?: 'dagre' | 'euler' | 'cose-bilkent' | 'cola'
  layoutOptions?: object
  options?: CytoscapeOptions
  showDetails?: boolean
}
