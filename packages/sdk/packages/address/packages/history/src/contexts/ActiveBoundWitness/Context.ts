import { createContextEx } from '@xylabs/react-shared'

import type { ActiveBoundWitnessState } from './State.ts'

export const ActiveBoundWitnessContext = createContextEx<ActiveBoundWitnessState>()
