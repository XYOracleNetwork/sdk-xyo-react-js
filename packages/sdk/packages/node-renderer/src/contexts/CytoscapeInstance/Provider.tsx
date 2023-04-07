import type { WithChildren } from '@xylabs/react-shared'
import { Core } from 'cytoscape'
import { useEffect, useState } from 'react'

import { CytoscapeInstanceContext } from './Context'

export interface CytoscapeInstanceProviderProps extends WithChildren {
  defaultInstance?: Core
}

export const CytoscapeInstanceProvider: React.FC<CytoscapeInstanceProviderProps> = ({ children, defaultInstance }) => {
  const [cy, setCy] = useState<Core | undefined>(defaultInstance)
  useEffect(() => {
    setCy(defaultInstance)
  }, [defaultInstance])

  return <CytoscapeInstanceContext.Provider value={{ cy, provided: true, setCy }}>{children}</CytoscapeInstanceContext.Provider>
}
