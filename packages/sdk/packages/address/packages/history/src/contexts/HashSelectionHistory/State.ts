import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoError } from '@xyo-network/module'
import { ContextExState } from '@xyo-network/react-shared'

export interface NestedBoundWitnesses {
  [hash: string]: XyoBoundWitness
}
export interface HashSelectionHistoryState extends ContextExState {
  addSelection?: (boundwitness?: XyoBoundWitness) => Promise<XyoBoundWitness | null>
  clearHistory?: () => boolean
  fetchFromHash?: (hash?: string) => Promise<XyoBoundWitness | undefined | null>
  hashSelectionHistory?: string[]
  nestedBoundWitnesses?: NestedBoundWitnesses
  error?: XyoError
}
