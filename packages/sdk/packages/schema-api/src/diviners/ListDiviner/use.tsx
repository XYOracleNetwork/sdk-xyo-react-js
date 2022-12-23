/* eslint-disable import/no-deprecated */
/* eslint-disable deprecation/deprecation */
import { useContextEx } from '@xyo-network/react-shared'

import { SchemaListApiDivinerContext } from './Context'

/** @deprecated - get list from querying the module on the node directly */
export const useSchemaListApiDiviner = (required?: boolean) => useContextEx(SchemaListApiDivinerContext, 'SchemaListApiDiviner', required)
