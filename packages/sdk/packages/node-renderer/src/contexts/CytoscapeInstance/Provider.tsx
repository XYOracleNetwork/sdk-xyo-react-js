import type { WithChildren } from '@xylabs/react-shared'
import type { Core } from 'cytoscape'
import React, { useMemo, useState } from 'react'

import { CytoscapeInstanceContext } from './Context.ts'

export interface CytoscapeInstanceProviderProps extends WithChildren {
  defaultInstance?: WeakRef<Core>
}

export const CytoscapeInstanceProvider: React.FC<CytoscapeInstanceProviderProps> = ({ children, defaultInstance }) => {
  const [cy, setCy] = useState<WeakRef<Core> | undefined>(() => defaultInstance)

  const value = useMemo(() => ({
    cy, provided: true, setCy,
  }), [cy, setCy])

  return (
    <CytoscapeInstanceContext.Provider value={value}>
      {children}
    </CytoscapeInstanceContext.Provider>
  )
}
