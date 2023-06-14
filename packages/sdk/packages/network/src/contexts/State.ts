import { NetworkPayload } from '@xyo-network/network'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

export interface NetworkContextState extends ContextExState {
  /** @field The currently selected XYO Network */
  network?: NetworkPayload
  /** @field The list of known available networks */
  networks?: NetworkPayload[]
  /** @field Function to set the selected Network */
  setNetwork?: Dispatch<NetworkPayload>
}
