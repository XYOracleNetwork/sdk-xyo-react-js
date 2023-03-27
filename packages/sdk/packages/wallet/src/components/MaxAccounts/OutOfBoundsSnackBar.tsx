import { Alert, AlertTitle, Snackbar, SnackbarProps } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export interface OutOfBoundsSnackBarProps extends SnackbarProps {
  activeAccountIndex?: number
  desiredMaximumAccounts?: number
  setShowSnackBar?: Dispatch<SetStateAction<boolean>>
  showSnackBar?: boolean
}

export const OutOfBoundsSnackBar: React.FC<OutOfBoundsSnackBarProps> = ({
  activeAccountIndex,
  desiredMaximumAccounts,
  setShowSnackBar,
  showSnackBar,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      autoHideDuration={5000}
      onClose={() => setShowSnackBar?.(false)}
      open={showSnackBar}
    >
      <Alert severity={'error'} onClose={() => setShowSnackBar?.(false)}>
        <AlertTitle>Maximum Accounts Error</AlertTitle>
        Your currently selected account number ({activeAccountIndex !== undefined ? activeAccountIndex + 1 : ''}) cannot be greater than the desired
        Maximum Accounts ({desiredMaximumAccounts}).
      </Alert>
    </Snackbar>
  )
}
