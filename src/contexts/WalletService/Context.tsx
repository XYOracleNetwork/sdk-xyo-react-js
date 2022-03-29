import { createContextEx } from '../ContextEx'
import { WalletServiceState } from './State'

export const WalletServiceContext = createContextEx<WalletServiceState>()
