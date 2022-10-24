import { useContextEx } from '@xyo-network/react-shared'

import { AddressHistoryDivinerContext } from './Context'

export const useAddressHistoryDiviner = () => useContextEx(AddressHistoryDivinerContext, 'AddressHistoryDiviner', false)
