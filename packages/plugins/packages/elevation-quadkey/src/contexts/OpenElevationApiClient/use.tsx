import { useContextEx } from '@xyo-network/react-shared'

import { OpenElevationApiContext } from './Context.js'

export const useOpenElevationApiClient = () => useContextEx(OpenElevationApiContext, 'OpenElevationApiClient', true)
