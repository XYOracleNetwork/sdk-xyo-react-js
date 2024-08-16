import { createContextEx } from '@xyo-network/react-shared'

import type { SeedPhraseContextState } from './State.ts'

export const SeedPhraseContext = createContextEx<SeedPhraseContextState>()
