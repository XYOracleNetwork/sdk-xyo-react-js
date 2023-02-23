import { useContextEx } from '@xyo-network/react-shared'

import { AuthSetsContext } from './Context'

export const useAuthSets = (required = false) => useContextEx(AuthSetsContext, 'AuthSets', required)
