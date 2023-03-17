import { BoundWitness } from '@xyo-network/boundwitness-model'
import { useArchivistGet } from '@xyo-network/react-archivist'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ActiveBoundWitnessContext } from '../../contexts'

export interface ActiveBoundWitnessProviderProps extends ContextExProviderProps {
  activeBoundWitnessHash?: string
}

export const ActiveBoundWitnessProvider: React.FC<ActiveBoundWitnessProviderProps> = ({
  children,
  activeBoundWitnessHash: activeBoundWitnessHashProp,
}) => {
  const { boundwitness: boundwitnessHashFromParam } = useParams()
  const [activeBoundWitnessHash, setActiveBoundWitnessHash] = useState<string>()
  const [activeBoundWitness, setActiveBoundWitness] = useState<BoundWitness>()
  const hashes = useMemo(() => (activeBoundWitnessHash ? [activeBoundWitnessHash] : undefined), [activeBoundWitnessHash])
  const [payload] = useArchivistGet(hashes)

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
