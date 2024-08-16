import type { Address } from '@xylabs/hex'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import type { NodeInstance } from '@xyo-network/node-model'
import type { CytoscapeOptions } from 'cytoscape'
import type { PropsWithChildren, ReactNode } from 'react'

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
