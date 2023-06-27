import { WithChildren } from '@xylabs/react-shared'
import { generateMnemonic, validateMnemonic, wordlists } from '@xyo-network/bip39'
import { useEffect, useMemo, useState } from 'react'

import { SeedPhraseContext } from './Context'

export interface SeedPhraseProviderProps extends WithChildren {
  defaultPhrase?: string
  handleChangeSeedPhrase?: (phrase: string) => void
  open?: boolean
  saveCallback?: () => void
  seedPhrase?: string
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
    if (!open) {
      handleCancelOverwrite()
    }
  }, [open])

  useEffect(() => {
    if (seedPhrase || open) {
      setPhrase?.(seedPhrase ?? '')
    }
  }, [seedPhrase, open, setPhrase])

  const handleGenerate = () => {
    const mnemonic = generateMnemonic(wordlists.english, 256)
    setPhrase?.(mnemonic)
    setOverwriteWarning?.(false)
  }

  const handleCancelOverwrite = () => {
    setOverwriteWarning?.(false)
  }

  const handleClear = () => {
    setPhrase?.('')
    setOverwriteWarning?.(false)
  }

  const handleSave = () => {
    if (!overwriteWarning && seedPhrase && seedPhrase !== phrase) {
      setOverwriteWarning?.(true)
    } else {
      handleChangeSeedPhrase?.(phrase ?? '')
      saveCallback?.()
    }
  }

  const validate = (passedPhrase?: string) => {
    if (!passedPhrase) {
      return null
    }
    return validateMnemonic(passedPhrase, wordlists.english)
  }

  const validSeedPhrase = useMemo(() => validate?.(seedPhrase), [seedPhrase])
  const validPhrase = useMemo(() => validate?.(phrase), [phrase])

  return (
    <SeedPhraseContext.Provider
      value={{
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
      }}
    >
      {children}
    </SeedPhraseContext.Provider>
  )
}
