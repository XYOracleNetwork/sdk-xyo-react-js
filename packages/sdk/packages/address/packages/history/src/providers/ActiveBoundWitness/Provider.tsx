import { ArchivistInstance } from '@xyo-network/archivist'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { useArchivistFromNode, useArchivistGet } from '@xyo-network/react-archivist'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom-6'

import { ActiveBoundWitnessContext } from '../../contexts'

export interface ActiveBoundWitnessProviderProps extends ContextExProviderProps {
  activeBoundWitnessHash?: string
  archivist?: ArchivistInstance | string
}

export const ActiveBoundWitnessProvider: React.FC<ActiveBoundWitnessProviderProps> = ({
  children,
  activeBoundWitnessHash: activeBoundWitnessHashProp,
  archivist,
}) => {
  const archivistString = typeof archivist == 'string' ? archivist : undefined
  const archivistModule = typeof archivist == 'string' ? undefined : archivist
  const { boundwitness: boundwitnessHashFromParam } = useParams()
  const [activeBoundWitnessHash, setActiveBoundWitnessHash] = useState<string>()
  const [activeBoundWitness, setActiveBoundWitness] = useState<BoundWitness>()
  const [activeArchivist] = useArchivistFromNode(archivistString)
  const hashes = useMemo(() => (activeBoundWitnessHash ? [activeBoundWitnessHash] : undefined), [activeBoundWitnessHash])
  const [payload] = useArchivistGet(archivistModule ?? activeArchivist, hashes)

  useEffect(() => {
    setActiveBoundWitnessHash(activeBoundWitnessHashProp ?? boundwitnessHashFromParam)
  }, [activeBoundWitnessHashProp, boundwitnessHashFromParam])

  useEffect(() => {
    if (activeBoundWitnessHash === undefined) {
      setActiveBoundWitness(undefined)
    } else {
      setActiveBoundWitness(payload?.[0] as BoundWitness)
    }
  }, [payload, activeBoundWitnessHash])

  return (
    <ActiveBoundWitnessContext.Provider
      value={{
        activeBoundWitness,
        activeBoundWitnessHash,
        provided: true,
        setActiveBoundWitnessHash,
      }}
    >
      {children}
    </ActiveBoundWitnessContext.Provider>
  )
}
