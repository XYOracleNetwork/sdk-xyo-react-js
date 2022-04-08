import { Dialog, DialogActions, DialogContent } from '@mui/material'
import { ButtonEx } from '@xylabs/sdk-react'
import { Dispatch, SetStateAction } from 'react'

import { AuthServiceWrapper } from '../AuthServiceWrapper'

export interface ReAuthDialogProps {
  reAuthState: [boolean, Dispatch<SetStateAction<boolean>>]
}

export const ReAuthDialog: React.FC<ReAuthDialogProps> = ({ reAuthState }) => {
  const [reAuth, setReAuth] = reAuthState

  const handleClose = () => {
    setReAuth(false)
  }

  return (
    <Dialog open={reAuth}>
      <DialogContent>
        <AuthServiceWrapper />
      </DialogContent>
      <DialogActions>
        <ButtonEx onClick={handleClose} variant="text">
          Close
        </ButtonEx>
      </DialogActions>
    </Dialog>
  )
}
