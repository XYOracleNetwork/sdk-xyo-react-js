import { assertEx } from '@xylabs/sdk-js'
import { XyoApiError, XyoApiResponse } from '@xyo-network/sdk-xyo-client-js'
import { ReactNode, useState } from 'react'

import { ArchivistApiProvider, useArchivistApi } from '../../contexts'
import { XyoApiErrorRender } from '../Auth'
import { XyoApiThrownErrorBoundary } from './ThrownError'

export interface XyoApiUnauthorizedBoundaryProps {
  children: ReactNode
}

export const XyoApiFailureBoundary: React.FC<XyoApiUnauthorizedBoundaryProps> = ({ children }) => {
  const { api } = useArchivistApi()
  const [apiFailure, setApiFailure] = useState<XyoApiResponse>()
  const [apiError, setApiError] = useState<XyoApiError>()

  return apiFailure ? (
    <XyoApiErrorRender apiFailure={apiFailure} apiError={apiError} />
  ) : (
    <ArchivistApiProvider
      apiDomain={assertEx(api?.config.apiDomain)}
      onFailure={(response) => setApiFailure(response)}
      onError={(error) => setApiError(error)}
      reportableParent={api}
    >
      <XyoApiThrownErrorBoundary>{children}</XyoApiThrownErrorBoundary>
    </ArchivistApiProvider>
  )
}
