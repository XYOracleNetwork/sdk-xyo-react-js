import { WithChildren } from '@xylabs/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useState } from 'react'

import { AccountContext } from './Context'

export interface AccountMemoryProviderProps {
  defaultAccount?: WalletInstance
}

export const AccountMemoryProvider: React.FC<WithChildren<AccountMemoryProviderProps>> = ({ defaultAccount, ...props }) => {
  const [account, setAccount] = useState<WalletInstance | undefined>(defaultAccount)

  return <AccountContext.Provider value={{ account: account, provided: true, setAccount }} {...props} />
}
