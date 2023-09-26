import { WithChildren } from '@xylabs/react-shared'
import { use } from 'cytoscape'
import cola from 'cytoscape-cola'
import { useEffect } from 'react'

export const WithCola: React.FC<WithChildren> = ({ children }) => {
  useEffect(() => {
    use(cola)
  }, [])

  return children
}
