import { WithChildren } from '@xylabs/sdk-react'

import { AccountContext } from '../Account/Context'
import { useWallet } from '.'

export const AccountWalletProvider: React.FC<WithChildren> = (props) => {
  const { wallet, activeAccountIndex = 0 } = useWallet()

  return <AccountContext.Provider value={{ account: wallet?.getAccount(activeAccountIndex), provided: true }} {...props} />
}
