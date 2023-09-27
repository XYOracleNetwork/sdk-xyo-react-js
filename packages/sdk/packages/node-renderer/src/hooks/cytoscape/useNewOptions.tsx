import { CytoscapeOptions, ElementDefinition } from 'cytoscape'
import { useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../../contexts'
import { ColaLayout } from '../../Cytoscape'

export const useNewOptions = (options: CytoscapeOptions = {}, newElements: ElementDefinition[] = []) => {
  const { cy } = useCytoscapeInstance(true)
  const [updatedOptions, setUpdatedOptions] = useState<CytoscapeOptions>()

  useEffect(() => {
    if (newElements.length > 1) {
      cy?.add(newElements)
      cy?.layout(ColaLayout).run()
    } else {
      setUpdatedOptions(options)
    }
  }, [cy, newElements, options])

  return updatedOptions ?? options
}
