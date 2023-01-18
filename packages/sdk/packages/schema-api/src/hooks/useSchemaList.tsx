import { useAsyncEffect } from '@xylabs/react-shared'
import { useApi, useArchive } from '@xyo-network/react-api'
import { Dispatch, useState } from 'react'

/** @deprecated - use module query version in @xyo-network/react-schema */
export const useSchemaList = (knownSchemaList?: string[]): [string[] | undefined, Dispatch<string[]>] => {
  const { api } = useApi(false)
  const { archive = 'temp' } = useArchive(false)
  const [schemaList, setSchemaList] = useState<string[] | undefined>(knownSchemaList)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (api && archive) {
        const list = await api?.archive(archive).payload.schema.get()
        if (mounted()) {
          setSchemaList(list)
        }
      }
    },
    [api, archive],
  )

  return [schemaList, setSchemaList]
}
