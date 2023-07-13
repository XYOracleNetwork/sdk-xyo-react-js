import { BoundWitness } from '@xyo-network/boundwitness-model'
import { ModuleError } from '@xyo-network/payload-model'
import { ContextExState } from '@xyo-network/react-shared'

export interface NestedBoundWitnesses {
  [hash: string]: BoundWitness
}
export interface HashSelectionHistoryState extends ContextExState {
  addSelection?: (boundwitness?: BoundWitness | null) => Promise<BoundWitness | undefined | null>
  clearHistory?: () => boolean
  error?: ModuleError
  fetchFromHash?: (hash?: string) => Promise<BoundWitness | undefined | null>
  hashSelectionHistory?: string[]
  nestedBoundWitnesses?: NestedBoundWitnesses
}
