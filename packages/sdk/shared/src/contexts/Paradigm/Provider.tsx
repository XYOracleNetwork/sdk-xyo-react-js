import { WithChildren } from '@xylabs/react-shared'

import { Paradigm } from '../../models'
import { ParadigmContext } from './Context'

export type ParadigmProviderProps = Paradigm

export const ParadigmProvider: React.FC<WithChildren<ParadigmProviderProps>> = ({ children, list }) => {
  return (
    <ParadigmContext.Provider
      value={{
        list,
        provided: true,
      }}
    >
      {children}
    </ParadigmContext.Provider>
  )
}
