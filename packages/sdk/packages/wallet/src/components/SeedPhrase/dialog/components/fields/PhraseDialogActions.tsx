import type { DialogActionsProps } from '@mui/material'
import { Button, DialogActions } from '@mui/material'
import React from 'react'

import { useSeedPhrase } from '../../../../../contexts/index.ts'

export interface PhraseDialogActionsProps extends DialogActionsProps {
  hideClear?: boolean
  hideGenerate?: boolean
}

/** @public */
export const PhraseDialogActions: React.FC<PhraseDialogActionsProps> = ({
  hideClear, hideGenerate, ...props
}) => {
  const {
    handleClear, handleGenerate, overwriteWarning,
  } = useSeedPhrase()
  return (
    <DialogActions sx={{ justifyContent: 'center' }} {...props}>
      {hideGenerate
        ? null
        : (
            <Button disabled={overwriteWarning} variant="contained" onClick={handleGenerate}>
              Generate
            </Button>
          )}
      {hideClear
        ? null
        : (
            <Button variant="outlined" onClick={handleClear}>
              Clear
            </Button>

          )}
    </DialogActions>
  )
}
