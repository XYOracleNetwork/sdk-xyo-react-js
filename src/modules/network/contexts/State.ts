import { XyoNetworkPayload } from '@xyo-network/network'
import { Dispatch } from 'react'

import { ContextExState } from '../../context-ex'

export interface NetworkContextState extends ContextExState {
  /** @field The currently selected XYO Network */
  network?: XyoNetworkPayload
  /** @field The list of known available networks */
  networks?: XyoNetworkPayload[]
  /** @field Function to set the selected Network */
  setNetwork?: Dispatch<XyoNetworkPayload>
}
