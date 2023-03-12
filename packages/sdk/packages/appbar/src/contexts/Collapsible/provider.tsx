import { WithChildren } from '@xylabs/react-shared'
import { useEffect, useState } from 'react'

import { CollapsibleContext } from './context'

export interface CollapsibleProviderProps extends WithChildren {
  defaultCollapse?: boolean
  defaultCollapseEnd?: boolean
}

export const CollapsibleProvider: React.FC<CollapsibleProviderProps> = ({ defaultCollapse = false, defaultCollapseEnd = false, children }) => {
  const [collapse, setCollapse] = useState(defaultCollapse)
  const [collapseEnd, setCollapseEnd] = useState(defaultCollapseEnd)

  useEffect(() => {
    setCollapse(defaultCollapse)
  }, [defaultCollapse])

  useEffect(() => {
    setCollapseEnd(defaultCollapseEnd)
  }, [defaultCollapseEnd])

  return (
    <CollapsibleContext.Provider value={{ collapse, collapseEnd, provided: true, setCollapse, setCollapseEnd }}>
      {children}
    </CollapsibleContext.Provider>
  )
}
