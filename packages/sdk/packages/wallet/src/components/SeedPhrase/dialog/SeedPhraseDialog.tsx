import type { DialogProps } from '@mui/material'
import {
  Dialog, DialogContent, DialogTitle, FormLabel,
} from '@mui/material'
import React from 'react'

import { SeedPhraseProvider, useSeedPhrase } from '../../../contexts/index.ts'
import { SeedPhraseIconButton } from '../_shared/index.ts'
import {
  DialogActionButtons,
  NewPhraseTextField,
  OverwriteWarning,
  PhraseDialogActions,
  PhraseHeaderBox,
  SavedPhraseTextField,
} from './components/index.ts'

export interface SeedPhraseDialogProps extends DialogProps {
  changeSeedPhrase?: (value: string) => void
  seedPhrase?: string
  showCopyButton?: boolean
}

export const SeedPhraseDialog: React.FC<SeedPhraseDialogProps> = ({
  changeSeedPhrase, seedPhrase, ...props
}) => {
  return (
    <SeedPhraseProvider
      seedPhrase={seedPhrase}
      handleChangeSeedPhrase={changeSeedPhrase}
      open={props.open}
      saveCallback={() => props.onClose?.({}, 'escapeKeyDown')}
    >
      <SeedPhraseDialogInner {...props} />
    </SeedPhraseProvider>
  )
}

export const SeedPhraseDialogInner: React.FC<SeedPhraseDialogProps> = ({ showCopyButton, ...props }) => {
  const {
    overwriteWarning, seedPhrase, validPhrase,
  } = useSeedPhrase()

  return (
    <Dialog aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" fullWidth maxWidth="sm" {...props}>
      <DialogTitle id="alert-dialog-title">
        Update Your Seed Phrase
        {' '}
        <SeedPhraseIconButton />
      </DialogTitle>
      <DialogContent sx={{
        display: 'flex', flexDirection: 'column', rowGap: 2,
      }}
      >
        <NewPhraseTextField>
          <FormLabel>
            <PhraseHeaderBox conditional={validPhrase}>New Seed Phrase</PhraseHeaderBox>
          </FormLabel>
        </NewPhraseTextField>
        <PhraseDialogActions />
        {seedPhrase
          ? <SavedPhraseTextField showCopyButton={showCopyButton} />
          : null}
        {overwriteWarning
          ? <OverwriteWarning />
          : null}
      </DialogContent>
      <DialogActionButtons onClose={props.onClose} />
    </Dialog>
  )
}
