import { WithChildren } from '@xylabs/react-shared'

import { WalletServiceContext } from './Context.js'
import { defaultState } from './defaultState.js'

export const WalletServiceProvider: React.FC<WithChildren> = ({ children }) => {
  return <WalletServiceContext.Provider value={defaultState()}>{children}</WalletServiceContext.Provider>
}
