import { ReactNode } from 'react'

import { XyoNetworkConfig } from '../../lib'

export interface NetworkProviderProps {
  defaultNetwork?: XyoNetworkConfig
  children?: ReactNode
}
