import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface ActiveBoundWitnessState extends ContextExState {
  activeBoundWitnessHash?: string
  setActiveBoundWitnessHash?: Dispatch<SetStateAction<string | undefined>>
  activeBoundWitness?: XyoBoundWitness
  setActiveBoundWitness?: Dispatch<SetStateAction<XyoBoundWitness | undefined>>
}
