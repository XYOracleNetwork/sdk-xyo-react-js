/* eslint-disable import/no-deprecated */
import { createContextEx } from '@xyo-network/react-shared'

import { SchemaListApiDivinerState } from './State'

/** @deprecated - get stats from querying the module on the node directly */
// eslint-disable-next-line deprecation/deprecation
export const SchemaListApiDivinerContext = createContextEx<SchemaListApiDivinerState>()
