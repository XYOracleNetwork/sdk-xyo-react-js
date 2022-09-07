import { useContextEx } from '@xyo-network/react-shared'

import { AuthSetsContext } from './Context'

export const useAuthSets = () => useContextEx(AuthSetsContext, 'AuthSets', true)
