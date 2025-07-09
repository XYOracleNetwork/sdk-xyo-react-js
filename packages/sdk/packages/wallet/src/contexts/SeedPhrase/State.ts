import type { ContextExState } from '@xylabs/react-shared'
import type { Dispatch, SetStateAction } from 'react'

/** @public */
export type SeedPhraseContextState = ContextExState<{
  handleCancelOverwrite?: () => void
  handleChangeSeedPhrase?: (value: string) => void
  handleClear?: () => void
  handleGenerate?: () => void
  handleSave?: () => void
  overwriteWarning?: boolean
  phrase?: string
  seedPhrase?: string
  setOverwriteWarning?: Dispatch<SetStateAction<boolean>>
  setPhrase?: Dispatch<SetStateAction<string | undefined>>
  validPhrase?: boolean | null
  validSeedPhrase?: boolean | null
  validate?: (passedPhrase?: string) => boolean | null
}>
