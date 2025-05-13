import { generateMnemonic, validateMnemonic } from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'
import { useResetState } from '@xylabs/react-hooks'
import type { PropsWithChildren } from 'react'
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react'

import { SeedPhraseContext } from './Context.ts'
import type { SeedPhraseContextState } from './State.ts'

export interface SeedPhraseProviderProps extends PropsWithChildren {
  defaultPhrase?: string
  handleChangeSeedPhrase?: (phrase: string) => void
  open?: boolean
  saveCallback?: () => void
  seedPhrase?: string
}

const validate = (passedPhrase?: string) => {
  if (!passedPhrase) {
    return null
  }
  return validateMnemonic(passedPhrase, wordlist)
}

export const SeedPhraseProvider: React.FC<SeedPhraseProviderProps> = ({
  children,
  defaultPhrase,
  handleChangeSeedPhrase,
  saveCallback,
  seedPhrase,
  open,
}) => {
  const [phrase, setPhrase] = useResetState<string | undefined>(defaultPhrase)
  const [overwriteWarning, setOverwriteWarning] = useState(false)

  useEffect(() => {
    if (seedPhrase || open) {
      setPhrase?.(seedPhrase ?? '')
    }
  }, [seedPhrase, open, setPhrase])

  const handleGenerate = useCallback(() => {
    const mnemonic = generateMnemonic(wordlist, 256)
    setPhrase?.(mnemonic)
    setOverwriteWarning?.(false)
  }, [])

  const handleCancelOverwrite = useCallback(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setOverwriteWarning(false)
  }, [setOverwriteWarning])

  const handleClear = useCallback(() => {
    setPhrase('')
    setOverwriteWarning(false)
  }, [setPhrase, setOverwriteWarning])

  const handleSave = useCallback(() => {
    if (!overwriteWarning && seedPhrase && seedPhrase !== phrase) {
      setOverwriteWarning?.(true)
    } else {
      handleChangeSeedPhrase?.(phrase ?? '')
      saveCallback?.()
    }
  }, [handleChangeSeedPhrase, overwriteWarning, phrase, saveCallback, seedPhrase])

  useEffect(() => {
    if (!open) {
      handleCancelOverwrite()
    }
  }, [handleCancelOverwrite, open])

  const validSeedPhrase = useMemo(() => validate?.(seedPhrase), [seedPhrase])
  const validPhrase = useMemo(() => validate?.(phrase), [phrase])

  const value: SeedPhraseContextState = useMemo(() => ({
    handleCancelOverwrite,
    handleChangeSeedPhrase,
    handleClear,
    handleGenerate,
    handleSave,
    overwriteWarning,
    phrase,
    provided: true,
    seedPhrase,
    setOverwriteWarning,
    setPhrase,
    validPhrase,
    validSeedPhrase,
    validate,
  }), [handleCancelOverwrite,
    handleChangeSeedPhrase,
    handleClear,
    handleGenerate,
    handleSave,
    overwriteWarning,
    phrase,
    seedPhrase,
    setOverwriteWarning,
    setPhrase,
    validPhrase,
    validSeedPhrase,
    validate])

  return (
    <SeedPhraseContext
      value={value}
    >
      {children}
    </SeedPhraseContext>
  )
}
