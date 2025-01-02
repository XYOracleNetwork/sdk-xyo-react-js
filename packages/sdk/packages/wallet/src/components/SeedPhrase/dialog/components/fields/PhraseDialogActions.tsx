import { Button, DialogActions } from '@mui/material'
import React from 'react'

import { useSeedPhrase } from '../../../../../contexts/index.ts'

export const PhraseDialogActions = () => {
  const {
    handleClear, handleGenerate, overwriteWarning,
  } = useSeedPhrase()
  return (
    <DialogActions sx={{ justifyContent: 'center' }}>
      <Button variant="outlined" onClick={handleClear}>
        Clear
      </Button>
      <Button disabled={overwriteWarning} variant="contained" onClick={handleGenerate}>
        Generate
      </Button>
    </DialogActions>
  )
}
