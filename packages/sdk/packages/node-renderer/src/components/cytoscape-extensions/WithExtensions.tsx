import cytoscape from 'cytoscape'
import cola from 'cytoscape-cola'
import coseBilkent from 'cytoscape-cose-bilkent'
import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'

export const WithExtensions: React.FC<PropsWithChildren> = ({ children }) => {
  const initialized = useMemo(() => {
    cytoscape.use(cola)
    cytoscape.use(coseBilkent)
    return true
  }, [])

  return <>{initialized ? children : undefined}</>
}
