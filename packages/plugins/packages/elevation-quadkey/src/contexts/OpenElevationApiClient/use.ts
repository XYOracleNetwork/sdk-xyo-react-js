import { useContextEx } from '@xyo-network/react-shared'

import { OpenElevationApiContext } from './Context.ts'

export const useOpenElevationApiClient = () => useContextEx(OpenElevationApiContext, 'OpenElevationApiClient', true)
