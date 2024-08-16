import type { Hash } from '@xylabs/hex'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import type { ContextExState } from '@xyo-network/react-shared'
import type { Dispatch, SetStateAction } from 'react'

export interface ActiveBoundWitnessState extends ContextExState {
  activeBoundWitness?: BoundWitness
  activeBoundWitnessHash?: string
  setActiveBoundWitness?: Dispatch<SetStateAction<BoundWitness | undefined>>
  setActiveBoundWitnessHash?: Dispatch<SetStateAction<Hash | undefined>>
}
