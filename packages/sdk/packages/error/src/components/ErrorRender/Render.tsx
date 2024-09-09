import { FlexCol } from '@xylabs/react-flexbox'
import React, { useEffect } from 'react'

import { ErrorAlert } from './ErrorAlert.tsx'
import type { ErrorRenderProps } from './Props.ts'

export const ErrorRender: React.FC<ErrorRenderProps> = ({
  onCancel,
  error,
  noErrorDisplay = false,
  customError = null,
  children,
  errorContext,
  scope,
  useLocation,
  ...props
}) => {
  const location = useLocation?.()
  useEffect(() => {
    if (location) {
      // ensure we end up at the same place we are now after logging in
      location.state = { from: { pathname: window.location.pathname } }
    }
  }, [location])

  return error
    ? (
        <FlexCol alignItems="stretch" {...props}>
          {noErrorDisplay
            ? customError
            : (
                <FlexCol alignItems="center" {...props}>
                  <ErrorAlert error={error} errorContext={errorContext} onCancel={onCancel} scope={scope} />
                </FlexCol>
              )}
        </FlexCol>
      )
    : <>{children}</>
}
