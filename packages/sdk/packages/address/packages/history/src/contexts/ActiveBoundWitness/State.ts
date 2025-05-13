import type { Hash } from '@xylabs/hex'
import type { ContextExState } from '@xylabs/react-shared'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import type { Dispatch, SetStateAction } from 'react'

export type ActiveBoundWitnessState = ContextExState<{
  activeBoundWitness?: BoundWitness
  activeBoundWitnessHash?: string
  setActiveBoundWitness?: Dispatch<SetStateAction<BoundWitness | undefined>>
  setActiveBoundWitnessHash?: Dispatch<SetStateAction<Hash | undefined>>
}>
