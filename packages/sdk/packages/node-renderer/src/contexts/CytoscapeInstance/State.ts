import type { ContextExState } from '@xyo-network/react-shared'
import type { Core } from 'cytoscape'
import type { Dispatch, SetStateAction } from 'react'

export interface CytoscapeInstanceState extends ContextExState {
  cy?: WeakRef<Core>
  setCy?: Dispatch<SetStateAction<WeakRef<Core> | undefined>>
}
