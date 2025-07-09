import { Alert, Button } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import React from 'react'

import { useSeedPhrase } from '../../../../contexts/index.ts'

/** @public */
export const OverwriteWarning = () => {
  const { handleCancelOverwrite, handleSave } = useSeedPhrase()
  return (
    <Alert
      variant="outlined"
      severity="warning"
      action={(
        <FlexRow sx={{ columnGap: 1 }}>
          <Button variant="outlined" color="inherit" size="small" onClick={handleSave}>
            Overwrite
          </Button>
          <Button variant="outlined" color="inherit" size="small" onClick={handleCancelOverwrite}>
            Cancel
          </Button>
        </FlexRow>
      )}
    >
      Are you sure you want to overwrite existing seed phrase? This action cannot be undone.
    </Alert>
  )
}
