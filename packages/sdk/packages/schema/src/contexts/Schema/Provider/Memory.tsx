import { compact } from '@xylabs/lodash'
import { WithChildren } from '@xylabs/react-shared'
import { useEffect, useState } from 'react'

import { useSchemaStats } from '../../../hooks'
import { SchemaContext } from '../Context'
import { SchemaProviderProps } from './Props'

export const SchemaMemoryProvider: React.FC<WithChildren<SchemaProviderProps>> = ({ defaultSchema, knownSchemaList = [], ...props }) => {
  const [schema, setSchema] = useState(defaultSchema)
  const [schemaList, setSchemaList] = useState<string[] | undefined>(knownSchemaList)
  const [fetchedSchemaStats] = useSchemaStats()

  useEffect(() => {
    if (fetchedSchemaStats) {
      const schemaList = compact(fetchedSchemaStats.map(({ name }) => name))
      setSchemaList(schemaList)
    }
  }, [fetchedSchemaStats])

  return <SchemaContext.Provider value={{ provided: true, schema, schemaList: knownSchemaList ?? schemaList, setSchema, setSchemaList }} {...props} />
}
