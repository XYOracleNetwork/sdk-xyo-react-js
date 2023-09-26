import { use } from 'cytoscape'
import cola from 'cytoscape-cola'
import { ReactElement, useEffect } from 'react'

type WithChildren<T = unknown> = Omit<T, 'children'> & {
  children?: ReactElement | undefined
}

export const WithCola: React.FC<WithChildren> = ({ children }) => {
  useEffect(() => {
    use(cola)
  }, [])

  return children ?? null
}
