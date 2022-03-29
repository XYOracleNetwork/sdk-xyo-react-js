import { WalletServiceContext } from './Context'
import { defaultState } from './defaultState'

export const WalletServiceProvider: React.FC = ({ children }) => {
  return <WalletServiceContext.Provider value={defaultState}>{children}</WalletServiceContext.Provider>
}
