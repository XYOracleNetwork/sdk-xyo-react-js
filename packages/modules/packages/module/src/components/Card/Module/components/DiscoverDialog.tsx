import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Divider, Paper } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { Module, ModuleWrapper } from '@xyo-network/module'
import { Payload } from '@xyo-network/payload-model'
import { Dispatch, SetStateAction, useState } from 'react'

export interface DiscoverDialogProps extends DialogProps {
  module?: Module
  setOpen?: Dispatch<SetStateAction<boolean>>
  wrapper?: ModuleWrapper
}

// Add a dialogue title and quick tip to show description of discover query

export const DiscoverDialog: React.FC<DiscoverDialogProps> = ({ module, setOpen, wrapper, ...props }) => {
  const [discoverPayloads, setDiscoverPayloads] = useState<Payload[]>([])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (wrapper) {
        const payloads = await wrapper.discover()
        if (mounted()) setDiscoverPayloads(payloads)
      }
    },
    [wrapper],
  )

  return (
    <Dialog {...props}>
      <DialogTitle>Supported Queries for {module?.config.name || module?.address}</DialogTitle>
      <Divider />
      <DialogContent>
        <Paper sx={{ p: 1 }}>
          <DialogContentText>All modules share a set of base queries along with ones specific to the module.</DialogContentText>
          <pre>{JSON.stringify(discoverPayloads, null, 2)}</pre>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen?.(false)} variant={'outlined'}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
