import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useEffect, useState } from 'react'

import { ActiveBoundWitnessContext } from './Context'

export interface ActiveBoundWitnessProviderProps extends ContextExProviderProps {
  activeBoundWitness?: XyoBoundWitness
}

export const ActiveBoundWitnessProvider: React.FC<ActiveBoundWitnessProviderProps> = ({ children, activeBoundWitness: activeBoundWitnessProp }) => {
  const [activeBoundWitness, setActiveBoundWitness] = useState(activeBoundWitnessProp)

  useEffect(() => {
    setActiveBoundWitness(activeBoundWitnessProp)
  }, [activeBoundWitnessProp])

  return (
    <ActiveBoundWitnessContext.Provider value={{ activeBoundWitness, provided: true, setActiveBoundWitness }}>
      {children}
    </ActiveBoundWitnessContext.Provider>
  )
}
