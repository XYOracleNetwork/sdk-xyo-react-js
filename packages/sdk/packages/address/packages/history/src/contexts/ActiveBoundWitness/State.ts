import { XyoBoundWitness } from '@xyo-network/boundwitness-model'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface ActiveBoundWitnessState extends ContextExState {
  activeBoundWitness?: XyoBoundWitness
  activeBoundWitnessHash?: string
  setActiveBoundWitness?: Dispatch<SetStateAction<XyoBoundWitness | undefined>>
  setActiveBoundWitnessHash?: Dispatch<SetStateAction<string | undefined>>
}
