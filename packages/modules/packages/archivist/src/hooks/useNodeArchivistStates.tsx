import { ArchivistWrapper } from '@xyo-network/archivist'
import { Payload } from '@xyo-network/payload-model'
import { useWrapperWallet } from '@xyo-network/react-wallet'
import { useEffect, useState } from 'react'

import { useNodeArchivist } from './useNodeArchivist'

export type RefreshCallback = () => void

export const useNodeArchivistStates = <T extends Payload = Payload>() => {
  const [archivistFromHook] = useNodeArchivist()
  const [payloads, setPayloads] = useState<T[]>()
  const [error, setError] = useState<Error>()
  const [refreshCount, setRefreshCount] = useState(1)
  const refreshPayloads = () => setRefreshCount((previous) => previous + 1)
  const wrapperWallet = useWrapperWallet()

  const [archivist, setArchivist] = useState<ArchivistWrapper>()

  useEffect(() => {
    if (archivistFromHook && wrapperWallet) {
      setArchivist(ArchivistWrapper.wrap(archivistFromHook, wrapperWallet))
    }
  }, [archivistFromHook, wrapperWallet])

  return { archivist, error, payloads, refresh: refreshPayloads, refreshCount, setError, setPayloads }
}
