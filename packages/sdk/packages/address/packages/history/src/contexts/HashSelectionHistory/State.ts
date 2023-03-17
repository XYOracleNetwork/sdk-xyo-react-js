import { BoundWitness } from '@xyo-network/boundwitness-model'
import { XyoError } from '@xyo-network/module'
import { ContextExState } from '@xyo-network/react-shared'

export interface NestedBoundWitnesses {
  [hash: string]: BoundWitness
}
export interface HashSelectionHistoryState extends ContextExState {
  addSelection?: (boundwitness?: BoundWitness) => Promise<BoundWitness | null>
  clearHistory?: () => boolean
  error?: XyoError
  fetchFromHash?: (hash?: string) => Promise<BoundWitness | undefined | null>
  hashSelectionHistory?: string[]
  nestedBoundWitnesses?: NestedBoundWitnesses
}
