import { Hash } from '@xylabs/hex'
import { ArchivistInstance } from '@xyo-network/archivist-model'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { useWeakArchivistFromNode, useWeakArchivistGet } from '@xyo-network/react-archivist'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ActiveBoundWitnessContext } from '../../contexts/index.js'

export interface ActiveBoundWitnessProviderProps extends ContextExProviderProps {
  activeBoundWitnessHash?: Hash
  archivist?: WeakRef<ArchivistInstance> | string
}

export const ActiveBoundWitnessProvider: React.FC<ActiveBoundWitnessProviderProps> = ({
  children,
  activeBoundWitnessHash: activeBoundWitnessHashProp,
  archivist,
}) => {
  const archivistString = typeof archivist == 'string' ? archivist : undefined
  const archivistModule = typeof archivist == 'string' ? undefined : archivist
  const { boundwitness: boundwitnessHashFromParam } = useParams()
  const [activeBoundWitnessHash, setActiveBoundWitnessHash] = useState<Hash>()
  const [activeBoundWitness, setActiveBoundWitness] = useState<BoundWitness>()
  const [activeArchivist] = useWeakArchivistFromNode(archivistString)
  const hashes = useMemo(() => (activeBoundWitnessHash ? [activeBoundWitnessHash] : undefined), [activeBoundWitnessHash])
  const [payload] = useWeakArchivistGet(archivistModule ?? activeArchivist, hashes)

  useEffect(() => {
    setActiveBoundWitnessHash(activeBoundWitnessHashProp ?? (boundwitnessHashFromParam as Hash))
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
