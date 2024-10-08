import type { DialogProps } from '@mui/material'
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Paper,
} from '@mui/material'
import { usePromise } from '@xylabs/react-promise'
import type { ModuleInstance } from '@xyo-network/module-model'
import type { Dispatch, SetStateAction } from 'react'
import React from 'react'

export interface DiscoverDialogProps extends DialogProps {
  mod?: ModuleInstance
  setOpen?: Dispatch<SetStateAction<boolean>>
}

// Add a dialogue title and quick tip to show description of discover query

export const DiscoverDialog: React.FC<DiscoverDialogProps> = ({
  mod, setOpen, ...props
}) => {
  const [discoverPayloads] = usePromise(async () => {
    return await mod?.state()
  }, [mod])

  return (
    <Dialog {...props}>
      <DialogTitle>
        Supported Queries for
        {mod?.config.name || mod?.address}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Paper sx={{ p: 1 }}>
          <DialogContentText>All modules share a set of base queries along with ones specific to the module.</DialogContentText>
          <pre>{JSON.stringify(discoverPayloads, null, 2)}</pre>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen?.(false)} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
