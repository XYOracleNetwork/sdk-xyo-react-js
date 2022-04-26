import { Dispatch } from 'react'

import { ContextExState } from '../../context-ex'
import { XyoNetworkConfig } from '../lib'

export interface NetworkContextState extends ContextExState {
  /** @field The currently selected XYO Network */
  network?: XyoNetworkConfig
  /** @field The list of known available networks */
  networks?: XyoNetworkConfig[]
  /** @field Function to set the selected Network */
  setNetwork?: Dispatch<XyoNetworkConfig>
}
