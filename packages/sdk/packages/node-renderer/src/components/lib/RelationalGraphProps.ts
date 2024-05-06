import { Address } from '@xylabs/hex'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { NodeInstance } from '@xyo-network/node-model'
import { CytoscapeOptions } from 'cytoscape'
import { PropsWithChildren, ReactNode } from 'react'

export interface NodeRelationalGraphProps extends PropsWithChildren<FlexBoxProps> {
  actions?: ReactNode
  detail?: ReactNode
  layout?: 'dagre' | 'euler' | 'cose-bilkent' | 'cola'
  layoutOptions?: object
  node?: WeakRef<NodeInstance>
  onHover?: (address?: Address) => void
  options?: CytoscapeOptions
  showDetails?: boolean
}
