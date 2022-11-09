import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { useArchivistGet } from '@xyo-network/react-archivist'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useEffect, useState } from 'react'

import { ActiveBoundWitnessContext } from './Context'

export interface ActiveBoundWitnessProviderProps extends ContextExProviderProps {
  activeBoundWitnessHash?: string
}

export const ActiveBoundWitnessProvider: React.FC<ActiveBoundWitnessProviderProps> = ({
  children,
  activeBoundWitnessHash: activeBoundWitnessHashProp,
}) => {
  const [activeBoundWitnessHash, setActiveBoundWitnessHash] = useState<string>()
  const [payload] = useArchivistGet(activeBoundWitnessHash ? [activeBoundWitnessHash] : undefined)

  useEffect(() => {
    setActiveBoundWitnessHash(activeBoundWitnessHashProp)
  }, [activeBoundWitnessHashProp])

  return (
    <ActiveBoundWitnessContext.Provider
      value={{ activeBoundWitness: payload?.[0] as XyoBoundWitness, activeBoundWitnessHash, provided: true, setActiveBoundWitnessHash }}
    >
      {children}
    </ActiveBoundWitnessContext.Provider>
  )
}
