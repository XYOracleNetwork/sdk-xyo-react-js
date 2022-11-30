import { useContextEx } from '@xyo-network/react-shared'

import { ApiContext } from './Context'

export const useApi = (required = false) => {
  return useContextEx(ApiContext, 'ArchivistApi', required)
}

/** @deprecated use useApi instead */
export const useArchivistApi = useApi
