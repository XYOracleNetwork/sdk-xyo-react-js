/* eslint-disable deprecation/deprecation */
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { WrapperError } from '@xyo-network/module'
import { ModuleError } from '@xyo-network/payload-model'
import { useArchivistFromNode } from '@xyo-network/react-archivist'
import { useState } from 'react'

import { NetworkLocationHeatmapQuadkeyAnswerPayload } from '../types'
import { useQuadKeyPayloadsToFeatures } from './useQuadKeyPayloadsToFeatures'

/** @deprecated - use useArchivistGet */
const useFetchPayloads = (hashes?: string[]) => {
  const [archivist] = useArchivistFromNode()

  const [apiError, setApiError] = useState<ModuleError>()
  const [payloads, setPayloads] = useState<NetworkLocationHeatmapQuadkeyAnswerPayload[]>()
  const { features, multipleFeatureSets } = useQuadKeyPayloadsToFeatures(payloads)
  const [notFound, setNotFound] = useState(false)
  const [inFlight, setInFlight] = useState(false)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (archivist && payloads === undefined && hashes?.length && !inFlight) {
        try {
          setInFlight(true)
          const payloads = await archivist.get(hashes)
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
