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
  const resolvedBoundWitnessHash = activeBoundWitnessHash ?? boundwitnessHashFromParam
  const [payload] = useArchivistGet(resolvedBoundWitnessHash ? [resolvedBoundWitnessHash] : undefined)
  useEffect(() => {
    setActiveBoundWitnessHash(activeBoundWitnessHashProp)
  }, [activeBoundWitnessHashProp])

  return (
    <ActiveBoundWitnessContext.Provider
      value={{
        activeBoundWitness: payload?.[0] as XyoBoundWitness,
        activeBoundWitnessHash: resolvedBoundWitnessHash,
        provided: true,
        setActiveBoundWitnessHash,
      }}
    >
      {children}
    </ActiveBoundWitnessContext.Provider>
  )
}
