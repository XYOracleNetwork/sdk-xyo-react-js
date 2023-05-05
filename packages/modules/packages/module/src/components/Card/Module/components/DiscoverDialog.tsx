import { Button, Dialog, DialogActions, DialogContent, DialogProps } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ModuleWrapper } from '@xyo-network/module'
import { Payload } from '@xyo-network/payload-model'
import { Dispatch, SetStateAction, useState } from 'react'

export interface DiscoverDialogProps extends DialogProps {
  setOpen?: Dispatch<SetStateAction<boolean>>
  wrapper?: ModuleWrapper
}

export const DiscoverDialog: React.FC<DiscoverDialogProps> = ({ setOpen, wrapper, ...props }) => {
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
      <DialogContent>
        <pre>{JSON.stringify(discoverPayloads, null, 2)}</pre>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen?.(false)} variant={'outlined'}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
