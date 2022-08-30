import { WithChildren } from '@xylabs/react-shared'
import { useState } from 'react'

import { ListMode } from '../../models'
import { ListModeContext } from './Context'

export interface ListModeProviderProps {
  defaultListMode?: ListMode
}

export const ListModeProvider: React.FC<WithChildren<ListModeProviderProps>> = ({ children, defaultListMode }) => {
  const [listMode, setListMode] = useState(defaultListMode ?? 'default')

  return (
    <ListModeContext.Provider
      value={{
        listMode,
        provided: true,
        setListMode,
      }}
    >
      {children}
    </ListModeContext.Provider>
  )
}
