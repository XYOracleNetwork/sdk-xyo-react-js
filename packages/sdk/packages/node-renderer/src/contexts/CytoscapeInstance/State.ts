import type { ContextExState } from '@xylabs/react-shared'
import type { Core } from 'cytoscape'
import type { Dispatch, SetStateAction } from 'react'

export type CytoscapeInstanceState = ContextExState<{
  cy?: WeakRef<Core>
  setCy?: Dispatch<SetStateAction<WeakRef<Core> | undefined>>
}>
