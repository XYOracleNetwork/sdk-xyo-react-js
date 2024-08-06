import { compact } from '@xylabs/lodash'
import { WithChildren } from '@xylabs/react-shared'
import React, { useEffect, useState } from 'react'

import { useSchemaStats } from '../../../hooks/index.js'
import { SchemaContext } from '../Context.js'
import { SchemaProviderProps } from './Props.js'

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
