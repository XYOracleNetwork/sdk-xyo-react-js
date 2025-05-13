import { useContextEx } from '@xylabs/react-shared'

import { MapboxAccessTokenContext } from './Context.ts'

export const useMapboxAccessToken = (required = false) => {
  return useContextEx(MapboxAccessTokenContext, 'MapboxAccessToken', required)
}
