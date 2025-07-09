import {
  Alert, AlertTitle, Snackbar,
} from '@mui/material'
import { generateMnemonic } from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'
import type { PropsWithChildren } from 'react'
import React, { useMemo, useState } from 'react'

/** @public */
export interface DefaultSeedPhraseProps extends PropsWithChildren {
  changeSeedPhrase?: (seedPhrase: string) => void
  hideDefaultSeedPhraseMessage?: boolean
  seedPhrase?: string
}

/** @public */
export const DefaultSeedPhrase: React.FC<DefaultSeedPhraseProps> = ({
  changeSeedPhrase, children, hideDefaultSeedPhraseMessage, seedPhrase,
}) => {
  const [showSnackBar, setShowSnackBar] = useState(false)

  useMemo(() => {
    if (!seedPhrase) {
      const mnemonic = generateMnemonic(wordlist, 256)
      changeSeedPhrase?.(mnemonic)
      setShowSnackBar(true)
    }
  }, [changeSeedPhrase, seedPhrase])

  return (
    <>
      {hideDefaultSeedPhraseMessage
        ? null
        : (
            <Snackbar
              open={showSnackBar}
              autoHideDuration={5000}
              onClose={() => setShowSnackBar(false)}
              anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            >
              <Alert severity="success">
                <AlertTitle>Default Seed Phrase Generated</AlertTitle>
                Go to application settings to save it.
              </Alert>
            </Snackbar>
          )}
      {children}
    </>
  )
}
