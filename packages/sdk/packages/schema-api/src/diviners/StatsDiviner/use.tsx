/* eslint-disable import/no-deprecated */
/* eslint-disable deprecation/deprecation */
import { useContextEx } from '@xyo-network/react-shared'

import { SchemaStatsApiDivinerContext } from './Context'

/** @deprecated - get stats from querying the module on the node directly */
export const useSchemaStatsApiDiviner = (required?: boolean) => useContextEx(SchemaStatsApiDivinerContext, 'SchemaStatsApiDiviner', required)
