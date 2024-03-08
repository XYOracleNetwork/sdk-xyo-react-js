import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material'
import { JsonObject } from '@xylabs/object'
import { MouseEventHandler, ReactNode } from 'react'

import { ExpansionProps } from '../../../lib'
import { JsonViewerCollapse } from './JsonViewerCollapse'

export interface RawInfoDialogProps extends DialogProps, ExpansionProps {
  dialogContent?: ReactNode
  jsonObject?: JsonObject | null
  onCloseCallback?: () => void
}

export const RawInfoDialog: React.FC<RawInfoDialogProps> = ({
  defaultExpandedJson,
  dialogContent,
  onCloseCallback,
  jsonObject,
  updateExpandedJson,
  ...props
}) => {
  const onDialogClick: MouseEventHandler<HTMLSpanElement> = (event) => {
    event.stopPropagation()
  }

  return (
    //  Wrapping in a span so we can catch click events and prevent them from propagating outside the component
    <span onClick={onDialogClick}>
      <Dialog fullWidth maxWidth="lg" onClose={() => onCloseCallback?.()} {...props}>
        <DialogTitle>Raw Data</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {dialogContent}
          <JsonViewerCollapse defaultExpandedJson={defaultExpandedJson} jsonObject={jsonObject} updateExpandedJson={updateExpandedJson} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => onCloseCallback?.()}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  )
}
