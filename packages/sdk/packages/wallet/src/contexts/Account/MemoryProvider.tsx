import { WithChildren } from '@xylabs/react-shared'
import { Account } from '@xyo-network/account'
import { useState } from 'react'

import { AccountContext } from './Context'

export interface AccountMemoryProviderProps {
  defaultAccount?: Account
}

export const AccountMemoryProvider: React.FC<WithChildren<AccountMemoryProviderProps>> = ({ defaultAccount, ...props }) => {
  const [account, setAccount] = useState<Account | undefined>(defaultAccount)

  return <AccountContext.Provider value={{ account: account, provided: true, setAccount }} {...props} />
}
