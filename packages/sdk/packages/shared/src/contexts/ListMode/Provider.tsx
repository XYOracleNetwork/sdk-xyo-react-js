import { WithChildren } from '@xylabs/react-shared'
import React, { useMemo, useState } from 'react'

import { ListMode } from '../../models/index.js'
import { ListModeContext } from './Context.js'

export interface ListModeProviderProps {
  defaultListMode?: ListMode
}

export const ListModeProvider: React.FC<WithChildren<ListModeProviderProps>> = ({ children, defaultListMode }) => {
  const [listMode, setListMode] = useState(defaultListMode ?? 'default')

  const value = useMemo(() => ({ listMode,
    provided: true,
    setListMode }), [listMode,
    setListMode])

  return (
    <ListModeContext.Provider
      value={value}
    >
      {children}
    </ListModeContext.Provider>
  )
}
