import { use } from 'cytoscape'
import cola from 'cytoscape-cola'
import coseBilkent from 'cytoscape-cose-bilkent'
import dagre from 'cytoscape-dagre'
import euler from 'cytoscape-euler'
import fcose from 'cytoscape-fcose'
import { PropsWithChildren, useEffect, useState } from 'react'

export const WithExtensions: React.FC<PropsWithChildren> = ({ children }) => {
  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    use(cola)
    use(fcose)
    use(dagre)
    use(coseBilkent)
    use(euler)
    setInitialized(true)
  }, [])

  return <>{initialized ? children : undefined}</>
}
