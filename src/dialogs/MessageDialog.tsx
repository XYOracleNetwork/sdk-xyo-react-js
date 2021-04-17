import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React, { ReactElement } from 'react'

interface Props {
  children: ReactElement | ReactElement[]
  onClose?: () => void
  open?: boolean
  title: string
}

const MessageDialogOpen: React.FC<Props> = (props) => {
  const { onClose, children, title, open = false } = props

  const onCloseClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    onClose?.()
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column">
          <Box display="flex" width="100%">
            {children}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box display="flex" width="100%">
          <Box>
            <Button onClick={onCloseClicked} variant="text">
              Close
            </Button>
          </Box>
          <Box flexGrow={1}></Box>
          <Box>
            <Button onClick={onCloseClicked} variant="text">
              Ok
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

const MessageDialog: React.FC<Props> = (props) => {
  const { open } = props
  if (open) {
    return <MessageDialogOpen {...props} />
  } else {
    return null
  }
}

export default MessageDialog
