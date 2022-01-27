import { XyoAuthApi, XyoMetaMaskConnector } from '@xyo-network/sdk-xyo-client-js'
import { createContext } from 'react'

const AuthApiContext = createContext<{ AuthApi?: XyoAuthApi; MetaMaskService?: XyoMetaMaskConnector }>({})

export { AuthApiContext }
