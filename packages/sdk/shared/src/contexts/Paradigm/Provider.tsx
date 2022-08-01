import { WithChildren } from '@xylabs/react-shared'

import { Paradigm } from '../../models'
import { ParadigmContext } from './Context'

export interface ParadigmProviderProps {
  paradigm: Paradigm
}

export const ParadigmProvider: React.FC<WithChildren<ParadigmProviderProps>> = ({ children, paradigm }) => {
  return (
    <ParadigmContext.Provider
      value={{
        paradigm,
        provided: true,
      }}
    >
      {children}
    </ParadigmContext.Provider>
  )
}
