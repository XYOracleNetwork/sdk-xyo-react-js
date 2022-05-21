import { WithChildren } from '@xylabs/sdk-react'

import { WalletServiceContext } from './Context'
import { defaultState } from './defaultState'

export const WalletServiceProvider: React.FC<WithChildren> = ({ children }) => {
  return <WalletServiceContext.Provider value={defaultState()}>{children}</WalletServiceContext.Provider>
}
