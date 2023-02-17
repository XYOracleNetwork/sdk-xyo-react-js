import { Alert, AlertProps, AlertTitle } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface AuthenticatedAlertProps extends AlertProps {
  authStateAccount?: string | null
  metaMaskAccount: string | null
}

export const AuthenticatedAlert: React.FC<AuthenticatedAlertProps> = ({ authStateAccount, metaMaskAccount, ...props }) => {
  const [alertVisibility, setAlertVisibility] = useState(false)

  useEffect(() => {
    if (metaMaskAccount && authStateAccount && metaMaskAccount === authStateAccount) {
      setAlertVisibility(true)
    } else {
      setAlertVisibility(false)
    }
  }, [authStateAccount, metaMaskAccount])

  return (
    <>
      {alertVisibility ? (
        <Alert {...props}>
          <AlertTitle>Authorized: {metaMaskAccount}</AlertTitle>
        </Alert>
      ) : null}
    </>
  )
}
