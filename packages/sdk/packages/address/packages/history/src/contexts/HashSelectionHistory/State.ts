import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { ContextExState } from '@xyo-network/react-shared'

export interface NestedBoundWitnesses {
  [hash: string]: XyoBoundWitness
}
export interface HashSelectionHistoryState extends ContextExState {
  addSelection?: (boundwitness?: XyoBoundWitness) => Promise<XyoBoundWitness | null>
  clearHistory?: () => boolean
  fetchFromHash?: (hash?: string) => Promise<XyoBoundWitness | null>
  hashSelectionHistory?: string[]
  nestedBoundWitnesses?: NestedBoundWitnesses
}
