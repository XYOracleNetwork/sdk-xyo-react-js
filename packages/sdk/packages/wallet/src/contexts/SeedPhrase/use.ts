import { useContextEx } from '@xylabs/react-shared'

import { SeedPhraseContext } from './Context.ts'

export const useSeedPhrase = () => useContextEx(SeedPhraseContext, 'SeedPhrase', true)
