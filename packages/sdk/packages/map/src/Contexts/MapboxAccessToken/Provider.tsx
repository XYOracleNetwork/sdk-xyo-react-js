import { WithChildren } from '@xylabs/react-shared'
import { useState } from 'react'

import { MapboxAccessTokenContext } from './Context.js'

export interface MapboxAccessTokenProviderProps {
  defaultAccessToken?: string
}

export const MapboxAccessTokenProvider: React.FC<WithChildren<MapboxAccessTokenProviderProps>> = ({ defaultAccessToken, ...props }) => {
  const [accessToken, setAccessToken] = useState<string>()

  return <MapboxAccessTokenContext.Provider value={{ accessToken: accessToken ?? defaultAccessToken, provided: true, setAccessToken }} {...props} />
}
