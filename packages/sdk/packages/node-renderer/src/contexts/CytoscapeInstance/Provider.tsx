import type { WithChildren } from '@xylabs/react-shared'
import { Core } from 'cytoscape'
import React, { useEffect, useState } from 'react'

import { CytoscapeInstanceContext } from './Context.js'

export interface CytoscapeInstanceProviderProps extends WithChildren {
  defaultInstance?: WeakRef<Core>
}

export const CytoscapeInstanceProvider: React.FC<CytoscapeInstanceProviderProps> = ({ children, defaultInstance }) => {
  const [cy, setCy] = useState<WeakRef<Core> | undefined>(defaultInstance)
  useEffect(() => {
    setCy(defaultInstance)
  }, [defaultInstance])

  // eslint-disable-next-line @eslint-react/no-unstable-context-value
  return <CytoscapeInstanceContext.Provider value={{ cy, provided: true, setCy }}>{children}</CytoscapeInstanceContext.Provider>
}
