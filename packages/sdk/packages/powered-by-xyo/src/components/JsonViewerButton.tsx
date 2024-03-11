import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { ButtonEx, ButtonExProps } from '@xylabs/react-button'
import { JsonViewerEx, JsonViewerExProps } from '@xyo-network/react-payload-raw-info'
import { useState } from 'react'

export interface JsonViewerButtonProps extends ButtonExProps {
  jsonViewProps?: Partial<JsonViewerExProps>
  src: object
}

export const JsonViewerButton: React.FC<JsonViewerButtonProps> = ({ children, jsonViewProps, src, title, ...props }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <ButtonEx onClick={() => setOpen(!open)} {...props}>
        {children ?? 'JSON'}
      </ButtonEx>
      <Dialog open={open} onClose={() => setOpen(false)}>
        {title ?
          <DialogTitle>{title}</DialogTitle>
        : null}
        <DialogContent>
          <JsonViewerEx value={src} {...jsonViewProps} />
        </DialogContent>
        <DialogActions>
          <ButtonEx onClick={() => setOpen(false)}>Close</ButtonEx>
        </DialogActions>
      </Dialog>
    </>
  )
}
