import cytoscape from 'cytoscape'
import cola from 'cytoscape-cola'
import coseBilkent from 'cytoscape-cose-bilkent'
import dagre from 'cytoscape-dagre'
import euler from 'cytoscape-euler'
import { PropsWithChildren, useEffect, useState } from 'react'

export const WithExtensions: React.FC<PropsWithChildren> = ({ children }) => {
  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    cytoscape.use(cola)
    cytoscape.use(dagre)
    cytoscape.use(coseBilkent)
    cytoscape.use(euler)
    setInitialized(true)
  }, [])

  return <>{initialized ? children : undefined}</>
}
