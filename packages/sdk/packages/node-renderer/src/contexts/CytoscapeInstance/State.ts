import { ContextExState } from '@xyo-network/react-shared'
import { Core } from 'cytoscape'
import { Dispatch, SetStateAction } from 'react'

export interface CytoscapeInstanceState extends ContextExState {
  cy?: Core
  setCy?: Dispatch<SetStateAction<Core | undefined>>
}
