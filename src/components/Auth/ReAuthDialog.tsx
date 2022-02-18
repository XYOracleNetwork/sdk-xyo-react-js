import { Dialog, DialogActions, DialogContent } from '@mui/material'
import { ButtonEx } from '@xylabs/sdk-react'

import { AuthActionTypes, useAuthState } from '../../contexts'
import { AuthServiceWrapper } from './AuthServiceWrapper'

const ReAuthDialog = () => {
  const { state: authState, dispatch: authDispatch } = useAuthState()

  const handleClose = () => {
    authDispatch({ payload: { reAuthenticate: false }, type: AuthActionTypes.UpdateReAuthenticate })
  }
  return (
    <Dialog open={!!authState.reAuthenticate}>
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

export { ReAuthDialog }
