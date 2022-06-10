import { WithChildren } from '@xylabs/react-shared'
import { useState } from 'react'

import { AuthService, AuthServiceId } from '../State'
import { authServiceList as importedAuthServiceList } from './authServiceList'
import { AuthServiceContext } from './Context'
import { AuthServiceState } from './State'

export const AuthServiceProvider: React.FC<WithChildren<{ authServiceListOverride?: AuthService[] }>> = ({ authServiceListOverride, children }) => {
  const [activeAuthServiceId, setActiveAuthServiceId] = useState<AuthServiceId>(AuthServiceId.None)

  const authServiceList = authServiceListOverride ?? [importedAuthServiceList[0]] // Defaulting to Web3 only

  const value: AuthServiceState = {
    activeAuthServiceId,
    authServiceList,
    setActiveAuthServiceId,
  }
  return <AuthServiceContext.Provider value={value}>{children}</AuthServiceContext.Provider>
}
