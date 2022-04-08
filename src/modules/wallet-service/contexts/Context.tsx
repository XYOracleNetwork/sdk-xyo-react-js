import { createContextEx } from '../../context-ex'
import { WalletServiceState } from './State'

export const WalletServiceContext = createContextEx<WalletServiceState>()
