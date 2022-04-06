import { Dispatch } from 'react'

import { XyoNetworkPreset } from '../../lib'
import { ContextExState } from '../ContextEx'

export interface NetworkContextState extends ContextExState {
  network?: XyoNetworkPreset
  setNetwork?: Dispatch<XyoNetworkPreset>
}
