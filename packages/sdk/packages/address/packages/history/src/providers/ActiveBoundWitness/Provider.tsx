import type { Hash } from '@xylabs/hex'
import { useResetState } from '@xylabs/react-hooks'
import type { ContextExProviderProps } from '@xylabs/react-shared'
import type { ArchivistInstance } from '@xyo-network/archivist-model'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { useWeakArchivistFromNode, useWeakArchivistGet } from '@xyo-network/react-archivist'
import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { ActiveBoundWitnessContext } from '../../contexts/index.ts'

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
  const [activeArchivist] = useWeakArchivistFromNode(archivistString)
  const [activeBoundWitnessHash, setActiveBoundWitnessHash] = useResetState<Hash | undefined>(activeBoundWitnessHashProp ?? (boundwitnessHashFromParam as Hash))

  const hashes = useMemo(() => (activeBoundWitnessHash ? [activeBoundWitnessHash] : undefined), [activeBoundWitnessHash])
  const [payload] = useWeakArchivistGet(archivistModule ?? activeArchivist, hashes)
  const activeBoundWitness: BoundWitness | undefined = payload?.at(0) as BoundWitness

  return (
    <ActiveBoundWitnessContext
      // eslint-disable-next-line @eslint-react/no-unstable-context-value
      value={{
        activeBoundWitness,
        activeBoundWitnessHash,
        provided: true,
        setActiveBoundWitnessHash,
      }}
    >
      {children}
    </ActiveBoundWitnessContext>
  )
}
