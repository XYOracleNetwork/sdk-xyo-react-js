import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface SeedPhraseContextState extends ContextExState {
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
}
