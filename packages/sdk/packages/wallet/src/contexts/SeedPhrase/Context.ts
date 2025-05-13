import { createContextEx } from '@xylabs/react-shared'

import type { SeedPhraseContextState } from './State.ts'

export const SeedPhraseContext = createContextEx<SeedPhraseContextState>()
