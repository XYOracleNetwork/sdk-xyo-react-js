import type { WithChildren } from '@xylabs/react-shared'
import React, { useState } from 'react'

import { RefreshPayloadContext } from './Context.ts'

export interface RefreshPayloadProps {
  onRefresh?: () => void
  refreshPayload?: boolean
}

export const RefreshPayloadProvider: React.FC<WithChildren<RefreshPayloadProps>> = ({
  children, onRefresh, refreshPayload,
}) => {
  const [localRefreshPayload, setRefreshPayload] = useState(refreshPayload)

  return (
    // eslint-disable-next-line @eslint-react/no-unstable-context-value
    <RefreshPayloadContext.Provider value={{
      onRefresh, provided: true, refreshPayload: localRefreshPayload, setRefreshPayload,
    }}
    >
      {children}
    </RefreshPayloadContext.Provider>
  )
}
