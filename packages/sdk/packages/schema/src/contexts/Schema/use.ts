import { useContextEx } from '@xyo-network/react-shared'

import { SchemaContext } from './Context.js'
import { SchemaContextState } from './State.js'

export const useSchema = (required = false) => {
  return useContextEx<SchemaContextState>(SchemaContext, 'Schema', required)
}
