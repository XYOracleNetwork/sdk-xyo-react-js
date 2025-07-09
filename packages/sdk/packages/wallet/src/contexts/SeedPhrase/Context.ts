import { createContextEx } from '@xylabs/react-shared'

import type { SeedPhraseContextState } from './State.ts'

/** @public */
export const SeedPhraseContext = createContextEx<SeedPhraseContextState>()
