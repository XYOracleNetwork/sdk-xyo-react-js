import { use } from 'cytoscape'
import cola from 'cytoscape-cola'
import dagre from 'cytoscape-dagre'
import fcose from 'cytoscape-fcose'
import { PropsWithChildren, useEffect, useState } from 'react'

export const WithExtensions: React.FC<PropsWithChildren> = ({ children }) => {
  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    use(cola)
    use(fcose)
    use(dagre)
    setInitialized(true)
  }, [])

  return <>{initialized ? children : undefined}</>
}
