import { useContextEx } from '@xyo-network/react-shared'

import { SeedPhraseContext } from './Context.js'

export const useSeedPhrase = () => useContextEx(SeedPhraseContext, 'SeedPhrase', true)
