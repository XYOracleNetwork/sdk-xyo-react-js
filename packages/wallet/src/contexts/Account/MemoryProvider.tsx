import { WithChildren } from '@xylabs/react-shared'
import { XyoAccount } from '@xyo-network/core'
import { useState } from 'react'

import { AccountContext } from './Context'

export interface AccountMemoryProviderProps {
  defaultAccount?: XyoAccount
}

export const AccountMemoryProvider: React.FC<WithChildren<AccountMemoryProviderProps>> = ({ defaultAccount, ...props }) => {
  const [account, setAccount] = useState<XyoAccount | undefined>(defaultAccount)

  return <AccountContext.Provider value={{ account: account, provided: true, setAccount }} {...props} />
}
