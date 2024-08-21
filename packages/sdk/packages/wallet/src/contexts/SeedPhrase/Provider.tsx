import { generateMnemonic, validateMnemonic } from '@scure/bip39'
// eslint-disable-next-line import-x/no-internal-modules
import { wordlist } from '@scure/bip39/wordlists/english'
import type { WithChildren } from '@xylabs/react-shared'
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react'

import { SeedPhraseContext } from './Context.ts'

export interface SeedPhraseProviderProps extends WithChildren {
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
  const [phrase, setPhrase] = useState<string | undefined>()
  const [overwriteWarning, setOverwriteWarning] = useState(false)

  useEffect(() => {
    setPhrase(defaultPhrase)
  }, [defaultPhrase])

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
    setOverwriteWarning?.(false)
  }, [])

  const handleClear = useCallback(() => {
    setPhrase?.('')
    setOverwriteWarning?.(false)
  }, [])

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

  const value = useMemo(() => ({
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
    <SeedPhraseContext.Provider
      value={value}
    >
      {children}
    </SeedPhraseContext.Provider>
  )
}
