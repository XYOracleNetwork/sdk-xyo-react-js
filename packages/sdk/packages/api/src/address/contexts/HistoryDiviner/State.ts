import { XyoRemoteAddressHistoryDiviner } from '@xyo-network/api'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface AddressHistoryDivinerState extends ContextExState {
  diviner?: XyoRemoteAddressHistoryDiviner
  setDiviner?: Dispatch<SetStateAction<XyoRemoteAddressHistoryDiviner | undefined>>
}
