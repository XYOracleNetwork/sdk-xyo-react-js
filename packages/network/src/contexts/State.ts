import { XyoNetworkPayload } from '@xyo-network/network'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

export interface NetworkContextState extends ContextExState {
  /** @field The currently selected XYO Network */
  network?: XyoNetworkPayload
  /** @field The list of known available networks */
  networks?: XyoNetworkPayload[]
  /** @field Function to set the selected Network */
  setNetwork?: Dispatch<XyoNetworkPayload>
}
