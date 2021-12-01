/* eslint-disable @delagen/deprecation/deprecation */
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material'

import { FlexCol, FlexRow } from '../components'

interface Props extends DialogProps {
  onOk?: () => void
  onCancel?: () => void
}

/** @deprecated Moved to @xylabs/sdk-react */
const MessageDialog: React.FC<Props> = ({ onOk, onCancel, children, title, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FlexCol alignItems="stretch">{children}</FlexCol>
      </DialogContent>
      <DialogActions>
        <FlexRow justifyContent="space-between" width="100%">
          <Button onClick={onCancel} variant="text">
            Cancel
          </Button>
          <Button onClick={onOk} variant="text">
            Ok
          </Button>
        </FlexRow>
      </DialogActions>
    </Dialog>
  )
}

export default MessageDialog
