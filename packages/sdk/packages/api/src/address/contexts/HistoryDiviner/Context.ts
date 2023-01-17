import { createContextEx } from '@xyo-network/react-shared'

import { AddressHistoryDivinerState } from './State'

/** @deprecated - use useAddressHistory in @xyo-network/react-address-history */
export const AddressHistoryDivinerContext = createContextEx<AddressHistoryDivinerState>()
