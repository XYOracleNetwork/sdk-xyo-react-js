import { use } from 'cytoscape'
import cola from 'cytoscape-cola'
import { useEffect, useState } from 'react'

type WithChildren<T = unknown> = Omit<T, 'children'> & {
  children?: ReactElement | undefined
}

export const WithCola: React.FC<WithChildren> = ({ children }) => {
  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    use(cola)
    setInitialized(true)
  }, [])

  return <>{initialized ? children : undefined}</>
}
