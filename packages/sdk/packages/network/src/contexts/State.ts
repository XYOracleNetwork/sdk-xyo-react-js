import type { ContextExState } from '@xylabs/react-shared'
import type { NetworkPayload } from '@xyo-network/network'
import type { Dispatch } from 'react'

export type NetworkContextState = ContextExState<{
  /** @field The currently selected XYO Network */
  network?: NetworkPayload
  /** @field The list of known available networks */
  networks?: NetworkPayload[]
  /** @field Function to set the selected Network */
  setNetwork?: Dispatch<NetworkPayload>
}>
