import { Button, DialogActions } from '@mui/material'
import React from 'react'

import { useSeedPhrase } from '../../../../../contexts/index.ts'

/** @public */
export const PhraseDialogActions = () => {
  const {
    handleClear, handleGenerate, overwriteWarning,
  } = useSeedPhrase()
  return (
    <DialogActions sx={{ justifyContent: 'center' }}>
      <Button disabled={overwriteWarning} variant="contained" onClick={handleGenerate}>
        Generate
      </Button>
      <Button variant="outlined" onClick={handleClear}>
        Clear
      </Button>
    </DialogActions>
  )
}
