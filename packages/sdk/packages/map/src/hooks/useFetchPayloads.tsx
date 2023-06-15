/* eslint-disable deprecation/deprecation */
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ArchivistWrapper } from '@xyo-network/archivist'
import { ModuleError, WrapperError } from '@xyo-network/module'
import { useArchivist } from '@xyo-network/react-archivist'
import { useState } from 'react'

import { NetworkLocationHeatmapQuadkeyAnswerPayload } from '../types'
import { useQuadKeyPayloadsToFeatures } from './useQuadKeyPayloadsToFeatures'

/** @deprecated - use useArchivistGet */
const useFetchPayloads = (hashes?: string[]) => {
  const [archivist] = useArchivist()

  const [apiError, setApiError] = useState<ModuleError>()
  const [payloads, setPayloads] = useState<NetworkLocationHeatmapQuadkeyAnswerPayload[]>()
  const { features, multipleFeatureSets } = useQuadKeyPayloadsToFeatures(payloads)
  const [notFound, setNotFound] = useState(false)
  const [inFlight, setInFlight] = useState(false)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (archivist && payloads === undefined && hashes?.length && !inFlight) {
        const archivistWrapper = ArchivistWrapper.wrap(archivist)
        try {
          setInFlight(true)
          const payloads = await archivistWrapper.get(hashes)
          if (mounted()) {
            if (payloads.length === 0 && apiError === undefined) {
              setNotFound(true)
              setPayloads([])
            } else {
              setPayloads(payloads as NetworkLocationHeatmapQuadkeyAnswerPayload[])
            }
          }
        } catch (e) {
          const error = e as WrapperError
          if (mounted()) {
            setApiError(error.errors.reduce((answer, error) => answer ?? error ?? null, null) ?? undefined)
          }
        }
      }
    },
    [apiError, hashes, inFlight, payloads, archivist],
  )

  return { apiError, features, multipleFeatureSets, notFound }
}

export { useFetchPayloads }
