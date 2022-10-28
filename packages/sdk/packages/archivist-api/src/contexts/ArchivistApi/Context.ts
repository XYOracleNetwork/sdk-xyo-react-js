import { createContextEx } from '@xyo-network/react-shared'

import { ArchivistApiState } from './State'

/** @deprecated if you believe this should not be the case, open a ticket: https://github.com/XYOracleNetwork/sdk-xyo-react-js/issues */
export const ArchivistApiContext = createContextEx<ArchivistApiState>()
