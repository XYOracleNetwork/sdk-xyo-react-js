import { Chip, FormControl, FormLabel, StandardTextFieldProps, TextField } from '@mui/material'
import { useState } from 'react'

import { useSeedPhrase } from '../../../../../contexts'
import { InvalidPhraseTypography, PhraseHeaderBox } from './validation-messages'

export interface SavedPhraseTextFieldProps extends StandardTextFieldProps {
  showPhraseHeader?: boolean
}

export const SavedPhraseTextField: React.FC<SavedPhraseTextFieldProps> = ({ showPhraseHeader, ...props }) => {
  const { validSeedPhrase, seedPhrase } = useSeedPhrase()

  const [visible, setVisible] = useState(false)

  return (
    <FormControl fullWidth size="small" sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
      <Chip label={visible ? 'Hide Saved Seed Phrase' : 'Reveal Saved Seed Phrase'} onClick={() => setVisible(!visible)} />
      {visible ?
        <>
          {showPhraseHeader ?
            <FormLabel>
              <PhraseHeaderBox conditional={validSeedPhrase}>Saved Seed Phrase</PhraseHeaderBox>
            </FormLabel>
          : null}
          <TextField
            defaultValue={seedPhrase}
            disabled
            error={validSeedPhrase === false}
            helperText={validSeedPhrase === false ? <InvalidPhraseTypography /> : null}
            fullWidth
            maxRows={Number.POSITIVE_INFINITY}
            multiline
            {...props}
          />
        </>
      : null}
    </FormControl>
  )
}
