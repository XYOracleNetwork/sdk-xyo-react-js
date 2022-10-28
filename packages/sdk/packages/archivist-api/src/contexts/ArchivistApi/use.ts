/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-deprecated */
import { useContextEx } from '@xyo-network/react-shared'

import { ArchivistApiContext } from './Context'

/** @deprecated if you believe this should not be the case, open a ticket: https://github.com/XYOracleNetwork/sdk-xyo-react-js/issues */
export const useArchivistApi = (required = false) => {
  return useContextEx(ArchivistApiContext, 'ArchivistApi', required)
}
