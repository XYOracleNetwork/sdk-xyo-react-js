import type { ContextExState } from '@xylabs/react-shared'
import type { Hash } from '@xylabs/sdk-js'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import type { ModuleError } from '@xyo-network/payload-model'

export interface NestedBoundWitnesses {
  [hash: Hash]: BoundWitness
}
export type HashSelectionHistoryState = ContextExState<{
  addSelection?: (boundwitness?: BoundWitness | null) => Promise<BoundWitness | undefined | null>
  clearHistory?: () => boolean
  error?: ModuleError
  fetchFromHash?: (hash?: Hash) => Promise<BoundWitness | undefined | null>
  hashSelectionHistory?: Hash[]
  nestedBoundWitnesses?: NestedBoundWitnesses
}>
