import type { PropsWithChildren } from 'react'
import React, { useMemo, useState } from 'react'

import type { ListMode } from '../../models/index.ts'
import { ListModeContext } from './Context.ts'

export interface ListModeProviderProps {
  defaultListMode?: ListMode
}

export const ListModeProvider: React.FC<PropsWithChildren<ListModeProviderProps>> = ({ children, defaultListMode }) => {
  const [listMode, setListMode] = useState(defaultListMode ?? 'default')

  const value = useMemo(() => ({
    listMode,
    provided: true,
    setListMode,
  }), [listMode,
    setListMode])

  return (
    <ListModeContext.Provider
      value={value}
    >
      {children}
    </ListModeContext.Provider>
  )
}
