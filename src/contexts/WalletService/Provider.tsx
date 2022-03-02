import { WalletServiceContext } from './Context'
import { WalletServiceDefaultState } from './DefaultState'

export const WalletServiceProvider: React.FC = ({ children }) => {
  return <WalletServiceContext.Provider value={WalletServiceDefaultState}>{children}</WalletServiceContext.Provider>
}
