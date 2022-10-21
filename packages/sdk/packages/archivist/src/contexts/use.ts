import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoArchivistWrapper } from '@xyo-network/archivist'
import { XyoPayload, XyoPayloadFindFilter, XyoPayloads } from '@xyo-network/payload'
import { useContextEx, useDataState } from '@xyo-network/react-shared'
import { useEffect, useState } from 'react'

import { ArchivistContext } from './Context'

type RefreshCallback = () => void

export const useArchivist = (required = false) => {
  return useContextEx(ArchivistContext, 'Archivist', required)
}

const useSharedUseArchivistState = (required: boolean) => {
  const [payloads, setPayloads] = useState<XyoPayloads>()
  const { archivist } = useArchivist(required)
  const [error, setError] = useState<Error>()
  const [refresh, setRefresh] = useState(1)
  const refreshPayloads = () => setRefresh((previous) => previous + 1)

  const [archivistWrapper, setArchivistWrapper] = useState<XyoArchivistWrapper>()

  useEffect(() => {
    if (archivist) {
      setArchivistWrapper(new XyoArchivistWrapper(archivist))
    }
  }, [archivist])

  return { archivistWrapper, error, payloads, refresh, refreshPayloads, setError, setPayloads }
}

export const useArchivistGet = (ids?: string[], required = false): [(XyoPayload | null)[]?, Error?, RefreshCallback?] => {
  const [savedIds] = useDataState(ids)
  const { archivistWrapper, error, payloads, refresh, setError, setPayloads, refreshPayloads } = useSharedUseArchivistState(required)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivistWrapper && savedIds) {
          const result = (await archivistWrapper.get(savedIds ?? [])) ?? []
          if (mounted()) {
            setError(undefined)
            setPayloads(result)
          }
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivistWrapper, savedIds, refresh, setError, setPayloads],
  )
  return [payloads, error, refreshPayloads]
}

export const useArchivistFind = <TFilter extends XyoPayloadFindFilter>(
  filter: TFilter,
  required = false,
): [XyoPayload[]?, Error?, RefreshCallback?] => {
  const [savedFilter] = useDataState(filter)
  const [payloads, setPayloads] = useState<XyoPayload[]>()
  const { archivistWrapper, error, refresh, setError, refreshPayloads } = useSharedUseArchivistState(required)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivistWrapper) {
          const result = await archivistWrapper.find(savedFilter)
          if (mounted()) {
            setError(undefined)
            setPayloads(result)
          }
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivistWrapper, refresh, savedFilter, setError],
  )
  return [payloads, error, refreshPayloads]
}

export const useArchivistInsert = (payloads: XyoPayload[], required = false): [(XyoPayload | null)[]?, Error?] => {
  const [savedPayloads] = useDataState(payloads)
  const {
    archivistWrapper,
    error,
    payloads: resultPayloads,
    refresh,
    setError,
    setPayloads: setResultPayloads,
  } = useSharedUseArchivistState(required)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivistWrapper && savedPayloads) {
          const result = await archivistWrapper.insert(savedPayloads)
          if (mounted()) {
            setError(undefined)
            setResultPayloads(result)
          }
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivistWrapper, refresh, savedPayloads, setError, setResultPayloads],
  )
  return [resultPayloads, error]
}

export const useArchivistAll = (required = false): [(XyoPayload | null)[]?, Error?] => {
  const { archivist } = useArchivist(required)
  const [payloads, setPayloads] = useState<XyoPayloads>()
  const [error, setError] = useState<Error>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        const wrapper = archivist ? new XyoArchivistWrapper(archivist) : undefined
        const result = await wrapper?.all()
        if (mounted()) {
          setError(undefined)
          setPayloads(result)
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivist],
  )
  return [payloads, error]
}

export const useArchivistClear = (required = false): [(XyoPayload | null)[]?, Error?] => {
  const { archivist } = useArchivist(required)
  const [payloads, setPayloads] = useState<XyoPayloads>()
  const [error, setError] = useState<Error>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        const wrapper = archivist ? new XyoArchivistWrapper(archivist) : undefined
        await wrapper?.clear()
        if (mounted()) {
          setError(undefined)
          setPayloads([])
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivist],
  )
  return [payloads, error]
}
