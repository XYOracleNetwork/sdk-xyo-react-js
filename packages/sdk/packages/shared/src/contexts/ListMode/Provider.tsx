import { WithChildren } from '@xylabs/react-shared'
import { useState } from 'react'

import { ListMode } from '../../models/index.js'
import { ListModeContext } from './Context.js'

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
