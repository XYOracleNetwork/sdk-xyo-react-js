import { ContentCopy } from '@mui/icons-material'
import type { StandardTextFieldProps } from '@mui/material'
import {
  Chip, FormControl, FormLabel, IconButton, TextField,
  Tooltip,
  useTheme,
} from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import React, { useMemo, useState } from 'react'

import { useSeedPhrase } from '../../../../../contexts/index.ts'
import { InvalidPhraseTypography, PhraseHeaderBox } from './validation-messages/index.ts'

/** @public */
export interface SavedPhraseTextFieldProps extends StandardTextFieldProps {
  fullWidth?: boolean
  showCopyButton?: boolean
  showPhraseHeader?: boolean
  visible?: boolean
}

/** @public */
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
          label="Show Seed Phrase"
          onClick={() => setVisible(!visible)}
          // Margin is set to 2px to match the Copy Button size and remove jumping during animation
          sx={{ alignSelf: 'center', my: '2px' }}
        />
        <Tooltip title={copied ? 'Copied!' : 'Copy'}>
          <IconButton
            onClick={() => void onCopyPhrase()}
            sx={{
              height: visible ? 'auto' : 0,
              opacity: visible ? 1 : 0,
              overflow: 'hidden',
              padding: visible ? theme.spacing(1) : 0,
              transition: 'all .25s ease-in-out',
              width: visible ? 'max-content' : 0,
            }}
          >
            <ContentCopy fontSize="small" />
          </IconButton>
        </Tooltip>
      </FlexRow>
      {visible && showPhraseHeader
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
        slotProps={{
          input: {
            style: {
              height: visible ? 'auto' : '0',
              overflow: 'hidden',
              opacity: visible ? 1 : 0,
              padding: visible ? theme.spacing(1) : 0,
              transition: 'all .25s ease-in-out',
            },
          },
        }}
        {...props}
      />

    </FormControl>
  )
}
