import { BoundWitness } from '@xyo-network/boundwitness-model'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface ActiveBoundWitnessState extends ContextExState {
  activeBoundWitness?: BoundWitness
  activeBoundWitnessHash?: string
  setActiveBoundWitness?: Dispatch<SetStateAction<BoundWitness | undefined>>
  setActiveBoundWitnessHash?: Dispatch<SetStateAction<string | undefined>>
}
