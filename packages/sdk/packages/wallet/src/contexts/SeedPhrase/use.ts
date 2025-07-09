import { useContextEx } from '@xylabs/react-shared'

import { SeedPhraseContext } from './Context.ts'

/** @public */
export const useSeedPhrase = () => useContextEx(SeedPhraseContext, 'SeedPhrase', true)
