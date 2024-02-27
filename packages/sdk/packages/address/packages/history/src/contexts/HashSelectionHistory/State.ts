import { Hash } from '@xylabs/hex'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { ModuleError } from '@xyo-network/payload-model'
import { ContextExState } from '@xyo-network/react-shared'

export interface NestedBoundWitnesses {
  [hash: Hash]: BoundWitness
}
export interface HashSelectionHistoryState extends ContextExState {
  addSelection?: (boundwitness?: BoundWitness | null) => Promise<BoundWitness | undefined | null>
  clearHistory?: () => boolean
  error?: ModuleError
  fetchFromHash?: (hash?: Hash) => Promise<BoundWitness | undefined | null>
  hashSelectionHistory?: Hash[]
  nestedBoundWitnesses?: NestedBoundWitnesses
}
