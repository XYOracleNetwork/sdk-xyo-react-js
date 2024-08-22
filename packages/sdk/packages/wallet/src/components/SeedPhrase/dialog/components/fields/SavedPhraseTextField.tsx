import type { StandardTextFieldProps } from '@mui/material'
import {
  Chip, FormControl, FormLabel, TextField,
} from '@mui/material'
import React, { useState } from 'react'

import { useSeedPhrase } from '../../../../../contexts/index.ts'
import { InvalidPhraseTypography, PhraseHeaderBox } from './validation-messages/index.ts'

export interface SavedPhraseTextFieldProps extends StandardTextFieldProps {
  fullWidth?: boolean
  showPhraseHeader?: boolean
}

export const SavedPhraseTextField: React.FC<SavedPhraseTextFieldProps> = ({
  fullWidth, showPhraseHeader, ...props
}) => {
  const { validSeedPhrase, seedPhrase } = useSeedPhrase()

  const [visible, setVisible] = useState(false)

  return (
    <FormControl
      fullWidth={fullWidth}
      size="small"
      sx={{
        display: 'flex', flexDirection: 'column', rowGap: 1,
      }}
    >
      <Chip
        label={visible ? 'Hide Saved Seed Phrase' : 'Reveal Saved Seed Phrase'}
        onClick={() => setVisible(!visible)}
        sx={{ alignSelf: 'center' }}
      />
      {visible
        ? (
            <>
              {showPhraseHeader
                ? (
                    <FormLabel>
                      <PhraseHeaderBox conditional={validSeedPhrase}>Saved Seed Phrase</PhraseHeaderBox>
                    </FormLabel>
                  )
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
          )
        : null}
    </FormControl>
  )
}
