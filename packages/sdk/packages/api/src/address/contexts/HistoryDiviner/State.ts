import { XyoRemoteAddressHistoryDiviner } from '@xyo-network/api'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

/** @deprecated - use useAddressHistory in @xyo-network/react-address-history */
export interface AddressHistoryDivinerState extends ContextExState {
  diviner?: XyoRemoteAddressHistoryDiviner
  setDiviner?: Dispatch<SetStateAction<XyoRemoteAddressHistoryDiviner | undefined>>
}
