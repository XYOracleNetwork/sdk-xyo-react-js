import type { PropsWithChildren } from 'react'
import React, { useMemo, useState } from 'react'

import type { ListMode } from '../../models/index.ts'
import { ListModeContext } from './Context.ts'
import type { ListModeContextState } from './State.ts'

export interface ListModeProviderProps {
  defaultListMode?: ListMode
}

export const ListModeProvider: React.FC<PropsWithChildren<ListModeProviderProps>> = ({ children, defaultListMode }) => {
  const [listMode, setListMode] = useState(defaultListMode ?? 'default')

  const value: ListModeContextState = useMemo(() => ({
    listMode,
    provided: true,
    setListMode,
  }), [listMode,
    setListMode])

  return (
    <ListModeContext
      value={value}
    >
      {children}
    </ListModeContext>
  )
}
