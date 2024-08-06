import { WithChildren } from '@xylabs/react-shared'
import React, { useState } from 'react'

import { MapboxAccessTokenContext } from './Context.ts'

export interface MapboxAccessTokenProviderProps {
  defaultAccessToken?: string
}

export const MapboxAccessTokenProvider: React.FC<WithChildren<MapboxAccessTokenProviderProps>> = ({ defaultAccessToken, ...props }) => {
  const [accessToken, setAccessToken] = useState<string>()

  // eslint-disable-next-line @eslint-react/no-unstable-context-value
  return <MapboxAccessTokenContext.Provider value={{ accessToken: accessToken ?? defaultAccessToken, provided: true, setAccessToken }} {...props} />
}
