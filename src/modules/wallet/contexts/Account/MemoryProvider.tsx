import { WithChildren } from '@xylabs/sdk-react'
import { XyoAccount } from '@xyo-network/sdk-xyo-client-js'
import { useState } from 'react'

import { AccountContext } from './Context'

export interface AccountMemoryProviderProps {
  defaultAccount?: XyoAccount
}

export const AccountMemoryProvider: React.FC<WithChildren<AccountMemoryProviderProps>> = ({ defaultAccount, ...props }) => {
  const [account, setAccount] = useState<XyoAccount | undefined>(defaultAccount)

  return <AccountContext.Provider value={{ account: account, provided: true, setAccount }} {...props} />
}
