import { use } from 'cytoscape'
import cola from 'cytoscape-cola'
import popper from 'cytoscape-popper'
import { PropsWithChildren, useEffect, useState } from 'react'

export const WithExtensions: React.FC<PropsWithChildren> = ({ children }) => {
  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    use(cola)
    use(popper)
    setInitialized(true)
  }, [])

  return <>{initialized ? children : undefined}</>
}
