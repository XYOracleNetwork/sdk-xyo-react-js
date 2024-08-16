import type { Hash } from '@xylabs/hex'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import type { ModuleError } from '@xyo-network/payload-model'
import type { ContextExState } from '@xyo-network/react-shared'

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
