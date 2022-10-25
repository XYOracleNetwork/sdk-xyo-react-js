import { useContextEx } from '@xyo-network/react-shared'

import { SchemaStatsApiDivinerContext } from './Context'

export const useSchemaStatsApiDiviner = (required?: boolean) => useContextEx(SchemaStatsApiDivinerContext, 'SchemaStatsApiDiviner', required)
