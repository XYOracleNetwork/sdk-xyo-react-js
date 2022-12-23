import { WithChildren } from '@xylabs/react-shared'
import { SchemaContext, useSchemaList } from '@xyo-network/react-schema'
import { useEffect, useState } from 'react'

import { SchemaProviderProps } from './Props'

export const SchemaMemoryProvider: React.FC<WithChildren<SchemaProviderProps>> = ({ defaultSchema, knownSchemaList = [], ...props }) => {
  const [schema, setSchema] = useState(defaultSchema)
  const [schemaList, setSchemaList] = useState<string[] | undefined>(knownSchemaList)
  const [fetchedSchemaList] = useSchemaList()

  useEffect(() => {
    if (fetchedSchemaList) {
      setSchemaList(fetchedSchemaList.map(({ name }) => name))
    }
  }, [fetchedSchemaList])

  return <SchemaContext.Provider value={{ provided: true, schema, schemaList: knownSchemaList ?? schemaList, setSchema, setSchemaList }} {...props} />
}
