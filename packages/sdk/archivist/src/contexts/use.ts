import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoPayloadFindQuery } from '@xyo-network/archivist'
import { XyoPayload } from '@xyo-network/payload'
import { useContextEx } from '@xyo-network/react-shared'
import { useState } from 'react'

import { ArchivistContext } from './Context'

export const useArchivist = (required = false) => {
  return useContextEx(ArchivistContext, 'Archivist', required)
}

export const useArchivistGet = (ids?: string[], required = false) => {
  const { archivist } = useArchivist(required)
  const [payloads, setPayloads] = useState<(XyoPayload | null)[]>()
  const [error, setError] = useState<Error>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        const result = archivist ? await archivist.get(ids ?? []) : undefined
        if (mounted()) {
          setError(undefined)
          setPayloads(result)
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivist, ids]
  )
  return [payloads, error]
}

export const useArchivistFind = <TQuery extends XyoPayloadFindQuery>(query?: TQuery, required = false) => {
  const { archivist } = useArchivist(required)
  const [payloads, setPayloads] = useState<(XyoPayload | null)[]>()
  const [error, setError] = useState<Error>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        const result = archivist && query ? await archivist.find(query) : undefined
        if (mounted()) {
          setError(undefined)
          setPayloads(result)
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivist, query]
  )
  return [payloads, error]
}
