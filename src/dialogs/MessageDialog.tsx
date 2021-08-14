import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@material-ui/core'

import { FlexCol, FlexRow } from '../components'

const MessageDialog: React.FC<DialogProps> = ({ onClose, children, title, open = false, ...props }) => {
  return open ? (
    <Dialog onClose={onClose} open={open} {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FlexCol alignItems="stretch">{children}</FlexCol>
      </DialogContent>
      <DialogActions>
        <FlexRow justifyContent="space-between" width="100%">
          <Button onClick={(event) => onClose?.(event, 'escapeKeyDown')} variant="text">
            Close
          </Button>
          <Button onClick={(event) => onClose?.(event, 'escapeKeyDown')} variant="text">
            Ok
          </Button>
        </FlexRow>
      </DialogActions>
    </Dialog>
  ) : null
}

export default MessageDialog
