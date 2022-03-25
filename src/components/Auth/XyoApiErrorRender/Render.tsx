import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/sdk-react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { AxiosLoggedError } from '../../../contexts'
import { ApiLogEntry } from '../AuthLogs'
import { AxiosErrorRenderProps } from './Props'
import { ReAuth } from './ReAuth'

export const XyoApiErrorRender: React.FC<AxiosErrorRenderProps> = ({
  apiError,
  apiFailure,
  noErrorDisplay = false,
  noReAuth = false,
  customError = null,
  children,
  ...props
}) => {
  const location = useLocation()
  useEffect(() => {
    // ensure we end up at the same place we are now after logging in
    location.state = {
      from: {
        pathname: window.location.pathname,
      },
    }
  }, [location])

  if (apiError) {
    const loggedError = apiError as AxiosLoggedError
    loggedError.logged = loggedError.logged = new Date().toISOString()

    return (
      <FlexCol alignItems="stretch" {...props}>
        {noErrorDisplay ? (
          { customError }
        ) : (
          <FlexCol alignItems="start" {...props}>
            <Typography variant="h5" color="error" my={1}>
              Error Making Request
            </Typography>
            <ApiLogEntry call={loggedError} />
          </FlexCol>
        )}
      </FlexCol>
    )
  } else if (apiFailure) {
    return (
      <FlexCol alignItems="stretch" {...props}>
        {noErrorDisplay ? (
          { customError }
        ) : (
          <FlexCol alignItems="start" {...props}>
            {apiFailure?.status === 401 && !noReAuth && <ReAuth apiError={apiError} />}
          </FlexCol>
        )}
      </FlexCol>
    )
  } else {
    return (
      <FlexCol alignItems="stretch" {...props}>
        {children}
      </FlexCol>
    )
  }
}
/** @deprecated use XyoApiErrorRender instead */
export const AxiosErrorHandler = XyoApiErrorRender
