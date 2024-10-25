import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'

import { CollapsibleContext } from './context.ts'

export interface CollapsibleProviderProps extends PropsWithChildren {
  defaultCollapse?: boolean
  defaultCollapseEnd?: boolean
}

export const CollapsibleProvider: React.FC<CollapsibleProviderProps> = ({
  defaultCollapse = false, defaultCollapseEnd = false, children,
}) => {
  const [collapse, setCollapse] = useState(() => defaultCollapse)
  const [collapseEnd, setCollapseEnd] = useState(() => defaultCollapseEnd)

  return (
    // eslint-disable-next-line @eslint-react/no-unstable-context-value
    <CollapsibleContext.Provider value={{
      collapse, collapseEnd, provided: true, setCollapse, setCollapseEnd,
    }}
    >
      {children}
    </CollapsibleContext.Provider>
  )
}
