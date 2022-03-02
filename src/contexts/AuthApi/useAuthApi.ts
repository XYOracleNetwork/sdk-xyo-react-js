import { assertEx } from '@xylabs/sdk-js'
import { XyoAuthApi, XyoMetaMaskConnector } from '@xyo-network/sdk-xyo-client-js'
import { useContext } from 'react'

import { AuthApiContext } from './Context'

/**
 * @deprecated Auth is now in the archivist context
 */
const useAuthApi = () => {
  const context = useContext(AuthApiContext)
  assertEx(context.AuthApi, 'Auth Api not initialized')
  //we do the cast to make the api non-optional
  return context as { AuthApi: XyoAuthApi; MetaMaskService: XyoMetaMaskConnector }
}

// eslint-disable-next-line deprecation/deprecation
export { useAuthApi }
