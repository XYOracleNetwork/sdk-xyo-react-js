import { FlexCol } from '@xylabs/react-flexbox'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { XyoErrorAlert } from './ErrorAlert'
import { XyoErrorRenderProps } from './Props'

export const XyoErrorRender: React.FC<XyoErrorRenderProps> = ({
  xyoError,
  noErrorDisplay = false,
  customError = null,
  children,
  errorContext,
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

  if (xyoError) {
    return (
      <FlexCol alignItems="stretch" {...props}>
        {noErrorDisplay ? (
          customError
        ) : (
          <FlexCol alignItems="center" {...props}>
            <XyoErrorAlert error={xyoError} errorContext={errorContext} />
          </FlexCol>
        )}
      </FlexCol>
    )
  } else {
    return <>{children}</> ?? null
  }
}
