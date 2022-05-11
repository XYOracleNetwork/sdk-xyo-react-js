import { useAsyncEffect, WithChildren } from '@xylabs/sdk-react'
import { Dispatch, useState } from 'react'

import { SchemaContext } from '../Context'
import { useSchemaList } from '../Hooks'
import { SchemaProviderProps } from './Props'

export const SchemaMemoryProvider: React.FC<WithChildren<SchemaProviderProps>> = ({ defaultSchema, knownSchemaList = [], ...props }) => {
  const [schema, setSchema] = useState(defaultSchema)
  const [schemaList, setSchemaList] = useSchemaList(knownSchemaList)

  return <SchemaContext.Provider value={{ provided: true, schema, schemaList, setSchema, setSchemaList }} {...props} />
}
