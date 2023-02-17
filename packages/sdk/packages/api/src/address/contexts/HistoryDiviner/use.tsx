/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-deprecated */
import { useContextEx } from '@xyo-network/react-shared'

import { AddressHistoryDivinerContext } from './Context'

/** @deprecated - use useAddressHistory in @xyo-network/react-address-history */
export const useAddressHistoryDiviner = (required?: boolean) => useContextEx(AddressHistoryDivinerContext, 'AddressHistoryDiviner', required)
