import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import { AxiosError } from 'axios'
import React from 'react'

import { ButtonEx, FlexRow } from '../components'

interface Props {
  error?: Error
  onClose?: (retry: boolean) => void
  title?: string
}

const toAxiosError = (error: Error) => {
  return (error as AxiosError).isAxiosError ? (error as AxiosError) : undefined
}

const ErrorDialogOpen: React.FC<Props> = (props) => {
  const { onClose, title = 'Oops. Something went wrong.', error = Error('Unknown Error') } = props

  const onCloseClicked = () => {
    onClose?.(false)
  }

  const onRetryClicked = () => {
    onClose?.(true)
  }

  const axiosError = toAxiosError(error)
  const message = error.message ?? error.toString()

  return (
    <Dialog onClose={onClose} open={!!error}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FlexRow>
          <Typography color="error">
            {axiosError ? `${message} [${axiosError?.code ?? 'Connection Failure'}]` : `${message}`}
          </Typography>
        </FlexRow>
      </DialogContent>
      <DialogActions>
        <FlexRow justifyContent="space-between" width="100%" minWidth="300px">
          <ButtonEx onClick={onCloseClicked} variant="text">
            Close
          </ButtonEx>
          <ButtonEx onClick={onRetryClicked} variant="text">
            Retry
          </ButtonEx>
        </FlexRow>
      </DialogActions>
    </Dialog>
  )
}

const ErrorDialog: React.FC<Props> = (props) => {
  const { error } = props
  if (error) {
    return <ErrorDialogOpen {...props} />
  } else {
    return null
  }
}

export default ErrorDialog
