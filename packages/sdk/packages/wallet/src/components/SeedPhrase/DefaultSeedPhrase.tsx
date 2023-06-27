import { Alert, AlertTitle, Snackbar } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import { generateMnemonic, wordlists } from '@xyo-network/bip39'
import { useEffect, useState } from 'react'

export interface DefaultSeedPhraseProps extends WithChildren {
  changeSeedPhrase?: (seedPhrase: string) => void
  seedPhrase?: string
}

export const DefaultSeedPhrase: React.FC<DefaultSeedPhraseProps> = ({ changeSeedPhrase, children, seedPhrase }) => {
  const [showSnackBar, setShowSnackBar] = useState(false)

  useEffect(() => {
    if (!seedPhrase) {
      const mnemonic = generateMnemonic(wordlists.english, 256)
      changeSeedPhrase?.(mnemonic)
      setShowSnackBar(true)
    }
  }, [changeSeedPhrase, seedPhrase])

  return (
    <>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={5000}
        onClose={() => setShowSnackBar(false)}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Alert severity={'success'}>
          <AlertTitle>Default Seed Phrase Generated</AlertTitle>
          Go to application settings to save it.
        </Alert>
      </Snackbar>
      {children}
    </>
  )
}
