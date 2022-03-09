import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'

import { AxiosLoggedError } from '../../../contexts'
import { ApiLogEntry } from '../AuthLogs'
import { ReAuth } from './ReAuth'

export interface AxiosErrorHandlerProps {
  apiError: AxiosError | undefined
  customError?: JSX.Element
  displayError?: boolean
  loginForm?: boolean
}

const AxiosErrorHandler: React.FC<AxiosErrorHandlerProps> = ({
  apiError,
  loginForm = true,
  displayError = true,
  customError = <></>,
  children,
  ...props
}) => {
  if (apiError) {
    const loggedError = apiError as AxiosLoggedError
    loggedError.logged = loggedError.logged = new Date().toISOString()

    return (
      <>
        {displayError ? (
          <FlexCol alignItems="start" {...props}>
            <Typography variant="h5" color="error" my={1}>
              Error Making Request
            </Typography>
            <ApiLogEntry call={loggedError} />
          </FlexCol>
        ) : (
          <>{customError}</>
        )}
        {apiError.response?.status === 401 && (
          <FlexCol my={2} width="100%">
            <ReAuth apiError={apiError} loginForm={loginForm} />
          </FlexCol>
        )}
      </>
    )
  } else {
    return <>{children}</>
  }
}

export { AxiosErrorHandler }
