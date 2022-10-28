import { useContextEx } from '@xyo-network/react-shared'

import { SchemaListApiDivinerContext } from './Context'

export const useSchemaListApiDiviner = (required?: boolean) => useContextEx(SchemaListApiDivinerContext, 'SchemaListApiDiviner', required)
