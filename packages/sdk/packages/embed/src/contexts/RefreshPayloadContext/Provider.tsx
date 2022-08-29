import { WithChildren } from '@xylabs/react-shared'
import { useState } from 'react'

import { RefreshPayloadContext } from './Context'

export interface RefreshPayloadProps {
  refreshPayload?: boolean
  onRefresh?: () => void
}

export const RefreshPayloadProvider: React.FC<WithChildren<RefreshPayloadProps>> = ({ children, onRefresh, refreshPayload }) => {
  const [localRefreshPayload, setRefreshPayload] = useState(refreshPayload)

  return (
    <RefreshPayloadContext.Provider value={{ onRefresh, provided: true, refreshPayload: localRefreshPayload, setRefreshPayload }}>
      {children}
    </RefreshPayloadContext.Provider>
  )
}
