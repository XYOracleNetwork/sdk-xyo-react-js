import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { useArchivistGet } from '@xyo-network/react-archivist'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ActiveBoundWitnessContext } from './Context'

export interface ActiveBoundWitnessProviderProps extends ContextExProviderProps {
  activeBoundWitnessHash?: string
}

export const ActiveBoundWitnessProvider: React.FC<ActiveBoundWitnessProviderProps> = ({
  children,
  activeBoundWitnessHash: activeBoundWitnessHashProp,
}) => {
  const { boundwitness: boundwitnessHashFromParam } = useParams()
  const [activeBoundWitnessHash, setActiveBoundWitnessHash] = useState<string>()
  const [activeBoundWitness, setActiveBoundWitness] = useState<XyoBoundWitness>()
  const [payload] = useArchivistGet(activeBoundWitnessHash ? [activeBoundWitnessHash] : undefined)

  useEffect(() => {
    setActiveBoundWitnessHash(activeBoundWitnessHashProp ?? boundwitnessHashFromParam)
  }, [activeBoundWitnessHashProp, boundwitnessHashFromParam])

  useEffect(() => {
    if (activeBoundWitnessHash === undefined) {
      setActiveBoundWitness(undefined)
    } else {
      setActiveBoundWitness(payload?.[0] as XyoBoundWitness)
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
