import { createContextEx } from '@xyo-network/react-shared'

import { SchemaStatsApiDivinerState } from './State'

/** @deprecated - get stats from querying the module on the node directly */
export const SchemaStatsApiDivinerContext = createContextEx<SchemaStatsApiDivinerState>()
