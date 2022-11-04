import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { ContextExProviderProps, useDataState } from '@xyo-network/react-shared'

import { ActiveBoundWitnessContext } from './Context'

export interface ActiveBoundWitnessProviderProps extends ContextExProviderProps {
  activeBoundWitness?: XyoBoundWitness
}

export const ActiveBoundWitnessProvider: React.FC<ActiveBoundWitnessProviderProps> = ({ children, activeBoundWitness: activeBoundWitnessProp }) => {
  const [activeBoundWitness, setActiveBoundWitness] = useDataState(activeBoundWitnessProp)
  setActiveBoundWitness(activeBoundWitnessProp)

  return (
    <ActiveBoundWitnessContext.Provider value={{ activeBoundWitness, provided: true, setActiveBoundWitness }}>
      {children}
    </ActiveBoundWitnessContext.Provider>
  )
}
