import { WithChildren } from '@xylabs/react-shared'
import { AccountInstance } from '@xyo-network/account-model'
import { useState } from 'react'

import { AccountContext } from './Context'

export interface AccountMemoryProviderProps {
  defaultAccount?: AccountInstance
}

export const AccountMemoryProvider: React.FC<WithChildren<AccountMemoryProviderProps>> = ({ defaultAccount, ...props }) => {
  const [account, setAccount] = useState<AccountInstance | undefined>(defaultAccount)

  return <AccountContext.Provider value={{ account: account, provided: true, setAccount }} {...props} />
}
