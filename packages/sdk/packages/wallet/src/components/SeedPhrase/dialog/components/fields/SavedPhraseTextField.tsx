import { ContentCopy } from '@mui/icons-material'
import type { StandardTextFieldProps } from '@mui/material'
import {
  Chip, FormControl, FormLabel, Grow, IconButton, TextField,
  Tooltip,
  useTheme,
} from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import React, { useMemo, useState } from 'react'

import { useSeedPhrase } from '../../../../../contexts/index.ts'
import { InvalidPhraseTypography, PhraseHeaderBox } from './validation-messages/index.ts'

export interface SavedPhraseTextFieldProps extends StandardTextFieldProps {
  fullWidth?: boolean
  showCopyButton?: boolean
  showPhraseHeader?: boolean
  visible?: boolean
}

export const SavedPhraseTextField: React.FC<SavedPhraseTextFieldProps> = ({
  fullWidth, showCopyButton, showPhraseHeader, visible: visibleProp, ...props
}) => {
  const { validSeedPhrase, seedPhrase } = useSeedPhrase()
  const theme = useTheme()

  const [visible, setVisible] = useState(visibleProp)

  useMemo(() => {
    setVisible(visibleProp)
  }, [visibleProp])

  const [copied, setCopied] = useState(false)
  const onCopyPhrase = async () => {
    if (seedPhrase) {
      try {
        await navigator.clipboard.writeText(seedPhrase)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (e) {
        console.error('Error copying resolvedSelectedAddress to clipboard', e)
      }
    }
  }

  return (
    <FormControl
      fullWidth={fullWidth}
      size="small"
      sx={{
        display: 'flex', flexDirection: 'column', rowGap: 1,
      }}
    >
      <FlexRow gap={0.5}>
        <Chip
          label={visible ? 'Hide Saved Seed Phrase' : 'Reveal Saved Seed Phrase'}
          onClick={() => setVisible(!visible)}
          sx={{ alignSelf: 'center' }}
        />
        <Grow in={showCopyButton && visible}>
          <Tooltip title={copied ? 'Copied!' : 'Copy'}>
            <IconButton onClick={() => void onCopyPhrase()}>
              <ContentCopy fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grow>
      </FlexRow>
      {visible && showPhraseHeader
        ? (
            <FormLabel>
              <PhraseHeaderBox conditional={validSeedPhrase}>Saved Seed Phrase</PhraseHeaderBox>
            </FormLabel>
          )
        : null}
      <Grow in={visible}>
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
      </Grow>

    </FormControl>
  )
}
