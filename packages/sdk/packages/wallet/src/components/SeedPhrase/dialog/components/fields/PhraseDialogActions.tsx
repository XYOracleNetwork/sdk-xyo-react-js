import { Button, DialogActions } from '@mui/material'

import { useSeedPhrase } from '../../../../../contexts'

export const PhraseDialogActions = () => {
  const { handleClear, handleGenerate, overwriteWarning } = useSeedPhrase()
  return (
    <DialogActions sx={{ justifyContent: 'center' }}>
      <Button disabled={overwriteWarning} variant="outlined" onClick={handleGenerate}>
        Generate
      </Button>
      <Button variant="outlined" onClick={handleClear}>
        Clear
      </Button>
    </DialogActions>
  )
}
