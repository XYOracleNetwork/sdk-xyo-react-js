import { useContextEx } from '@xyo-network/react-shared'

import { AddressHistoryDivinerContext } from './Context'

export const useAddressHistoryDiviner = (required?: boolean) => useContextEx(AddressHistoryDivinerContext, 'AddressHistoryDiviner', required)
