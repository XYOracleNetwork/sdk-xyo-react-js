import { WithChildren } from '@xylabs/sdk-react'
import { XyoAccount } from '@xyo-network/sdk-xyo-client-js'
import { useState } from 'react'

import { AccountContext } from './Context'

export interface AccountProviderProps {
  defaultAccount?: XyoAccount
}

export const AccountProvider: React.FC<WithChildren<AccountProviderProps>> = ({ defaultAccount, ...props }) => {
  const [account, setAccount] = useState<XyoAccount>()

  return <AccountContext.Provider value={{ account: account ?? defaultAccount, provided: true, setAccount }} {...props} />
}
