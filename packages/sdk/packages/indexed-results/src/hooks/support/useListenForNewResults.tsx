import { ArchivistInstance, ArchivistModuleEventData } from '@xyo-network/archivist-model'
import { EventListener } from '@xyo-network/module-events'
import { Payload } from '@xyo-network/payload-model'
import { useEffect, useState } from 'react'

export const useListenForNewResults = (archivist?: ArchivistInstance, listenForNewResults?: boolean) => {
  const [newResults, setNewResults] = useState<Payload[]>()

  useEffect(() => {
    const listener: EventListener<ArchivistModuleEventData['inserted']> = ({ payloads }) => {
      setNewResults(payloads)
    }
    if (archivist && listenForNewResults) {
      archivist.on('inserted', listener)
    }

    return () => {
      archivist?.off('inserted', listener)
    }
  }, [archivist, listenForNewResults])

  return newResults
}
