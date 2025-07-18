import type { Core } from 'cytoscape'
import type { PropsWithChildren } from 'react'
import React, { useMemo, useState } from 'react'

import { CytoscapeInstanceContext } from './Context.ts'
import type { CytoscapeInstanceState } from './State.ts'

export interface CytoscapeInstanceProviderProps extends PropsWithChildren {
  defaultInstance?: WeakRef<Core>
}

export const CytoscapeInstanceProvider: React.FC<CytoscapeInstanceProviderProps> = ({ children, defaultInstance }) => {
  const [cy, setCy] = useState<WeakRef<Core> | undefined>(() => defaultInstance)

  const value: CytoscapeInstanceState = useMemo(() => ({
    cy, provided: true, setCy,
  }), [cy, setCy])

  return (
    <CytoscapeInstanceContext value={value}>
      {children}
    </CytoscapeInstanceContext>
  )
}
