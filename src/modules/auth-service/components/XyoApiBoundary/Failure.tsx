import { assertEx } from '@xylabs/sdk-js'
import { WithChildren } from '@xylabs/sdk-react'
import { XyoApiError, XyoApiResponse } from '@xyo-network/sdk-xyo-client-js'
import { useState } from 'react'

import { ArchivistApiProvider, useArchivistApi } from '../../../archivist-api'
import { useRollbar } from '../../../error-reporter'
import { XyoApiErrorRender } from '../XyoApiErrorRender'
import { XyoApiThrownErrorBoundary } from './ThrownErrorBoundary'

export const XyoApiFailureBoundary: React.FC<WithChildren> = ({ children }) => {
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
      <XyoApiThrownErrorBoundary rollbar={rollbar}>{children}</XyoApiThrownErrorBoundary>
    </ArchivistApiProvider>
  ) : (
    <>{children}</>
  )
}
