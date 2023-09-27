import { CytoscapeOptions, ElementDefinition } from 'cytoscape'
import { useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../../contexts'
import { useCytoscapeColaLayout } from './layouts'

export const useNewOptions = (options: CytoscapeOptions = {}, newElements: ElementDefinition[] = []) => {
  const { cy } = useCytoscapeInstance(true)
  const [updatedOptions, setUpdatedOptions] = useState<CytoscapeOptions>()
  const layoutOptions = useCytoscapeColaLayout()

  useEffect(() => {
    if (newElements.length > 1) {
      cy?.add(newElements)
      cy?.layout(layoutOptions).run()
      // setUpdatedOptions({
      //   elements: [...existingElements, ...newElements],
      //   ...rest,
      // })
    } else {
      setUpdatedOptions(options)
    }
  }, [cy, newElements, options])

  return updatedOptions ?? options
}
