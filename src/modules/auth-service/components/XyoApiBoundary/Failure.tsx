import { assertEx } from '@xylabs/sdk-js'
import { BasePageProps, WithChildren } from '@xylabs/sdk-react'
import { XyoApiError, XyoApiResponse } from '@xyo-network/api'
import { useState } from 'react'

import { ArchivistApiProvider, useArchivistApi } from '../../../archivist-api'
import { useRollbar } from '../../../error-reporter'
import { XyoApiErrorRender } from '../XyoApiErrorRender'
import { XyoApiThrownErrorBoundary } from './ThrownErrorBoundary'

export interface XyoApiFailureBoundaryProps {
  basePageProps: BasePageProps
}

export const XyoApiFailureBoundary: React.FC<WithChildren<XyoApiFailureBoundaryProps>> = ({ basePageProps, children }) => {
  const { api, currentToken } = useArchivistApi()
  const { rollbar } = useRollbar()
  const [apiFailure, setApiFailure] = useState<XyoApiResponse>()
  const [apiError, setApiError] = useState<XyoApiError>()

  return apiFailure ? (
    <XyoApiErrorRender apiFailure={apiFailure} apiError={apiError} />
  ) : api ? (
    <ArchivistApiProvider
      apiDomain={assertEx(api?.config.apiDomain)}
      onFailure={(response) => setApiFailure(response)}
      onError={(error) => setApiError(error)}
      jwtToken={currentToken}
      reportableParent={api}
    >
      <XyoApiThrownErrorBoundary basePageProps={basePageProps} rollbar={rollbar}>
        {children}
      </XyoApiThrownErrorBoundary>
    </ArchivistApiProvider>
  ) : (
    <>{children}</>
  )
}
