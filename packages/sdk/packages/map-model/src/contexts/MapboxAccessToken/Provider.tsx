import type { PropsWithChildren } from 'react'
import React, { useMemo, useState } from 'react'

import { MapboxAccessTokenContext } from './Context.ts'
import type { MapboxAccessTokenContextState } from './State.ts'

export interface MapboxAccessTokenProviderProps {
  defaultAccessToken?: string
}

export const MapboxAccessTokenProvider: React.FC<PropsWithChildren<MapboxAccessTokenProviderProps>> = ({ defaultAccessToken, ...props }) => {
  const [accessToken, setAccessToken] = useState<string>()

  const value: MapboxAccessTokenContextState = useMemo(() => ({
    accessToken: accessToken ?? defaultAccessToken, provided: true, setAccessToken,
  }), [accessToken, defaultAccessToken, setAccessToken])

  return (
    <MapboxAccessTokenContext
      value={value}
      {...props}
    />
  )
}
