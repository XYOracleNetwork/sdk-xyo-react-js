import { WithChildren } from '@xylabs/sdk-react'

import { useWallet } from '../Wallet'
import { AccountContext } from './Context'

export const AccountWalletProvider: React.FC<WithChildren> = (props) => {
  const { wallet, activeAccountIndex = 0 } = useWallet()

  return <AccountContext.Provider value={{ account: wallet?.getAccount(activeAccountIndex), provided: true }} {...props} />
}
