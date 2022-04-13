import { assertEx } from '@xylabs/sdk-js'
import { WithChildren } from '@xylabs/sdk-react'
import { XyoApiError, XyoApiResponse } from '@xyo-network/sdk-xyo-client-js'
import { useState } from 'react'

import { ArchivistApiProvider, useArchivistApi } from '../../../archivist-api'
import { useRollbar } from '../../../rollbar'
import { XyoApiErrorRender } from '../XyoApiErrorRender'
import { XyoApiThrownErrorBoundary } from './ThrownError'

export const XyoApiFailureBoundary: React.FC<WithChildren> = ({ children }) => {
  const { api } = useArchivistApi()
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
      reportableParent={api}
    >
      <XyoApiThrownErrorBoundary rollbar={rollbar}>{children}</XyoApiThrownErrorBoundary>
    </ArchivistApiProvider>
  ) : (
    <>{children}</>
  )
}
