import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material'
import { JsonValue } from '@xylabs/object'
import React, { MouseEventHandler, ReactNode } from 'react'

import { ExpansionProps } from '../../../lib/index.js'
import { JsonViewerCollapse } from './JsonViewerCollapse.js'

export interface RawInfoDialogProps extends DialogProps, ExpansionProps {
  dialogContent?: ReactNode
  jsonValue?: JsonValue
  onCloseCallback?: () => void
}

export const RawInfoDialog: React.FC<RawInfoDialogProps> = ({
  defaultExpandedJson,
  dialogContent,
  onCloseCallback,
  jsonValue: jsonObject,
  updateExpandedJson,
  open = false,
  ...props
}) => {
  const onDialogClick: MouseEventHandler<HTMLSpanElement> = (event) => {
    event.stopPropagation()
  }

  return (
    //  Wrapping in a span so we can catch click events and prevent them from propagating outside the component
    <span onClick={onDialogClick}>
      <Dialog fullWidth maxWidth="lg" onClose={() => onCloseCallback?.()} open={open} {...props}>
        <DialogTitle>Raw Data</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {dialogContent}
          <JsonViewerCollapse defaultExpandedJson={defaultExpandedJson} jsonValue={jsonObject} updateExpandedJson={updateExpandedJson} />
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
