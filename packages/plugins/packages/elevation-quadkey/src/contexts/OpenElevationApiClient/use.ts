import { useContextEx } from '@xylabs/react-shared'

import { OpenElevationApiContext } from './Context.ts'

export const useOpenElevationApiClient = () => useContextEx(OpenElevationApiContext, 'OpenElevationApiClient', true)
